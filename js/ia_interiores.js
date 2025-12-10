// IA para convenio de interiores (estructura independiente)

class IAInteriores {
  constructor() {
    this.baseCasos = null;
    this.faqs = [];
    this.articulos = [];
    this.modoRespuesta = 'completo';
    this.cargarBaseCasos();
  }

  setModoRespuesta(modo) {
    this.modoRespuesta = modo;
  }

  async cargarBaseCasos() {
    try {
      const response = await fetch('data/casos_interiores.json');
      this.baseCasos = await response.json();
    } catch (error) {
      console.warn('Error cargando casos interiores:', error);
      this.baseCasos = { casos: {}, jurisprudencia: [] };
    }
    // Cargar FAQs y artículos del convenio
    try {
      const faqsResp = await fetch('data/faq_interiores.json');
      this.faqs = (await faqsResp.json()).faqs;
    } catch (e) { this.faqs = []; }
    try {
      const artResp = await fetch('data/convenio_interiores_articulos.json');
      this.articulos = (await artResp.json()).articulos;
    } catch (e) { this.articulos = []; }
  }

  normalizarTexto(texto) {
    return (texto || '')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  }

  buscarArticulo(pregunta) {
    if (!this.articulos || !this.articulos.length) return null;
    const consulta = this.normalizarTexto(pregunta);
    let mejor = null;

    for (const articulo of this.articulos) {
      let score = 0;
      const keywords = articulo.keywords || [];
      for (const kw of keywords) {
        const kwNorm = this.normalizarTexto(kw);
        if (!kwNorm) continue;
        if (consulta.includes(kwNorm)) {
          score += Math.min(kwNorm.split(' ').length + 2, 6);
        }
      }

      const tituloNorm = this.normalizarTexto(articulo.titulo);
      if (tituloNorm && consulta.includes(tituloNorm)) score += 4;
      tituloNorm.split(/\s+/).forEach((palabra) => {
        if (palabra.length >= 5 && consulta.includes(palabra)) score += 1;
      });

      if (score > 0 && (!mejor || score > mejor.score)) {
        mejor = { articulo, score };
      }
    }

    return mejor && mejor.score >= 4 ? mejor.articulo : null;
  }

  formatearArticulo(articulo) {
    const referencia = articulo.referencia ? ` <span style="color:#888;font-size:13px">(${articulo.referencia})</span>` : '';
    return `<strong>${articulo.titulo}</strong><br>${articulo.texto}${referencia}`;
  }

  // Detección por puntuación de keywords en casos_interiores.json
  detectarTema(pregunta) {
    if (!this.baseCasos || !this.baseCasos.casos) return null;
    const texto = (pregunta || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const palabras = texto.split(/\s+/);
    const resultados = [];
    
    for (const [id, caso] of Object.entries(this.baseCasos.casos)) {
      const kws = (caso.keywords || []).map(k => k.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ''));
      let score = 0;
      
      for (const kw of kws) {
        // Match exacto de keyword completo
        if (texto.includes(kw)) {
          score += kw.length * 3;
        }
        
        // Match de palabras individuales
        const keyPalabras = kw.split(/\s+/);
        for (const keyPalabra of keyPalabras) {
          if (keyPalabra.length >= 3 && palabras.includes(keyPalabra)) {
            score += 2;
          }
        }
      }
      
      // bonus por coincidencia en título
      if (caso.titulo) {
        const tituloNorm = caso.titulo.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        if (texto.includes(tituloNorm)) score += 5;
        const tituloPalabras = tituloNorm.split(/\s+/);
        for (const palabra of tituloPalabras) {
          if (palabra.length >= 4 && palabras.includes(palabra)) {
            score += 1;
          }
        }
      }
      
      if (score > 0) resultados.push({ id, score });
    }
    
    resultados.sort((a, b) => b.score - a.score);
    console.log('🎯 Scoring resultados:', resultados);
    return resultados.length && resultados[0].score >= 3 ? resultados[0].id : null;
  }

