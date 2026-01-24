/**
 * Sistema de IA mejorado para ATRM
 * Motor de respuestas basado en convenio colectivo con búsqueda inteligente
 */

class IAConvenioATRM {
  constructor() {
    this.convenioData = null;
    this.casosData = null;
    this.historial = [];
    this.contextoActual = null;
    this.cargarDatos();
  }

  async cargarDatos() {
    try {
      const [convenio, casos] = await Promise.all([
        fetch('data/atrm_sindicato_data.json').then(r => r.json()),
        fetch('data/casos.json').then(r => r.json())
      ]);
      this.convenioData = convenio;
      this.casosData = casos;
      console.log('✅ Datos del convenio cargados correctamente');
    } catch (error) {
      console.error('❌ Error cargando datos:', error);
    }
  }

  /**
   * Normaliza texto para búsqueda (elimina acentos, pasa a minúsculas)
   */
  normalizar(texto) {
    return texto
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .trim();
  }

  /**
   * Detecta el tema/caso de la pregunta
   */
  detectarTema(pregunta) {
    const consultaNorm = this.normalizar(pregunta);
    const palabras = consultaNorm.split(/\s+/);
    
    if (!this.casosData || !this.casosData.casos) {
      return null;
    }

    let mejorMatch = null;
    let mejorScore = 0;

    // Buscar en todos los casos
    for (const [id, caso] of Object.entries(this.casosData.casos)) {
      let score = 0;
      
      // Verificar keywords
      if (caso.keywords) {
        for (const keyword of caso.keywords) {
          const keyNorm = this.normalizar(keyword);
          
          // Match exacto de keyword completo
          if (consultaNorm.includes(keyNorm)) {
            score += keyNorm.length * 3;
          }
          
          // Match de palabras individuales
          const keyPalabras = keyNorm.split(/\s+/);
          for (const keyPalabra of keyPalabras) {
            if (keyPalabra.length >= 3 && palabras.includes(keyPalabra)) {
              score += 2;
            }
          }
        }
      }
      
      // Verificar título y resumen
      if (caso.titulo) {
        const tituloNorm = this.normalizar(caso.titulo);
        if (consultaNorm.includes(tituloNorm)) score += 5;
      }
      
      if (caso.resumen) {
        const resumenNorm = this.normalizar(caso.resumen);
        const resumenPalabras = resumenNorm.split(/\s+/);
        for (const palabra of resumenPalabras) {
          if (palabra.length >= 4 && palabras.includes(palabra)) {
            score += 1;
          }
        }
      }
      
      if (score > mejorScore) {
        mejorScore = score;
        mejorMatch = { id, caso, score };
      }
    }

    return mejorScore >= 3 ? mejorMatch : null;
  }

  /**
   * Formatea la respuesta del caso encontrado
   */
  formatearRespuesta(match) {
    const { caso } = match;
    let respuesta = [];

    // Título
    if (caso.titulo) {
      respuesta.push(`## ${caso.titulo}\n`);
    }

    // Resumen
    if (caso.resumen) {
      respuesta.push(`**${caso.resumen}**\n`);
    }

    // Detalle
    if (caso.detalle) {
      respuesta.push(caso.detalle);
      respuesta.push('');
    }

    // Documentos necesarios
    if (caso.documentos && caso.documentos.length > 0) {
      respuesta.push('📄 **Documentos necesarios:**');
      caso.documentos.forEach(doc => {
        respuesta.push(`• ${doc}`);
      });
      respuesta.push('');
    }

    // Casos reales (ejemplos)
    if (caso.casos_reales && caso.casos_reales.length > 0) {
      respuesta.push('📋 **Ejemplos reales:**');
      caso.casos_reales.slice(0, 2).forEach(ejemplo => {
        respuesta.push(`• ${ejemplo}`);
      });
      respuesta.push('');
    }

    // Comparativa sectorial
    if (caso.comparativa_sectorial) {
      respuesta.push(`🔍 **Comparativa:** ${caso.comparativa_sectorial}\n`);
    }

    // Contacto
    if (caso.contacto) {
      respuesta.push(`📞 **Contacto ATRM:** ${caso.contacto}`);
    }

    return respuesta.join('\n');
  }

  /**
   * Detecta saludos
   */
  esSaludo(pregunta) {
    const saludos = ['hola', 'buenos dias', 'buenas tardes', 'buenas noches', 'hey', 'saludos'];
    const norm = this.normalizar(pregunta);
    return saludos.some(s => norm.includes(s) && norm.length < 30);
  }

  /**
   * Detecta solicitud de ayuda/ejemplos
   */
  esAyuda(pregunta) {
    const norm = this.normalizar(pregunta);
    const patrones = [
      'que puedo preguntar',
      'que puedes responder',
      'dame ejemplos',
      'ayuda',
      'help',
      'que temas',
      'sobre que'
    ];
    return patrones.some(p => norm.includes(p));
  }

