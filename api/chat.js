// API Serverless para el asistente IA del convenio ATRM
// Usar con Vercel, Netlify o similar

// Proveedor y modelo configurables por variables de entorno
// IA_PROVIDER: 'openrouter' (por defecto) | 'deepseek'
// IA_MODEL: nombre del modelo (e.g. 'mistralai/mistral-7b-instruct:free' en OpenRouter o 'deepseek-chat' en DeepSeek)
// OPENROUTER_API_KEY o DEEPSEEK_API_KEY según el proveedor

export default async function handler(req, res) {
  // Configurar CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }
  
  const { pregunta } = req.body;
  
  if (!pregunta) {
    return res.status(400).json({ error: 'Pregunta requerida' });
  }
  
  // Base de conocimiento del convenio
  const convenioKB = `
CONVENIO COLECTIVO DE LIMPIEZA PÚBLICA VIARIA - REGIÓN DE MURCIA
Código: 30000925011981 | Vigencia: 1 enero 2024 - 31 diciembre 2027
Publicado: BORM nº 34 de 11 febrero 2025

=== JORNADA LABORAL ===
- 37 horas 30 minutos semanales (1.680 horas anuales)
- Descanso: 20 min bocadillo (computable) + 10 min adicionales opcionales
- Turno general de mañana
- Distribución irregular: hasta 20% jornada con 5 días preaviso

=== INCREMENTOS SALARIALES ===
- 2024: 400€ lineales todas las categorías
- 2025: IPC real nacional 2024
- 2026: IPC real nacional 2025  
- 2027: IPC real nacional 2026

=== PAGAS EXTRAS ===
- Junio y Diciembre: salario base + antigüedad + plus
- Productividad: 30 días (marzo)
- Septiembre: 30 días (septiembre)
- Bolsa enero: según tabla + 400€ incremento 2024

=== LICENCIAS Y PERMISOS ===
- HOSPITALIZACIÓN/INGRESO FAMILIAR: 5 días retribuidos por ingreso hospitalario, accidente o enfermedad grave de cónyuge o familiares hasta 2º grado consanguinidad o afinidad (madre, padre, hijos, hermanos, abuelos, suegros). Si hospitalización >15 días: +1 día más. Disfrutables de forma continuada o alterna.
- Fallecimiento: 3 días (cónyuge, 2º grado) + 2 días si desplazamiento >65km
- Matrimonio: 15 días + 672,72€ gratificación
- Consulta médica: 3 horas (jornada completa si >35km)
- Asuntos propios: 4 días laborales/año (Art. 15, ampliados de 3 a 4 desde 2023). Primer día: aviso con antelación. 2º, 3º y 4º: petición escrita con 3 días laborales de antelación. No más del % pactado con Comité.
- Traslado vivienda: 2 días
- Fuerza mayor: hasta 4 días/año urgencias familiares

=== VACACIONES ===
- 28 días laborales + días asuntos propios
- Festividad patronal: San Martín de Porres (3 noviembre)
- Desde 2026: compensatorios por festivos en descanso

=== PLUSES ===
- Toxicidad: 30% salario base (conductores, peones, talleres)
- Asistencia: 30% salario base (resto personal)
- Nocturnidad: 28% salario base (22:00-06:00h) desde enero 2025

=== ANTIGÜEDAD ===
- 3 bienios al 5% sobre salario base
- Después quinquenios al 7% sobre salario base
- Se percibe desde mes que se cumple

=== HORAS EXTRA ===
- Máximo 80 horas/año (salvo emergencias)
- Recargo: 80% días laborales, 130% festivos
- Compensación: descanso equivalente en 4 meses

=== PRESTACIONES ===
- Accidente laboral/hospitalización/intervención: 100% retribución real desde primer día
- Enfermedad común: 100% primeros 70 días sumados de las 3 primeras bajas del año
- A partir de la 4ª baja: 75% desde primer día
- Seguro muerte/invalidez por accidente: 30.500€; muerte natural: 4.250€

=== CATEGORÍAS ===
- Mandos: Encargado general, encargado, capataz
- Operarios: Conductor, conductor especialista, oficial 1ª/2ª, peón especialista, peón

=== ÁMBITO ===
- Territorial: Región de Murcia
- Funcional: Recogida residuos, limpieza viaria, alcantarillado, plantas tratamiento, vertederos, playas
- Personal: Trabajadores fijos, fijos discontinuos, temporales (excluye alta dirección)
`;
  
  // Mensajes estándar para ambos proveedores
  const systemPrompt = `Eres un asistente especializado en el Convenio Colectivo de Limpieza Pública Viaria de la Región de Murcia. Responde SOLO basándote en la información del convenio proporcionada. Si no tienes información específica, di que no la tienes y sugiere contactar con el sindicato ATRM.\n\nSi preguntan sobre "ingreso de madre", "madre ingresada", "hospitalización de madre" o similar, se refieren al permiso por hospitalización/ingreso de familiar (5 días retribuidos por ingreso hospitalario de familiares hasta 2º grado, si hospitalización >15 días +1 día más, disfrutables de forma continuada o alterna).\n\nResponde de forma clara y concisa. Usa emojis relevantes.`;

  const provider = (process.env.IA_PROVIDER || 'openrouter').toLowerCase();
  const model = process.env.IA_MODEL || (provider === 'deepseek' ? 'deepseek-chat' : 'mistralai/mistral-7b-instruct:free');

  try {
    let respuesta;

    if (provider === 'deepseek') {
      // DeepSeek API nativa
      const apiKey = process.env.DEEPSEEK_API_KEY;
      if (!apiKey) throw new Error('Falta DEEPSEEK_API_KEY');
      const dsResp = await fetch('https://api.deepseek.com/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model,
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: `Información del convenio:\n${convenioKB}\n\nPregunta del trabajador: ${pregunta}` }
          ],
          temperature: 0.3,
          max_tokens: 300
        })
      });
      if (!dsResp.ok) throw new Error(`DeepSeek API error: ${dsResp.status}`);
      const data = await dsResp.json();
      respuesta = data.choices?.[0]?.message?.content || '';
    } else {
      // OpenRouter (por defecto). Permite usar modelos gratuitos como 'mistralai/mistral-7b-instruct:free' o deepseek vía OpenRouter.
      const apiKey = process.env.OPENROUTER_API_KEY;
      if (!apiKey) throw new Error('Falta OPENROUTER_API_KEY');
      const orResp = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          'X-Title': 'Asistente ATRM Convenio'
        },
        body: JSON.stringify({
          model,
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: `Información del convenio:\n${convenioKB}\n\nPregunta del trabajador: ${pregunta}` }
          ],
          temperature: 0.3,
          max_tokens: 300
        })
      });
      if (!orResp.ok) throw new Error(`OpenRouter API error: ${orResp.status}`);
      const data = await orResp.json();
      respuesta = data.choices?.[0]?.message?.content || '';
    }

    res.status(200).json({
      respuesta,
      fuente: 'Convenio Colectivo ATRM 2024-2027 (BORM nº 34)'
    });

  } catch (error) {
    console.error('Error en API:', error);
    
    // Fallback con respuestas locales si falla la API
    let respuestaFallback = '❌ Error temporal en el asistente. ';
    
    const p = pregunta.toLowerCase();
    if (p.includes('ingreso') && (p.includes('madre') || p.includes('familiar') || p.includes('hospital'))) {
      respuestaFallback = '🏥 **Permiso por hospitalización familiar**: 5 días retribuidos por ingreso hospitalario de familiares hasta 2º grado consanguinidad o afinidad. Si hospitalización >15 días: +1 día más. Disfrutables de forma continuada o alterna. Este permiso aplica cuando tu madre u otro familiar directo está ingresado en el hospital.';
    } else if (p.includes('jornada') || p.includes('horas')) {
      respuestaFallback = '⏰ **Jornada**: 37h 30min semanales (1.680h anuales). Descanso 20min bocadillo + 10min opcionales.';
    } else if (p.includes('increment') || p.includes('salari')) {
      respuestaFallback = '💰 **Incrementos**: 2024: 400€ lineales | 2025-2027: IPC real del año anterior.';
    } else {
      respuestaFallback += 'Intenta con: jornada, incrementos, permisos, vacaciones, pagas extra, pluses, o contacta ATRM: 968 626 511.';
    }
    
    res.status(200).json({ 
      respuesta: respuestaFallback,
      fuente: 'Convenio Colectivo ATRM 2024-2027 (respuesta local)' 
    });
  }
}