  // Busca primero en Casos (scoring), luego en FAQs, luego en artículos, luego API
  async generarRespuesta(pregunta) {
    const preguntaOriginal = pregunta;
    const preguntaNormalizada = pregunta.trim().toLowerCase();
    let respuestaObj = null;

    console.log('🔍 Pregunta:', preguntaOriginal);

    // 0. Casos interiores por palabras clave (solo si match muy claro)
    const temaId = this.detectarTema(preguntaNormalizada);
    if (temaId) {
      console.log('✅ Caso detectado:', temaId);
      const caso = this.baseCasos.casos[temaId];
      respuestaObj = {
        resumen: `<strong>${caso.titulo}</strong><br>${caso.detalle}`,
      };
    }

    // 1. Buscar artículo específico del convenio
    if (!respuestaObj) {
      const articulo = this.buscarArticulo(preguntaOriginal);
      if (articulo) {
        console.log('📑 Artículo seleccionado:', articulo.referencia);
        respuestaObj = { resumen: this.formatearArticulo(articulo) };
      }
    }
    
    // 2. IA con contexto completo del convenio
    if (!respuestaObj) {
      console.log('🤖 Consultando IA con contexto del convenio...');
      const apiResp = await this.consultarAPI(preguntaOriginal);
      if (apiResp) {
        respuestaObj = { resumen: apiResp };
      }
    }
    
    // 3. Fallback a FAQs si la API falla
    if (!respuestaObj && this.faqs && this.faqs.length) {
      const faq = this.faqs.find((f) => {
        const p = f.pregunta.toLowerCase();
        const tokens = p.split(' ');
        return tokens.some((token) => token.length > 3 && preguntaNormalizada.includes(token));
      });
      if (faq) {
        console.log('📚 FAQ encontrada');
        respuestaObj = {
          resumen: `${faq.respuesta} <br><span style='color:#888;font-size:13px'>(Referencia: ${faq.referencia})</span>`
        };
      }
    }
    
    // 4. Último recurso: mensaje de error
    if (!respuestaObj) {
      respuestaObj = { resumen: '❌ No he podido conectar con el sistema de IA. Por favor, consulta el PDF del convenio o contacta con ATRM al 968 30 00 37.' };
    }
    
    if (window.sistemaStats && respuestaObj) {
      window.sistemaStats.registrarConsulta(preguntaOriginal, respuestaObj.resumen, 'interiores');
    }
    
    return respuestaObj;
  }

