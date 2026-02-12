// IA mejorada sin coste - ATRM Sindicato
class IAContextual {
  // Modo estricto: solo contenido literal; por petición, lo desactivamos por defecto
  modoEstrict = false;
  // Modo breve: respuestas concisas por defecto
  modoBreve = true;
  maxLineasBreve = 6;
  maxCharsBreve = 600;
  obtenerUltimaPreguntaFollowup() {
    if (!this.historial.length) return null;
    const ultima = this.historial[this.historial.length - 1];
    if (ultima.pregunta && ultima.tema && this.baseCasos?.casos?.[ultima.tema]) {
      const caso = this.baseCasos.casos[ultima.tema];
      if (caso.preguntas_followup && caso.preguntas_followup.length > 0) {
        // Buscar si la última pregunta fue una pregunta de seguimiento
        for (const pf of caso.preguntas_followup) {
          if (ultima.pregunta.toLowerCase().includes(pf.toLowerCase().slice(0, 10))) {
            return { caso, pregunta: pf };
          }
        }
      }
    }
    return null;
  }
  frasesHumanas = {
    saludos: [
      '¡Hola! ¿En qué puedo ayudarle hoy?',
      '¡Buenos días! ¿Cómo puedo orientarle?',
      '¡Buenas tardes! ¿En qué le puedo ayudar?',
      '¡Buenas noches! ¿Qué consulta tiene?',
      '¡Saludos! ¿Sobre qué tema del convenio quiere información?',
      '¡Hola! ¿Le ayudo con alguna duda del convenio?',
      '¡Hola! ¿Quiere saber algo sobre permisos, nómina o derechos?',
      '¡Bienvenido! ¿En qué puedo serle útil?',
      '¡Hola! ¿Le explico algún punto del convenio?',
      '¡Hola! ¿Qué desea consultar hoy?',
      '¡Hola! ¿Le gustaría saber algo sobre sus derechos laborales?',
      '¡Hola! ¿En qué tema le puedo asesorar?',
      '¡Hola! ¿Le ayudo a resolver su consulta?',
      '¡Hola! ¿Sobre qué tema necesita información?',
      '¡Hola! ¿Le explico el convenio con mucho gusto?',
      '¡Hola! ¿Quiere que le aclare algún derecho?',
      '¡Hola! ¿Le ayudo con permisos o vacaciones?',
      '¡Hola! ¿Desea información sobre pluses o nómina?',
      '¡Hola! ¿Le interesa saber sobre permisos retribuidos?',
      '¡Hola! ¿Le ayudo a entender su convenio?',
      '¡Hola! ¿Quiere consultar sobre bajas o licencias?',
      '¡Hola! ¿Le explico los días de descanso?',
      '¡Hola! ¿Le ayudo con trámites sindicales?',
      '¡Hola! ¿Le interesa información sobre festivos?',
      '¡Hola! ¿Le ayudo con dudas sobre su salario?',
      '¡Hola! ¿Quiere saber sobre permisos especiales?',
      '¡Hola! ¿Le explico cómo solicitar un permiso?',
      '¡Hola! ¿Le ayudo con la documentación necesaria?',
      '¡Hola! ¿Le interesa saber sobre pluses nocturnos?',
      '¡Hola! ¿Le ayudo con dudas sobre turnos?',
      '¡Hola! ¿Le explico los derechos por antigüedad?',
      '¡Hola! ¿Quiere saber sobre conciliación familiar?',
      '¡Hola! ¿Le ayudo con dudas sobre bajas médicas?',
      '¡Hola! ¿Le explico los pasos para una reclamación?',
      '¡Hola! ¿Le ayudo con información sobre el sindicato?',
      '¡Hola! ¿Le interesa saber sobre formación?',
      '¡Hola! ¿Le ayudo con dudas sobre contratos?',
      '¡Hola! ¿Le explico los derechos en caso de accidente?',
      '¡Hola! ¿Le ayudo con información sobre jubilación?',
      '¡Hola! ¿Le interesa saber sobre pluses de transporte?',
      '¡Hola! ¿Le ayudo con dudas sobre pagas extra?',
      '¡Hola! ¿Le explico los derechos en caso de despido?',
      '¡Hola! ¿Le ayudo con información sobre ascensos?',
      '¡Hola! ¿Le interesa saber sobre horas extra?',
      '¡Hola! ¿Le ayudo con dudas sobre vacaciones?',
      '¡Hola! ¿Le explico los derechos de maternidad/paternidad?',
      '¡Hola! ¿Le ayudo con información sobre pluses de peligrosidad?',
      '¡Hola! ¿Le interesa saber sobre dietas?',
      '¡Hola! ¿Le ayudo con dudas sobre movilidad?',
      '¡Hola! ¿Le explico los derechos en caso de traslado?',
      '¡Hola! ¿Le ayudo con información sobre reducción de jornada?',
      '¡Hola! ¿Le interesa saber sobre permisos sin sueldo?',
      '¡Hola! ¿Le ayudo con dudas sobre teletrabajo?',
      '¡Hola! ¿Le explico los derechos en caso de ERTE?',
      '¡Hola! ¿Le ayudo con información sobre pluses de festivos?',
      '¡Hola! ¿Le interesa saber sobre descansos semanales?',
      '¡Hola! ¿Le ayudo con dudas sobre turnos rotativos?',
      '¡Hola! ¿Le explico los derechos en caso de incapacidad?',
      '¡Hola! ¿Le ayudo con información sobre indemnizaciones?',
      '¡Hola! ¿Le interesa saber sobre permisos por estudios?',
      '¡Hola! ¿Le ayudo con dudas sobre licencias especiales?',
      '¡Hola! ¿Le explico los derechos en caso de fallecimiento?',
      '¡Hola! ¿Le ayudo con información sobre pluses de antigüedad?',
      '¡Hola! ¿Le interesa saber sobre permisos por matrimonio?',
      '¡Hola! ¿Le ayudo con dudas sobre permisos por hospitalización?',
      '¡Hola! ¿Le explico los derechos en caso de accidente laboral?',
      '¡Hola! ¿Le ayudo con información sobre pluses de nocturnidad?',
      '¡Hola! ¿Le interesa saber sobre permisos por mudanza?',
      '¡Hola! ¿Le ayudo con dudas sobre permisos por nacimiento?',
      '¡Hola! ¿Le explico los derechos en caso de adopción?',
      '¡Hola! ¿Le ayudo con información sobre pluses de peligrosidad?',
      '¡Hola! ¿Le interesa saber sobre permisos por lactancia?',
      '¡Hola! ¿Le ayudo con dudas sobre permisos por exámenes?',
      '¡Hola! ¿Le explico los derechos en caso de reducción de jornada?',
      '¡Hola! ¿Le ayudo con información sobre pluses de transporte?',
      '¡Hola! ¿Le interesa saber sobre permisos por deber inexcusable?',
      '¡Hola! ¿Le ayudo con dudas sobre permisos por representación sindical?',
      '¡Hola! ¿Le explico los derechos en caso de cambio de puesto?',
      '¡Hola! ¿Le ayudo con información sobre pluses de disponibilidad?',
      '¡Hola! ¿Le interesa saber sobre permisos por formación?',
      '¡Hola! ¿Le ayudo con dudas sobre permisos por consulta médica?',
      '¡Hola! ¿Le explico los derechos en caso de baja por accidente?',
      '¡Hola! ¿Le ayudo con información sobre pluses de peligrosidad?',
      '¡Hola! ¿Le interesa saber sobre permisos por hospitalización de familiar?',
      '¡Hola! ¿Le ayudo con dudas sobre permisos por fallecimiento?',
      '¡Hola! ¿Le explico los derechos en caso de traslado?',
      '¡Hola! ¿Le ayudo con información sobre pluses de nocturnidad?',
      '¡Hola! ¿Le interesa saber sobre permisos por matrimonio?',
      '¡Hola! ¿Le ayudo con dudas sobre permisos por nacimiento?',
      '¡Hola! ¿Le explico los derechos en caso de adopción?',
      '¡Hola! ¿Le ayudo con información sobre pluses de peligrosidad?',
      '¡Hola! ¿Le interesa saber sobre permisos por lactancia?',
      '¡Hola! ¿Le ayudo con dudas sobre permisos por exámenes?',
      '¡Hola! ¿Le explico los derechos en caso de reducción de jornada?',
      '¡Hola! ¿Le ayudo con información sobre pluses de transporte?',
      '¡Hola! ¿Le interesa saber sobre permisos por deber inexcusable?',
      '¡Hola! ¿Le ayudo con dudas sobre permisos por representación sindical?',
      '¡Hola! ¿Le explico los derechos en caso de cambio de puesto?',
      '¡Hola! ¿Le ayudo con información sobre pluses de disponibilidad?',
      '¡Hola! ¿Le interesa saber sobre permisos por formación?',
      '¡Hola! ¿Le ayudo con dudas sobre permisos por consulta médica?'
    ],
    despedidas: [
      '¡Hasta pronto! Si tiene más dudas, aquí estaré.',
      '¡Que tenga un buen día! No dude en volver a consultar.',
      '¡Gracias por su consulta! Si necesita más información, escríbame.',
      '¡Un placer ayudarle! Hasta la próxima.',
      '¡Cualquier otra duda, aquí estaré!',
      '¡Hasta luego! Puede volver cuando quiera.',
      '¡Le deseo lo mejor! Si necesita más ayuda, aquí estaré.',
      '¡Gracias por confiar en el sindicato! Hasta pronto.',
      '¡Cuídese! Si tiene más preguntas, no dude en escribir.',
      '¡Hasta la próxima consulta!'
    ],
    ayuda: [
      '¿En qué puedo ayudarle?',
      '¿Le explico algún punto del convenio?',
      '¿Quiere que le aclare alguna duda?',
      '¿Le ayudo con permisos o vacaciones?',
      '¿Desea información sobre pluses o nómina?',
      '¿Le interesa saber sobre permisos retribuidos?',
      '¿Le ayudo a entender su convenio?',
      '¿Quiere consultar sobre bajas o licencias?',
      '¿Le explico los días de descanso?',
      '¿Le ayudo con trámites sindicales?'
    ]
  };
  constructor() {
    this.historial = this.cargarHistorial();
    this.baseCasos = { casos: {}, jurisprudencia: [] }; // Inicializar con estructura vacía
    this.casosListos = false;
    this.ultimaCategoria = localStorage.getItem('atrm_categoria') || null;
    this.ultimoAnio = localStorage.getItem('atrm_anio') || '2025';
    // cargar modo persistido
    try {
      const modo = localStorage.getItem('atrm_modo_respuesta');
      if (modo === 'estricto') { this.modoEstrict = true; this.modoBreve = false; }
      else if (modo === 'completo') { this.modoEstrict = false; this.modoBreve = false; }
      else { this.modoEstrict = false; this.modoBreve = true; }
    } catch {}
    this.cargarBaseCasos();
  }

