// IA para convenio de viaria (Limpieza pública viaria - estructura independiente)

class IAViaria {
  constructor() {
    this.baseCasos = null;
    this.faqs = [];
    this.articulos = [];
    this.modoRespuesta = 'completo';
    this.casosListos = false;
    this.cargarBaseCasos();
  }

  setModoRespuesta(modo) {
    this.modoRespuesta = modo;
  }

  async esperarCasos(maxWait = 3000) {
    const inicio = Date.now();
    while (!this.casosListos && Date.now() - inicio < maxWait) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    if (!this.casosListos) {
      console.warn('⚠️ Timeout esperando casos de viaria');
    }
  }

  async cargarBaseCasos() {
    try {
      // Intentar cargar datos específicos de viaria
      const response = await fetch('data/casos_viaria.json').catch(() => 
        fetch('data/casos.json') // Fallback a casos generales
      );
      this.baseCasos = await response.json();
    } catch (error) {
      console.warn('Error cargando casos viaria:', error);
      this.baseCasos = { casos: {}, jurisprudencia: [] };
    }
    
    // Cargar FAQs y artículos del convenio
    try {
      const faqsResp = await fetch('data/faq_viaria.json').catch(() => null);
      if (faqsResp) {
        this.faqs = (await faqsResp.json()).faqs || [];
      }
    } catch (e) { 
      this.faqs = []; 
    }
    
    try {
      const artResp = await fetch('data/convenio_viaria_articulos.json').catch(() => null);
      if (artResp) {
        this.articulos = (await artResp.json()).articulos || [];
      }
    } catch (e) { 
      this.articulos = []; 
    }
    
    this.casosListos = true;
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

  // Detección por puntuación de keywords en casos_viaria.json
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
    console.log('🎯 Scoring resultados viaria:', resultados);
    return resultados.length && resultados[0].score >= 3 ? resultados[0].id : null;
  }

  // Busca primero en Casos (scoring), luego en FAQs, luego en artículos, luego API Gemini
  async generarRespuesta(pregunta) {
    // Esperar a que los casos estén listos
    await this.esperarCasos();
    
    const preguntaOriginal = pregunta;
    const preguntaNormalizada = pregunta.trim().toLowerCase();
    let respuestaObj = null;

    console.log('🔍 Pregunta viaria:', preguntaOriginal);

    // 0. Casos viaria por palabras clave (solo si match muy claro)
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
    
    // 2. IA Gemini con contexto completo del convenio
    if (!respuestaObj) {
      console.log('🤖 Consultando IA Gemini con contexto del convenio...');
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
      window.sistemaStats.registrarConsulta(preguntaOriginal, respuestaObj.resumen, 'viaria');
    }
    
    return respuestaObj;
  }

  // Fallback a API Gemini con contexto de viaria
  async consultarAPI(pregunta) {
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
}

if (typeof window !== 'undefined') {
  window.iaViaria = new IAViaria();
}
