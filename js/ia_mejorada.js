// IA mejorada sin coste - ATRM Sindicato
class IAContextual {
  constructor() {
    this.historial = this.cargarHistorial();
    this.baseCasos = null;
    this.ultimaCategoria = localStorage.getItem('atrm_categoria') || null;
    this.ultimoAnio = localStorage.getItem('atrm_anio') || '2025';
    this.cargarBaseCasos();
  }

  async cargarBaseCasos() {
    try {
      const response = await fetch('data/casos.json');
      this.baseCasos = await response.json();
    } catch (error) {
      console.warn('Error cargando casos:', error);
      this.baseCasos = { casos: {}, jurisprudencia: [] };
    }
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
    
    const preguntaLower = pregunta.toLowerCase();
    
    for (const [id, caso] of Object.entries(this.baseCasos.casos)) {
      if (caso.keywords.some(keyword => preguntaLower.includes(keyword.toLowerCase()))) {
        return { id, ...caso };
      }
    }
    
    return null;
  }

  async generarRespuesta(pregunta) {
    await this.esperarBaseCasos();
    
    const contexto = this.buscarContextoHistorial(pregunta);
    const caso = this.encontrarCaso(pregunta);
    
    let respuesta = '';
    let tema = 'consulta_general';
    
    if (contexto.length > 0) {
      respuesta += `🔍 **Recordatorio:** ${contexto[0].tema_humano || 'Consultaste antes'} hace ${this.formatearTiempo(contexto[0].timestamp)}\n\n`;
    }
    
    if (caso) {
      tema = caso.id;
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
      
    } else {
      respuesta = this.generarRespuestaFallback(pregunta);
    }
    
    this.historial.push({
      timestamp: Date.now(),
      pregunta: pregunta.substring(0, 100),
      tema: tema,
      tema_humano: caso?.titulo || 'Consulta general'
    });
    this.guardarHistorial();
    
    return respuesta;
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
    return window.generarRespuestaLocal ? window.generarRespuestaLocal(pregunta) : 
      '🤖 **Consulta no reconocida.** Prueba con: "ingreso de madre", "días de lluvia", "nocturnidad", etc.';
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
}

if (typeof window !== 'undefined') {
  window.iaContextual = new IAContextual();
}