  async cargarBaseCasos() {
    try {
      const response = await fetch('data/casos.json');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      this.baseCasos = data;
      this.casosListos = true;
      console.log(`✅ Base de casos cargada: ${Object.keys(this.baseCasos?.casos || {}).length} casos`);
    } catch (error) {
      console.error('❌ Error cargando casos:', error);
      this.baseCasos = { casos: {}, jurisprudencia: [] };
      this.casosListos = false;
    }
  }

  async esperarCasos() {
    // Esperar hasta 3 segundos a que se carguen los casos
    for (let i = 0; i < 30; i++) {
      if (this.casosListos) return true;
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    return false;
  }

  cargarHistorial() {
    try {
      return JSON.parse(localStorage.getItem('atrm_historial') || '[]');
    } catch {
      return [];
    }
  }

  guardarHistorial() {
    try {
      localStorage.setItem('atrm_historial', JSON.stringify(this.historial.slice(-20))); // Máximo 20 entradas
    } catch (error) {
      console.warn('Error guardando historial:', error);
    }
  }

  esMultiConsulta(pregunta) {
    const indicadores = [
      /\?.*\?/,  // Múltiples ?
      /\d+[\s]*preguntas?/i,  // "tengo 3 preguntas"
      /[yY]\s+(también|tambien)/,  // "y también"
      /[;\n].*\?/,  // Punto y coma o salto con ?
      /(además|ademas).*\?/i  // "además quiero saber"
    ];
    return indicadores.some(patron => patron.test(pregunta));
  }

  dividirConsulta(pregunta) {
    const separadores = /[\n;]|\?\s*[yY]\s+|\?\s*(además|ademas|también|tambien)/gi;
    let partes = pregunta.split(separadores)
      .map(p => p.trim())
      .filter(p => p.length > 5)
      .map(p => p.endsWith('?') ? p : p + '?');
    
    return partes.length > 1 ? partes : [pregunta];
  }

  buscarContextoHistorial(pregunta) {
    const palabrasClave = pregunta.toLowerCase().split(/\s+/).filter(p => p.length > 3);
    
    return this.historial
      .filter(h => {
        const horasTranscurridas = (Date.now() - h.timestamp) / (1000 * 60 * 60);
        return horasTranscurridas < 48;
      })
      .filter(h => {
        return palabrasClave.some(palabra => 
          h.pregunta.toLowerCase().includes(palabra) || 
          h.tema?.toLowerCase().includes(palabra)
        );
      })
      .slice(-2);
  }

  encontrarCaso(pregunta) {
    if (!this.baseCasos || !this.baseCasos.casos) return null;

    const normalizar = (txt) => txt
      .toLowerCase()
      .normalize('NFD')
      .replace(/\p{Diacritic}/gu, '')
      .replace(/[^a-z0-9\s]/g, ' ')
      .replace(/\s+/g, ' ') // espacios simples
      .trim();

    const consulta = normalizar(pregunta);
    const palabrasPregunta = consulta.split(' ').filter(p => p.length > 2);
    const resultados = [];

    for (const [id, caso] of Object.entries(this.baseCasos.casos)) {
      let score = 0;
      const kws = (caso.keywords || []).map(k => normalizar(k));
      
      for (const kw of kws) {
        const kwPalabras = kw.split(' ').filter(p => p.length > 2);
        
        // Coincidencia exacta de keyword completa (máxima prioridad)
        if (consulta.includes(kw)) {
          score += 10 + kw.length * 0.5;
        }
        // Palabra clave completa encontrada en la pregunta
        else if (palabrasPregunta.includes(kw) && kwPalabras.length === 1) {
          score += 8 + kw.length * 0.4;
        }
        // Todas las palabras de una keyword multi-palabra presentes
        else if (kwPalabras.length > 1) {
          const todasPresentes = kwPalabras.every(p => palabrasPregunta.includes(p));
          if (todasPresentes) {
            score += 7 + kwPalabras.length * 2;
          } else {
            // Coincidencia parcial de keywords multi-palabra
            const coincidencias = kwPalabras.filter(p => palabrasPregunta.includes(p)).length;
            if (coincidencias > 0) {
              score += coincidencias * 2;
            }
          }
        }
        // Coincidencia parcial para keywords de una palabra
        else {
          if (palabrasPregunta.some(p => p.includes(kw) || kw.includes(p))) {
            score += 1.5;
          }
        }
      }
      
      if (score > 0) {
        resultados.push({ id, caso, score: Math.round(score * 100) / 100 });
      }
    }

    resultados.sort((a, b) => b.score - a.score);
    if (resultados.length === 0) return null;
    
    // Guardar top-3 en la instancia para sugerencias posteriores
    this.ultimosResultados = resultados.slice(0, 3);
    const mejor = resultados[0];
    
    // Guardar para debug
    this.ultimoCasoEncontrado = mejor.id;
    this.ultimoScore = mejor.score;
    
    console.log(`🎯 Caso encontrado: ${mejor.id} (score: ${mejor.score})`);
    return { id: mejor.id, ...mejor.caso, _score: mejor.score };
  }

  // Devuelve sugerencias (exceptuando el resultado principal) para la UI (desactivado en modo estricto)
  obtenerSugerencias() {
    if (this.modoEstrict) return [];
    if (!this.ultimosResultados || this.ultimosResultados.length < 2) return [];
    return this.ultimosResultados.slice(1).map(r => ({ id: r.id, titulo: r.caso?.titulo || r.id, score: r.score }));
  }

  // Formatea una versión breve del caso
  formatearBreve(caso) {
    let partes = [];
    if (caso.resumen) partes.push(caso.resumen);
    if (caso.detalle) {
      const lineas = String(caso.detalle).split('\n')
        .map(l => l.trim())
        .filter(l => l);
      // tomar hasta 3 bullets o frases clave
      const bullets = lineas.filter(l => /^[-•\*]/.test(l) || /[:：]$/.test(l) === false).slice(0, 5);
      if (!caso.resumen && bullets.length) partes.push(bullets.slice(0, 3).join('\n'));
    }
    // Añadir 1 ejemplo si existe
    if (Array.isArray(caso.casos_reales) && caso.casos_reales.length) {
      partes.push(`Ejemplo: ${caso.casos_reales[0]}`);
    }
    // Contacto mínimo
    if (caso.contacto) partes.push(`Contacto: ${caso.contacto}`);
    let texto = partes.filter(Boolean).join('\n\n');
    if (texto.length > this.maxCharsBreve) texto = texto.slice(0, this.maxCharsBreve - 1) + '…';
    const lineas = texto.split('\n').slice(0, this.maxLineasBreve);
    return lineas.join('\n');
  }

  async generarRespuesta(pregunta) {
    // Detectar preguntas de ayuda/ejemplos ANTES de buscar casos
    const preguntaLower = pregunta.trim().toLowerCase();
    const patronesAyuda = [
      /^(que|qué) puedo preguntar/i,
      /^(que|qué) puedo pedir/i,
      /^(que|qué) puedes hacer/i,
      /^(que|qué) puedes responder/i,
      /^(sobre )?que temas/i,
      /^(que|qué) temas/i,
      /^(dame|muéstrame|dime) ejemplos/i,
      /^ejemplos/i,
      /^ayuda/i,
      /^help/i
    ];
    
    if (patronesAyuda.some(p => p.test(preguntaLower))) {
      return `💡 **Puedes preguntarme sobre:**\n\n✅ **Permisos y licencias:** bajas médicas, hospitalización familiar, matrimonio, fallecimiento, consultas médicas\n\n✅ **Salario y nómina:** plus de nocturnidad, incrementos salariales, pagas extra, reclamación de nómina\n\n✅ **Vacaciones y jornada:** días de vacaciones, jornada laboral, horas extra, días de lluvia\n\n✅ **Derechos laborales:** despidos, finiquitos, subrogación, acoso laboral, igualdad, contratos\n\n✅ **Trámites:** reducción de jornada, certificados, jubilación, elecciones sindicales\n\n**Ejemplos:**\n• "Háblame de bajas médicas"\n• "¿Cuántos días tengo por hospitalización de mi madre?"\n• "¿Cuánto es el plus de nocturnidad?"\n• "¿Cómo reclamo una nómina incorrecta?"\n\n¡Prueba con cualquiera! 😊`;
    }

    // Si la respuesta es "sí" o "no" y la última pregunta fue de seguimiento, actuar en consecuencia
    const respuestaCorta = preguntaLower;
    const esRespuestaCorta = ["si", "sí", "no"].includes(respuestaCorta);

    if (esRespuestaCorta) {
      const ultima = this.historial.length ? this.historial[this.historial.length - 1] : null;
      if (ultima && ultima.tema && this.baseCasos?.casos?.[ultima.tema]) {
        const caso = this.baseCasos.casos[ultima.tema];
        if (caso.preguntas_followup && caso.preguntas_followup.length > 0) {
          // Hospitalización ampliada
          if (respuestaCorta.startsWith('s')) {
            if (caso.id === 'hospitalizacion_familiar') {
              return '✨ Si la hospitalización supera 15 días, tienes derecho a +1 día más de permiso según el convenio (Art. 14.A). Contacta ATRM para tramitarlo.';
            }
            // Derechos fundamentales
            if (caso.id === 'derechos_fundamentales') {
              return '⚖️ Si crees que se han vulnerado tus derechos fundamentales (igualdad, dignidad, integridad, etc.), contacta ATRM o acude a la Inspección de Trabajo. Teléfono ATRM: 968 626 511. Para denuncias urgentes: 901 50 20 50 (Inspección de Trabajo).';
            }
          } else if (respuestaCorta.startsWith('n')) {
            if (caso.id === 'hospitalizacion_familiar') {
              return 'Perfecto, entonces se aplican los días de permiso estándar indicados en la respuesta anterior.';
            }
            if (caso.id === 'derechos_fundamentales') {
              return 'Si no hay vulneración de derechos fundamentales, puedes consultar cualquier otra duda laboral o sindical.';
            }
          }
        }
      }
    }
    // Si la pregunta es sobre administración pública
    if (/administraci[oó]n p[úu]blica|funcionario|empleado p[úu]blico|ayuntamiento|sector p[úu]blico/i.test(pregunta)) {
      return 'ℹ️ Para consultas sobre administración pública, funcionarios o empleados públicos, puedes contactar con el sindicato ATRM en el 968 626 511 o con el área de personal de tu ayuntamiento. También puedes consultar la web oficial del ayuntamiento o la sede electrónica.';
    }
    
    // CRÍTICO: Esperar a que los casos estén cargados
    await this.esperarCasos();
    
    const contexto = this.buscarContextoHistorial(pregunta);
    const caso = this.encontrarCaso(pregunta);
    
    let respuesta = '';
    let tema = 'consulta_general';
    
    if (contexto.length > 0) {
      respuesta += `🔍 **Recordatorio:** ${contexto[0].tema_humano || 'Consultaste antes'} hace ${this.formatearTiempo(contexto[0].timestamp)}\n\n`;
    }
    
    if (caso) {
      tema = caso.id;
      if (this.modoBreve) {
        // Respuesta concisa (con o sin estricto)
        const encabezado = this.modoEstrict ? '' : `📋 **${caso.titulo}**\n\n`;
        respuesta += encabezado + this.formatearBreve(caso);
      } else if (this.modoEstrict) {
        // Literal: solo contenido bruto sin prefijos ni emojis
        respuesta += `${caso.detalle}\n\n`;
        if (caso.casos_reales?.length) {
          respuesta += `${caso.casos_reales.map(c => `• ${c}`).join('\n')}\n\n`;
        }
        if (caso.comparativa_sectorial) {
          respuesta += `${caso.comparativa_sectorial}\n\n`;
        }
        const jurisprudencia = this.baseCasos.jurisprudencia?.filter(j => j.tema === caso.id);
        if (jurisprudencia?.length) {
          respuesta += `${jurisprudencia[0].resumen} (${jurisprudencia[0].referencia})\n\n`;
        }
        if (caso.documentos?.length) {
          respuesta += `${caso.documentos.join(', ')}\n\n`;
        }
        respuesta += `${caso.contacto}`;
      } else {
        respuesta += `📋 **${caso.titulo}**\n\n${caso.detalle}\n\n`;
        if (caso.casos_reales && caso.casos_reales.length > 0) {
          respuesta += `💼 **Ejemplos reales:**\n${caso.casos_reales.map(c => `• ${c}`).join('\n')}\n\n`;
        }
        if (caso.comparativa_sectorial) {
          respuesta += `🗺️ **Comparativa:** ${caso.comparativa_sectorial}\n\n`;
        }
        const jurisprudencia = this.baseCasos.jurisprudencia?.filter(j => j.tema === caso.id);
        if (jurisprudencia && jurisprudencia.length > 0) {
          respuesta += `⚖️ **Precedente:** ${jurisprudencia[0].resumen} (${jurisprudencia[0].referencia})\n\n`;
        }
        if (caso.documentos) {
          respuesta += `📄 **Documentos:** ${caso.documentos.join(', ')}\n\n`;
        }
        respuesta += `📞 **Gestionar:** ${caso.contacto}`;
        if (this.ultimosResultados && this.ultimosResultados.length > 1) {
          const principalScore = caso._score || this.ultimosResultados[0].score;
          const alternativas = this.ultimosResultados.slice(1).map(r => `${r.caso.titulo || r.id} (${r.score.toFixed(2)})`);
          if (alternativas.length && principalScore < 6) {
            respuesta += `\n\n🔎 **También podrían interesarte:** ${alternativas.join(' · ')}`;
          } else if (alternativas.length && principalScore >= 6) {
            respuesta += `\n\n💡 Temas relacionados: ${alternativas.join(' · ')}`;
          }
        }
      }
    } else {
      // Intentar resolver con la API remota del convenio si no hay match local
      const respuestaAPI = await this.consultarAPI(pregunta);
      let r = respuestaAPI || this.generarRespuestaFallback(pregunta);
      if (this.modoBreve && r) {
        // Recortar respuesta a pocas líneas/caracteres
        const lineas = String(r).split('\n').filter(l => l.trim());
        r = lineas.slice(0, this.maxLineasBreve).join('\n');
        if (r.length > this.maxCharsBreve) r = r.slice(0, this.maxCharsBreve - 1) + '…';
      }
      respuesta = r;
    }
    
    this.historial.push({
      timestamp: Date.now(),
      pregunta: pregunta.substring(0, 100),
      tema: tema,
      tema_humano: caso?.titulo || 'Consulta general'
    });
    this.guardarHistorial();
    
    // Registrar en estadísticas si está disponible
    if (window.sistemaStats) {
      window.sistemaStats.registrarConsulta(pregunta, respuesta, tema || 'general');
    }
    
    return respuesta;
  }

  // Consulta API remota si existe (Vercel/Netlify). Si falla, retorna null.
  async consultarAPI(pregunta) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000); // 15s timeout
      
