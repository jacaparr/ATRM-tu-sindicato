// API Serverless para el asistente IA del convenio ATRM usando Google Gemini
// Variables de entorno requeridas:
// - GEMINI_API_KEY: API Key de Google Gemini (obtener en https://ai.google.dev/)
// - CONVENIO_TYPE: 'interiores' o 'viaria' (opcional, por defecto 'interiores')

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
  
  const { pregunta, tipo_convenio = 'interiores' } = req.body;
  
  if (!pregunta) {
    return res.status(400).json({ error: 'Pregunta requerida' });
  }
  
  // Base de conocimiento para INTERIORES (Limpieza de edificios y locales)
  const convenioInterioresKB = `
CONVENIO COLECTIVO DE LIMPIEZA DE EDIFICIOS Y LOCALES - REGIÓN DE MURCIA
Vigencia: 2024-2027 | BORM 20/09/2024
Ámbito: Empresas de limpieza de edificios y locales de la Región de Murcia

=== JORNADA Y DESCANSOS ===
• Jornada: 1.748 horas anuales de trabajo efectivo (Art. 5)
• Horas semanales: 40 horas (reducible por acuerdo)
• Descanso: 1,5 días (36 horas) ininterrumpidos semanales
• Pausa diaria: 30 minutos en jornada continuada (proporcional desde media jornada)
• Distribución: regular o irregular según acuerdo empresa-representantes

=== VACACIONES ===
• 27 días laborables (lunes-sábado) por año completo
• Mínimo 19 días ininterrumpidos preferentemente en verano
• Se programan en primer trimestre del año entre empresa y comité/delegados
• Retribución: salario base + antigüedad consolidada + todos los pluses habituales
• Empresa abona el día anterior o anticipa equivalente

=== SALARIO Y PAGAS EXTRA ===
• Salario según categoría profesional (consultar tabla oficial 2024)
• 4 pagas extraordinarias: 15 marzo, 30 junio, 15 septiembre, 15 diciembre (Art. 22)
• Pagas marzo y septiembre: prorrateo en 12 meses; junio y diciembre en 6 meses
• A cada paga se añade la antigüedad consolidada
• Antigüedad: consolidada y congelada desde 31/12/2008 como condición más beneficiosa individual (Art. 20)
• Incrementos: 2024: +2%, 2025: +2%, 2026: +2,75%, 2027: +3,75% (Art. 32)

=== PERMISOS RETRIBUIDOS (Art. 7.1) ===
**Matrimonio/pareja de hecho:** 16 días naturales consecutivos

**Alumbramiento de hija o nuera:**
• 2 días laborales misma provincia
• 5 días fuera de provincia

**Fallecimiento:**
• Cónyuge, ascendientes, descendientes directos: 3 días laborables
• Suegros/as, hermanos/as políticos: 2 días laborables
• Fuera de provincia: 5 días laborables
• Tío carnal o sobrino: 1 día natural

**Hospitalización grave/intervención quirúrgica (Art. 7.1.d):**
• Cónyuge, pareja de hecho, familiares hasta 2º grado consanguinidad o afinidad: 5 días
• Si traslado a otra provincia: 6 días laborables
• Disfrutables dentro de 15 días, de forma continuada o alterna

**Traslado de vivienda:** 2 días naturales

**Matrimonio de hijos/as o hermanos/as:** 1 día

**Consultas médicas propias (SMS):** permiso retribuido justificado

**Intervención quirúrgica sin hospitalización 2º grado:** 2 días

**Guarda legal hijo <12 años o discapacitado:** reducción jornada con reducción proporcional de salario

**Lactancia:** 1 hora diaria ausencia o reducción 30 minutos jornada (hasta 9 meses)

=== LIBRE DISPOSICIÓN Y AUSENCIAS (Art. 7.2 y 7.3) ===
**Días de libre disposición (Art. 7.3):**
• 2 días al año (1 ordinario + 1 extraordinario mientras jornada ≥ 1.748 h)
• Retribuidos, preaviso 7 días naturales
• Máximo 10% de la plantilla simultáneamente

**Ausencias médicas justificadas (Art. 7.2):**
• 12 ausencias al año por el tiempo indispensable
• Para acompañar al médico a hijos/as menores de 14 años o familiares con incapacidad

=== BAJA MÉDICA E INCAPACIDAD TEMPORAL ===
**Accidente laboral / internamiento sanatorial / intervención quirúrgica:**
• Complemento empresa hasta el 100% de la base ordinaria de cotización desde el primer día y hasta fin del proceso

**Enfermedad común:**
• Complemento empresa hasta el 80% de la base reguladora desde el inicio hasta el día 20
• Desde el día 21: complemento hasta el 100% hasta el fin de la incapacidad temporal

**Base reguladora (IT):** salario base + antigüedad consolidada + plus de asistencia + prorrata de pagas extra

=== SUBROGACIÓN ===
• En cambio de empresa adjudicataria: garantizada subrogación
• Se mantiene: antigüedad, salario, categoría y todas las condiciones
• Nueva empresa debe respetar convenio colectivo
• Sin despidos por motivo subrogación
• Empresa saliente: entrega listado de trabajadores a subrogar

=== EXCEDENCIAS ===
**Voluntaria:**
• Mínimo 4 meses
• Derecho tras 1 año antigüedad
• No se reserva puesto, solo derecho preferente al reingreso

**Por cuidado hijo:** hasta 3 años (reserva 1er año)

**Por cuidado familiar:** hasta 2 años (hasta 2º grado)

**Forzosa:** por cargo público o función sindical

=== REDUCCIÓN DE JORNADA ===
• Por guarda legal menor <12 años: reducción 1/8 a 1/2 jornada
• Por cuidado familiar: reducción hasta 50% jornada
• Preaviso 15 días
• Derecho a volver a jornada completa cuando cese causa

=== CLASIFICACIÓN PROFESIONAL ===
**Grupo 1 - Personal limpieza:**
• Peón/a limpiador/a
• Limpiador/a especialista
• Limpiador/a especialista cristalero/a

**Grupo 2 - Mandos intermedios:**
• Encargado/a
• Jefe/a de equipo

**Grupo 3 - Personal administrativo:**
• Auxiliar administrativo/a
• Oficial administrativo/a

=== PERIODO DE PRUEBA ===
• Técnicos titulados: 6 meses
• Resto: 2 meses
• Conversión automática en indefinido si no se formaliza por escrito

=== IGUALDAD Y NO DISCRIMINACIÓN ===
• Igualdad de trato hombres-mujeres
• Protocolo prevención acoso sexual y por razón sexo
• Medidas conciliación familiar y laboral
• No discriminación por embarazo/maternidad

=== SEGURIDAD Y SALUD ===
• Formación prevención de riesgos
• EPIs gratuitos
• Reconocimientos médicos anuales
• Vigilancia salud específica

CONTACTO: ATRM (Asociación de Trabajadores de la Región de Murcia)
Teléfono: 968 30 00 37 | Email: info@atrm-sindicato.es
`;

  // Base de conocimiento para VIARIA (Limpieza pública viaria)
  const convenioViariaKB = `
CONVENIO COLECTIVO DE LIMPIEZA PÚBLICA VIARIA - REGIÓN DE MURCIA
Código: 30000925011981 | Vigencia: 1 enero 2024 - 31 diciembre 2027
Publicado: BORM nº 34 de 11 febrero 2025

=== JORNADA LABORAL ===
• 37 horas 30 minutos semanales (1.680 horas anuales)
• Descanso: 20 minutos bocadillo (computable) + 10 minutos adicionales opcionales
• Turno general de mañana
• Distribución irregular: hasta 20% jornada con 5 días preaviso

=== INCREMENTOS SALARIALES ===
• 2024: 400€ lineales todas las categorías
• 2025: IPC real nacional 2024
• 2026: IPC real nacional 2025
• 2027: IPC real nacional 2026

=== PAGAS EXTRAS ===
• Junio y Diciembre: salario base + antigüedad + plus
• Productividad: 30 días (marzo)
• Septiembre: 30 días (septiembre)
• Bolsa enero: según tabla + 400€ incremento 2024

=== LICENCIAS Y PERMISOS ===
**HOSPITALIZACIÓN/INGRESO FAMILIAR:**
• 5 días retribuidos por ingreso hospitalario, haya o no desplazamiento
• Aplica a: cónyuge, familiares hasta 2º grado consanguinidad o afinidad
• Si hospitalización >15 días: +1 día más
• Disfrutables de forma continuada o alterna mientras exista hospitalización o reposo domiciliario

**Fallecimiento:** 3 días (cónyuge, 2º grado) + 2 días si desplazamiento >65km

**Matrimonio:** 15 días + 672,72€ gratificación

**Consulta médica:** 3 horas (jornada completa si >35km)

**Asuntos propios:** 4 días laborales/año (Art. 15, ampliados de 3 a 4 desde 2023)
• Primer día: aviso con suficiente antelación
• 2º, 3º y 4º día: petición por escrito con 3 días laborales de antelación
• No pueden coincidir más del porcentaje pactado con Comité/Delegados

**Traslado vivienda:** 2 días

**Fuerza mayor:** hasta 4 días/año urgencias familiares

=== VACACIONES ===
• 28 días laborales + días asuntos propios
• Festividad patronal: San Martín de Porres (3 noviembre)
• Desde 2026: compensatorios por festivos en descanso

=== PLUSES ===
• Toxicidad: 30% salario base (conductores, peones, talleres)
• Asistencia: 30% salario base (resto personal)
• Nocturnidad: 28% salario base (22:00-06:00h) desde enero 2025

=== ANTIGÜEDAD ===
• 3 bienios al 5% sobre salario base
• Después quinquenios al 7% sobre salario base
• Se percibe desde mes que se cumple

=== HORAS EXTRA ===
• Máximo 80 horas/año (salvo emergencias)
• Recargo: 80% días laborales, 130% festivos
• Compensación: descanso equivalente en 4 meses

=== PRESTACIONES ===
**Complemento por Incapacidad Temporal:**
• Enfermedad común con hospitalización o intervención quirúrgica, accidente laboral o postoperatorio: 100% retribución real desde el primer día hasta el alta (máx. 365 días, prorrogables 180)
• En I.T.: 100% retribución real en los primeros 70 días sumados de las tres primeras bajas del año, desde el primer día
• En sucesivas bajas: 75% desde el primer día
• Seguros y ayudas por discapacidad/estudios

=== CATEGORÍAS ===
• Mandos: Encargado general, encargado, capataz
• Operarios: Conductor, conductor especialista, oficial 1ª/2ª, peón especialista, peón

=== ÁMBITO ===
• Territorial: Región de Murcia
• Funcional: Recogida residuos, limpieza viaria, alcantarillado, plantas tratamiento, vertederos, playas
• Personal: Fijos, fijos discontinuos, temporales (excluye alta dirección)

CONTACTO: ATRM (Asociación de Trabajadores de la Región de Murcia)
Teléfono: 968 30 00 37 | Email: info@atrm-sindicato.es
`;

  const convenioKB = tipo_convenio === 'viaria' ? convenioViariaKB : convenioInterioresKB;
  const nombreConvenio = tipo_convenio === 'viaria' ? 'Limpieza Pública Viaria' : 'Limpieza de Edificios y Locales';
  
  const systemPrompt = `Eres un asistente especializado en el Convenio Colectivo de ${nombreConvenio} de la Región de Murcia. 

INSTRUCCIONES CRÍTICAS:
1. Responde SOLO basándote en la información del convenio proporcionada
2. Si no tienes información específica sobre la pregunta, di claramente que no está en el convenio
3. Siempre sugiere contactar con ATRM (968 30 00 37) para consultas no cubiertas
4. Cita el artículo o sección del convenio cuando sea posible
5. Responde de forma clara, concisa y con emojis relevantes cuando sea apropiado
6. Si la pregunta es sobre un tema que está en el convenio, proporciona la respuesta completa y detallada

Recuerda: Eres experto en este convenio específico y debes dar información precisa y confiable.`;

  const apiKey = process.env.GEMINI_API_KEY;
  
  if (!apiKey) {
    console.error('❌ Falta configurar GEMINI_API_KEY');
    return res.status(500).json({ 
      error: 'API no configurada. Por favor, configura GEMINI_API_KEY en las variables de entorno.',
      respuesta: '❌ Error de configuración. El sistema no está configurado correctamente. Por favor, contacta con ATRM: 968 30 00 37'
    });
  }

  try {
    // Llamar a Google Gemini API
    const geminiResp = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': apiKey
      },
      body: JSON.stringify({
        contents: [{
          parts: [
            {
              text: systemPrompt + '\n\n' + 
                    'INFORMACIÓN DEL CONVENIO:\n' + convenioKB + '\n\n' +
                    'PREGUNTA DEL TRABAJADOR:\n' + pregunta
            }
          ]
        }],
        generationConfig: {
          temperature: 0.3,
          maxOutputTokens: 500,
          topP: 0.95,
          topK: 40
        }
      })
    });

    if (!geminiResp.ok) {
      const errorData = await geminiResp.json();
      console.error('❌ Gemini API error:', errorData);
      throw new Error(`Gemini API error: ${geminiResp.status} - ${JSON.stringify(errorData)}`);
    }

    const data = await geminiResp.json();
    const respuesta = data?.contents?.[0]?.parts?.[0]?.text || '';

    if (!respuesta) {
      throw new Error('No response from Gemini API');
    }

    return res.status(200).json({
      respuesta,
      fuente: `Convenio Colectivo ATRM ${nombreConvenio} 2024-2027`,
      modelo: 'Google Gemini',
      tipo_convenio
    });

  } catch (error) {
    console.error('Error en API Gemini:', error);
    
    // Fallback con respuestas básicas si falla la API
    let respuestaFallback = '❌ Error temporal en el asistente. ';
    
    const p = pregunta.toLowerCase();
    if (tipo_convenio === 'viaria') {
      if (p.includes('ingreso') && (p.includes('madre') || p.includes('familiar') || p.includes('hospital'))) {
        respuestaFallback = '🏥 **Permiso por hospitalización familiar**: 5 días retribuidos por ingreso hospitalario de familiares hasta 2º grado (madre, padre, hijos, hermanos, abuelos, suegros). Ampliable si la hospitalización supera 15 días.';
      } else if (p.includes('jornada') || p.includes('horas')) {
        respuestaFallback = '⏰ **Jornada**: 37h 30min semanales (1.680h anuales). Descanso 20min bocadillo + 10min opcionales.';
      } else if (p.includes('increment') || p.includes('salari')) {
        respuestaFallback = '💰 **Incrementos**: 2024: 400€ lineales | 2025-2027: IPC real del año anterior.';
      } else {
        respuestaFallback += 'Intenta con: jornada, incrementos, permisos, vacaciones, pagas extra, pluses, o contacta ATRM: 968 30 00 37.';
      }
    } else {
      if (p.includes('jornada') || p.includes('horas')) {
        respuestaFallback = '⏰ **Jornada**: 1.792 horas anuales (40 horas semanales). Descanso 1,5 días (36 horas) ininterrumpidos.';
      } else if (p.includes('vacacion')) {
        respuestaFallback = '🏖️ **Vacaciones**: 27 días laborables por año completo. Mínimo 19 días ininterrumpidos preferentemente en verano.';
      } else if (p.includes('salari') || p.includes('paga')) {
        respuestaFallback = '💰 **Pagas**: 3 pagas extraordinarias (junio, diciembre, marzo). Antigüedad en trienios al 5% del salario base.';
      } else {
        respuestaFallback += 'Intenta con: jornada, vacaciones, pagas, permisos, baja médica, o contacta ATRM: 968 30 00 37.';
      }
    }
    
    return res.status(200).json({ 
      respuesta: respuestaFallback,
      fuente: `Convenio Colectivo ATRM ${nombreConvenio} 2024-2027 (respuesta local)`,
      modelo: 'Fallback',
      tipo_convenio,
      error: error.message
    });
  }
}