  // Fallback a API externa con contexto de interiores
  async consultarAPI(pregunta) {
    // Contexto completo del convenio de interiores desde el PDF extraído
    const convenioKB = `CONVENIO COLECTIVO DE LIMPIEZA DE EDIFICIOS Y LOCALES - REGIÓN DE MURCIA
Vigencia: BORM 20/09/2024
Ámbito: Empresas de limpieza de edificios y locales de la Región de Murcia

=== JORNADA Y DESCANSOS (Art. 8) ===
- Jornada máxima anual: 1.792 horas efectivas de trabajo
- Jornada ordinaria: 40 horas semanales, salvo reducción por acuerdo
- Descanso semanal: 1,5 días (36 horas) ininterrumpidos
- Pausa diaria: 15 minutos de descanso si la jornada supera 6 horas consecutivas
- Distribución: puede ser regular o irregular según acuerdo entre empresa y representantes

=== VACACIONES (Art. 6) ===
- 27 días laborables (lunes a sábado) por año completo
- Al menos 19 días deben disfrutarse de forma ininterrumpida y preferentemente en verano
- Se programan entre la empresa y el comité/delegados en el primer trimestre del año natural
- Retribución: salario base + antigüedad consolidada + plus de permanencia + plus de asistencia + cualquier otro plus salarial que se cobre habitualmente
- La empresa abona el importe el día anterior al inicio del disfrute; si no es posible, debe anticipar la cantidad equivalente a los días a disfrutar

=== SALARIO Y PAGAS EXTRA (Art. 20) ===
- Salario base según categoría profesional (ver tabla salarial vigente)
- 3 pagas extraordinarias: junio, diciembre y marzo
- Paga junio: prorrateada de enero a mayo
- Paga diciembre: prorrateada de junio a noviembre
- Paga marzo: importe de 30 días de salario base
- Antigüedad: trienios al 5% del salario base consolidado

=== PERMISOS RETRIBUIDOS (Art. 16) ===
**Matrimonio o pareja de hecho:** 15 días naturales consecutivos

**Nacimiento de hijo/a:**
- 2 días laborables (en municipio de trabajo)
- 4 días laborables si requiere desplazamiento a otra provincia

**Fallecimiento de familiar:**
- Cónyuge, padres, hijos: 2 días (4 si desplazamiento)
- Hermanos, abuelos, nietos: 2 días (4 si desplazamiento)  
- Tíos, sobrinos: 1 día

**Hospitalización grave o intervención quirúrgica:**
- Cónyuge, padres, hijos: 2 días (4 si desplazamiento)
- Abuelos, nietos, hermanos: 2 días (4 si desplazamiento)

**Traslado de vivienda habitual:** 1 día laborable

**Exámenes oficiales:** el tiempo necesario para asistir (debidamente justificado)

**Consultas médicas propias:** el tiempo imprescindible justificado

**Guarda legal hijo <12 años o discapacitado:** reducción de jornada con reducción proporcional de salario

**Lactancia:** 1 hora diaria ausencia o reducción jornada media hora (hasta 9 meses)

=== BAJA MÉDICA E INCAPACIDAD TEMPORAL ===
**Accidente laboral:** 
- Complemento empresa hasta 100% del salario desde el primer día
- Sin límite temporal mientras dure la IT

**Enfermedad común:**
- Días 1-3: sin complemento (75% Seguridad Social)
- Días 4-15: sin complemento (75% Seguridad Social)  
- Día 16 en adelante: complemento empresa hasta 100% del salario

**Accidente no laboral:**
- Igual que enfermedad común

=== SUBROGACIÓN (Art. 23) ===
- En cambio de empresa adjudicataria del servicio se garantiza la subrogación
- Se mantiene íntegramente: antigüedad, salario, categoría y todas las condiciones laborales
- La nueva empresa debe respetar el convenio colectivo
- No puede haber despidos por motivo de la subrogación
- Obligación de la empresa saliente: entregar listado de trabajadores a subrogar
- Derecho del trabajador: conservar todos sus derechos adquiridos

=== EXCEDENCIAS (Art. 18) ===
**Voluntaria:**
- Mínimo 4 meses
- Derecho tras 1 año de antigüedad en la empresa
- No se reserva puesto, solo derecho preferente al reingreso

**Por cuidado de hijo:**
- Hasta 3 años por cada hijo desde nacimiento/adopción
- Reserva del puesto de trabajo el primer año
- Años 2 y 3: derecho preferente al reingreso

**Por cuidado de familiar:**
- Hasta 2 años para cuidado de familiar hasta 2º grado
- Reserva del puesto de trabajo

**Forzosa:**
- Por cargo público o función sindical
- Con reserva de puesto y cómputo de antigüedad

=== REDUCCIÓN DE JORNADA (Art. 19) ===
- Por guarda legal de menor de 12 años: reducción entre 1/8 y 1/2 de jornada
- Por cuidado familiar: reducción hasta 50% de jornada
- Reducción proporcional del salario
- Preaviso de 15 días a la empresa
- Derecho a volver a jornada completa cuando cese la causa

=== CLASIFICACIÓN PROFESIONAL ===
**Grupo 1 - Personal de limpieza:**
- Peón/a limpiador/a
- Limpiador/a especialista
- Limpiador/a especialista cristalero/a

**Grupo 2 - Mandos intermedios:**
- Encargado/a
- Jefe/a de equipo

**Grupo 3 - Personal administrativo:**
- Auxiliar administrativo/a
- Oficial administrativo/a

=== CONTRATACIÓN ===
- Contratos indefinidos: ordinario, fijos discontinuos
- Contratos temporales: obra o servicio determinado, eventual por circunstancias de producción, interinidad
- Periodo de prueba: 
  * Técnicos titulados: 6 meses
  * Resto de trabajadores: 2 meses
- Conversión automática en indefinido si no se formaliza por escrito

=== IGUALDAD Y NO DISCRIMINACIÓN ===
- Igualdad de trato y oportunidades entre hombres y mujeres
- Protocolo de prevención del acoso sexual y por razón de sexo
- Medidas de conciliación familiar y laboral
- No discriminación por embarazo o maternidad

=== SEGURIDAD Y SALUD ===
- Derecho a formación en prevención de riesgos
- Equipos de protección individual (EPIs) gratuitos
- Reconocimientos médicos anuales
- Vigilancia de la salud específica

=== TABLA SALARIAL ORIENTATIVA 2024 ===
(Consultar tabla oficial actualizada en convenio)
- Peón/a limpiador/a: ~1.200-1.300 €/mes bruto
- Especialista: ~1.300-1.400 €/mes bruto
- Encargado/a: ~1.500-1.700 €/mes bruto
+ Antigüedad (trienios 5%)
+ Pagas extras (3 al año)

=== CONTACTO SINDICATO ===
ATRM (Asociación de Trabajadores de la Región de Murcia)
Teléfono: 968 30 00 37
Email: info@atrm-sindicato.es

IMPORTANTE: Responde siempre basándote EXCLUSIVAMENTE en la información del convenio proporcionada. Si la pregunta no está cubierta en el convenio, indícalo claramente y sugiere consultar con el sindicato ATRM.
`;
    try {
      const resp = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          pregunta: `Eres un asistente experto del sindicato ATRM especializado en el Convenio de Limpieza de Edificios y Locales de la Región de Murcia.

CONVENIO:
${convenioKB}

PREGUNTA DEL TRABAJADOR: ${pregunta}

Responde de forma clara, directa y precisa citando el artículo correspondiente cuando sea posible. Si la información no está en el convenio, indícalo y recomienda contactar con ATRM.`
        })
      });
      if (!resp.ok) {
        console.error('API error:', resp.status);
        return null;
      }
      const data = await resp.json();
      return data?.respuesta || null;
    } catch (e) {
      console.error('Error consultando API:', e);
      return null;
    }
  }
}
if (typeof window !== 'undefined') {
  window.iaInteriores = new IAInteriores();
}
