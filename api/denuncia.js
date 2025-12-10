const REQUIRED_ENV = ['RESEND_API_KEY', 'RESEND_FROM', 'RESEND_TO'];
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE = process.env.SUPABASE_SERVICE_ROLE;
const SUPABASE_TABLE = process.env.SUPABASE_TABLE || 'denuncias';

function sanitize(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function buildHtmlBody(texto, metadata) {
  return `
    <h2>🚨 Nueva denuncia anónima</h2>
    <p>Se ha recibido una denuncia desde la web de ATRM.</p>
    <p><strong>Fecha/Hora (UTC):</strong> ${metadata.fechaUtc}</p>
    <p><strong>IP aproximada:</strong> ${metadata.ip || 'No disponible'}</p>
    <hr>
    <p style="font-size:15px;line-height:1.5"><strong>Contenido:</strong></p>
    <blockquote style="border-left:4px solid #ff6b35;margin:0;padding:12px 16px;background:#fff7f0;font-style:italic;white-space:pre-wrap">${sanitize(texto)}</blockquote>
    <hr>
    <p style="font-size:13px;color:#777">Este mensaje se envió automáticamente desde atrm-sindicato.es.</p>
  `;
}

function buildTextBody(texto, metadata) {
  return `Nueva denuncia anónima\n\nFecha/Hora (UTC): ${metadata.fechaUtc}\nIP: ${metadata.ip || 'No disponible'}\n\nContenido:\n${texto}\n\n---\nEnviado automáticamente desde atrm-sindicato.es`;
}

async function persistDenuncia(payload) {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE) {
    return;
  }

  const url = `${SUPABASE_URL}/rest/v1/${SUPABASE_TABLE}`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      apikey: SUPABASE_SERVICE_ROLE,
      Authorization: `Bearer ${SUPABASE_SERVICE_ROLE}`,
      'Content-Type': 'application/json',
      Prefer: 'return=minimal',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Supabase error: ${response.status} ${detail}`);
  }
}

function parseRecipients(raw) {
  return raw
    .split(',')
    .map((email) => email.trim())
    .filter(Boolean);
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  const missingEnv = REQUIRED_ENV.filter((key) => !process.env[key]);
  if (missingEnv.length) {
    console.error('Faltan variables de entorno para Resend:', missingEnv.join(', '));
    return res.status(500).json({ error: 'Configuración incompleta del servicio de correo' });
  }

  const payload = req.body || {};
  const texto = (payload.texto || payload.denuncia || '').trim();

  if (!texto) {
    return res.status(400).json({ error: 'El texto de la denuncia es obligatorio' });
  }

  if (texto.length > 5000) {
    return res.status(413).json({ error: 'La denuncia es demasiado extensa (máx. 5000 caracteres)' });
  }

  const metadata = {
    fechaUtc: new Date().toISOString(),
    ip: req.headers?.['x-forwarded-for']?.split(',')[0]?.trim() || req.socket?.remoteAddress || null,
  };

  const toList = parseRecipients(process.env.RESEND_TO);
  if (!toList.length) {
    console.error('RESEND_TO no contiene destinatarios válidos');
    return res.status(500).json({ error: 'Configuración incompleta del servicio de correo' });
  }

  const resendPayload = {
    from: `${process.env.RESEND_FROM_NAME || 'ATRM Denuncias'} <${process.env.RESEND_FROM}>`,
    to: toList,
    subject: process.env.RESEND_SUBJECT || '🚨 Nueva denuncia anónima',
    text: buildTextBody(texto, metadata),
    html: buildHtmlBody(texto, metadata),
  };

  if (process.env.RESEND_REPLY_TO) {
    resendPayload.reply_to = process.env.RESEND_REPLY_TO;
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(resendPayload),
    });

    if (!response.ok) {
      const body = await response.text();
      console.error('Error de Resend:', response.status, body);
      return res.status(502).json({ error: 'No se pudo entregar la denuncia' });
    }

    try {
      await persistDenuncia({
        texto,
        estado: 'pendiente',
        ip: metadata.ip,
        metadatos: metadata,
      });
    } catch (storageError) {
      console.error('No se pudo guardar la denuncia en la base de datos:', storageError);
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error general enviando denuncia:', error);
    return res.status(500).json({ error: 'Error interno enviando la denuncia' });
  }
}