      const resp = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pregunta }),
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      if (!resp.ok) return null;
      const data = await resp.json();
      return data?.respuesta || null;
    } catch (e) {
      console.warn('Error consultando API externa:', e);
      return null;
    }
  }

  async procesarMultiConsulta(pregunta) {
    const preguntas = this.dividirConsulta(pregunta);
    
    if (preguntas.length === 1) {
      return await this.generarRespuesta(pregunta);
    }
    
    let respuestaCompleta = `🔢 **Tienes ${preguntas.length} consultas. Aquí tienes todas las respuestas:**\n\n`;
    
    for (let i = 0; i < preguntas.length; i++) {
      const respuestaIndividual = await this.generarRespuesta(preguntas[i]);
      respuestaCompleta += `**${i + 1}. ${preguntas[i]}**\n${respuestaIndividual}\n\n---\n\n`;
    }
    
    return respuestaCompleta;
  }

  generarSugerenciaProactiva(nuevaCategoria, nuevoAnio) {
    const cambios = [];
    
    if (this.ultimaCategoria && this.ultimaCategoria !== nuevaCategoria) {
      cambios.push(`categoría cambió de ${this.ultimaCategoria} a ${nuevaCategoria}`);
    }
    
    if (this.ultimoAnio && this.ultimoAnio !== nuevoAnio) {
      cambios.push(`año cambió de ${this.ultimoAnio} a ${nuevoAnio}`);
    }
    
    if (cambios.length > 0) {
      this.ultimaCategoria = nuevaCategoria;
      this.ultimoAnio = nuevoAnio;
      localStorage.setItem('atrm_categoria', nuevaCategoria);
      localStorage.setItem('atrm_anio', nuevoAnio);
      
      return {
        mostrar: true,
        mensaje: `💡 **Tu ${cambios.join(' y ')}.** Esto puede afectar a tus pluses y derechos. ¿Quieres revisar tu situación actual?`,
        acciones: [
          { texto: 'Ver mis pluses', query: `pluses para ${nuevaCategoria} en ${nuevoAnio}` },
          { texto: 'Calcular nómina', query: `calcular salario ${nuevaCategoria} ${nuevoAnio}` }
        ]
      };
    }
    
    return { mostrar: false };
  }

  generarRespuestaFallback(pregunta) {
    // Respuestas personalizadas para saludos y frases comunes
    const saludos = [
      'hola', 'buenos días', 'buenas tardes', 'buenas noches', 'saludos', 'hey', 'holi', 'qué tal', 'buenas', 'hello'
    ];
    const agradecimientos = [
      'gracias', 'muchas gracias', 'te lo agradezco', 'gracias!', 'mil gracias', 'se agradece', 'thank you'
    ];
    const despedidas = [
      'adiós', 'hasta luego', 'nos vemos', 'bye', 'chao', 'hasta pronto', 'me voy', 'hasta la próxima'
    ];
    const preguntaLower = pregunta.trim().toLowerCase();
    // Manejar consultas de ayuda rápidas que preguntan qué pueden preguntar
    const patronesAyuda = [
      /^(que|qué) puedo preguntar/i,
      /^(que|qué) puedo pedir/i,
      /^(que|qué) puedes hacer/i,
      /^(que|qué) puedes responder/i,
      /^(sobre )?que temas/i,
      /^(dame|muéstrame) ejemplos/i
    ];
    if (patronesAyuda.some(p => p.test(preguntaLower))) {
      return `Aquí tienes ejemplos rápidos: \n
- "Háblame de bajas médicas"\n+- "¿Qué permisos por hospitalización tengo?"\n+- "¿Cuánto es el plus de nocturnidad?"\n+- "¿Cómo reclamar una nómina equivocada?"\n+- "¿Qué es la subrogación?"\n\nTambién puedes preguntar por: vacaciones, jornada, pagas extra, matrimonio, excedencias, elecciones sindicales. Si quieres, pruébalo con uno de los ejemplos.`;
    }
    if (saludos.some(s => preguntaLower.startsWith(s) || preguntaLower === s)) {
      // Elegir saludo aleatorio
      const frase = this.frasesHumanas.saludos[Math.floor(Math.random() * this.frasesHumanas.saludos.length)];
      return '👋 ' + frase;
    }
    if (agradecimientos.some(s => preguntaLower.includes(s))) {
      return '😊 ¡De nada! Si tiene más dudas sobre el convenio o sus derechos, aquí estaré.';
    }
    if (despedidas.some(s => preguntaLower.startsWith(s) || preguntaLower === s)) {
      // Elegir despedida aleatoria
      const frase = this.frasesHumanas.despedidas[Math.floor(Math.random() * this.frasesHumanas.despedidas.length)];
      return '👋 ' + frase;
    }
    // Frase de disculpa y ayuda si no reconoce la consulta
    const disculpas = [
      'Lo siento, no tengo información sobre ese tema, pero puedo ayudarle con cualquier duda sobre el convenio, permisos, nómina o derechos laborales.',
      'Disculpe, no sé la respuesta a esa consulta, pero si necesita información sobre el convenio, estaré encantado de ayudarle.',
      'Perdón, no tengo datos sobre eso, pero puedo explicarle cualquier aspecto del convenio o sus derechos laborales.',
      'Lo siento, esa información no está disponible, pero puedo asesorarle sobre el convenio colectivo, permisos o pluses.',
      'Disculpe, no reconozco esa consulta, pero si tiene dudas sobre el convenio, permisos o nómina, aquí estoy para ayudarle.'
    ];
    const ayuda = this.frasesHumanas.ayuda[Math.floor(Math.random() * this.frasesHumanas.ayuda.length)];
    const fraseDisculpa = disculpas[Math.floor(Math.random() * disculpas.length)];
    return window.generarRespuestaLocal ? window.generarRespuestaLocal(pregunta) : 
      `🤖 ${fraseDisculpa} ${ayuda}`;
  }

  async esperarBaseCasos() {
    let intentos = 0;
    while (!this.baseCasos && intentos < 10) {
      await new Promise(resolve => setTimeout(resolve, 100));
      intentos++;
    }
  }

  formatearTiempo(timestamp) {
    const horas = Math.floor((Date.now() - timestamp) / (1000 * 60 * 60));
    if (horas < 1) return 'hace menos de 1 hora';
    if (horas < 24) return `hace ${horas} hora${horas > 1 ? 's' : ''}`;
    const dias = Math.floor(horas / 24);
    return `hace ${dias} día${dias > 1 ? 's' : ''}`;
  }

  obtenerHistorial() {
    return this.historial.slice(-10).reverse();
  }

  limpiarHistorial() {
    this.historial = [];
    localStorage.removeItem('atrm_historial');
  }

  setModoRespuesta(modo) {
    if (modo === 'estricto') { this.modoEstrict = true; this.modoBreve = false; }
    else if (modo === 'completo') { this.modoEstrict = false; this.modoBreve = false; }
    else { this.modoEstrict = false; this.modoBreve = true; modo = 'breve'; }
    try { localStorage.setItem('atrm_modo_respuesta', modo); } catch {}
    return { modoActual: modo, estricto: this.modoEstrict, breve: this.modoBreve };
  }
}

if (typeof window !== 'undefined') {
  window.iaContextual = new IAContextual();
}