  /**
   * Genera respuesta de ayuda con ejemplos
   */
  generarAyuda() {
    return `💡 **Puedo ayudarte con información sobre el Convenio de Limpieza Viaria:**

📋 **Temas disponibles:**

✅ **Permisos retribuidos:**
   • Hospitalización familiar
   • Matrimonio
   • Fallecimiento
   • Consultas médicas
   • Paternidad/maternidad

💰 **Salarios y nómina:**
   • Plus de nocturnidad
   • Incrementos salariales
   • Pagas extra
   • Antigüedad

🏖️ **Vacaciones y descansos:**
   • Días de vacaciones
   • Días de asuntos propios
   • Festivos
   • Jornada laboral

⚖️ **Derechos laborales:**
   • Contratos
   • Despidos y finiquitos
   • Subrogación
   • Igualdad

🌧️ **Condiciones de trabajo:**
   • Días de lluvia
   • Seguridad laboral
   • Vestuario

**Ejemplos de preguntas:**
• "¿Cuántos días tengo por hospitalización de mi madre?"
• "¿Cuánto cobro de plus de nocturnidad?"
• "¿Cuántos días de vacaciones me corresponden?"
• "¿Qué pasa si me despiden?"

📞 **Contacto ATRM:** 968 30 00 37`;
  }

  /**
   * Genera respuesta de saludo
   */
  generarSaludo() {
    const saludos = [
      '¡Hola! Soy el asistente del sindicato ATRM. ¿En qué puedo ayudarte con el convenio de limpieza viaria?',
      '¡Buenos días! ¿Qué información del convenio necesitas?',
      '¡Hola! ¿Tienes alguna duda sobre tus derechos laborales?',
      '¡Saludos! ¿En qué tema del convenio te puedo ayudar?'
    ];
    return saludos[Math.floor(Math.random() * saludos.length)];
  }

  /**
   * Genera respuesta cuando no encuentra tema
   */
  generarNoEncontrado(pregunta) {
    return `Lo siento, no he encontrado información específica sobre "${pregunta}" en el convenio.

**Puedes probar:**
• Reformular tu pregunta con otras palabras
• Ver los temas disponibles escribiendo "ayuda"
• Contactar directamente con ATRM: 968 30 00 37

¿Puedo ayudarte con algo más?`;
  }

  /**
   * Método principal: procesa pregunta y genera respuesta con Gemini
   */
  async responder(pregunta) {
    console.log('🤖 IA.responder() llamada con:', pregunta);
    
    if (!pregunta || pregunta.trim().length === 0) {
      console.log('⚠️ Pregunta vacía, devolviendo saludo');
      return this.generarSaludo();
    }

    // Esperar a que los datos estén cargados
    let intentos = 0;
    while (!this.casosData && intentos < 20) {
      await new Promise(resolve => setTimeout(resolve, 100));
      intentos++;
    }

    if (!this.casosData) {
      console.error('❌ casosData no se cargó después de esperar');
      return '❌ Error: No se pudieron cargar los datos del convenio. Por favor, recarga la página.';
    }
    
    console.log('✅ Datos disponibles, procesando pregunta...');

    // Detectar tipo de consulta
    if (this.esSaludo(pregunta)) {
      return this.generarSaludo();
    }

    if (this.esAyuda(pregunta)) {
      return this.generarAyuda();
    }

    // Intentar buscar tema relevante en datos locales primero
    const match = this.detectarTema(pregunta);
    console.log('🔍 Match detectado:', match ? match.id : 'ninguno');
    
    if (match) {
      // Si encontramos coincidencia local, usar eso
      this.contextoActual = match;
      this.historial.push({
        pregunta,
        tema: match.id,
        timestamp: Date.now()
      });
      const respuesta = this.formatearRespuesta(match);
      console.log('📤 Respuesta local generada');
      return respuesta;
    }

    // Si no encontramos coincidencia local, usar Gemini API
    console.log('🌐 Usando Gemini API para responder...');
    try {
      const respuestaGemini = await this.consultarGemini(pregunta);
      if (respuestaGemini) {
        this.historial.push({
          pregunta,
          tema: 'gemini',
          timestamp: Date.now()
        });
        return respuestaGemini;
      }
    } catch (error) {
      console.error('❌ Error al consultar Gemini:', error);
    }

    // Fallback a respuesta genérica si todo falla
    console.log('❓ No se encontró información, mostrando ayuda');
    return this.generarNoEncontrado(pregunta);
  }

  /**
   * Consulta a Google Gemini API
   */
  async consultarGemini(pregunta) {
    try {
      const resp = await fetch('/api/chat-gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          pregunta,
          tipo_convenio: 'viaria'
        })
      });
      
      if (!resp.ok) {
        console.error('API Gemini error:', resp.status);
        return null;
      }
      
      const data = await resp.json();
      return data?.respuesta || null;
    } catch (e) {
      console.error('Error consultando API Gemini:', e);
      return null;
    }
  }

  /**
   * Obtiene sugerencias de preguntas relacionadas
   */
  obtenerSugerencias() {
    if (!this.contextoActual || !this.contextoActual.caso.preguntas_followup) {
      return [];
    }
    return this.contextoActual.caso.preguntas_followup.slice(0, 3);
  }
}

// Exportar instancia global
window.iaContextual = new IAConvenioATRM();
