const REQUIRED_ENV = ['SUPABASE_URL', 'SUPABASE_SERVICE_ROLE', 'ADMIN_API_TOKEN'];
const SUPABASE_TABLE = process.env.SUPABASE_TABLE || 'denuncias';

function checkEnv() {
  const missing = REQUIRED_ENV.filter((key) => !process.env[key]);
  if (missing.length) {
    throw new Error(`Faltan variables obligatorias: ${missing.join(', ')}`);
  }
}

async function fetchDenuncias(query = {}) {
  checkEnv();
  const baseUrl = `${process.env.SUPABASE_URL}/rest/v1/${SUPABASE_TABLE}`;
  const params = new URLSearchParams();
  params.set('select', 'id,texto,estado,ip,metadatos,created_at,actualizado_en');
  params.set('order', 'created_at.desc');
  if (query.estado) {
    params.set('estado', `eq.${query.estado}`);
  }
  const finalUrl = `${baseUrl}?${params.toString()}`;

  const response = await fetch(finalUrl, {
    headers: {
      apikey: process.env.SUPABASE_SERVICE_ROLE,
      Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Supabase query error: ${response.status} ${detail}`);
  }

  return response.json();
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-admin-token');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Metodo no permitido' });
  }

  const adminToken = req.headers['x-admin-token'];
  if (!adminToken || adminToken !== process.env.ADMIN_API_TOKEN) {
    return res.status(401).json({ error: 'No autorizado' });
  }

  try {
    const data = await fetchDenuncias({ estado: req.query?.estado });
    return res.status(200).json({ items: data });
  } catch (error) {
    console.error('Error listado denuncias:', error);
    return res.status(500).json({ error: 'No se pudo obtener el listado' });
  }
}
