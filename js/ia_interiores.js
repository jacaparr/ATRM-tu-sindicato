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
    pregunta = pregunta.trim().toLowerCase();
    let respuestaObj = null;

    console.log('🔍 Pregunta:', preguntaOriginal);

    // 0. Casos interiores por palabras clave
    const temaId = this.detectarTema(pregunta);
    if (temaId) {
      console.log('✅ Caso detectado:', temaId);
      const caso = this.baseCasos.casos[temaId];
      respuestaObj = {
        resumen: `<strong>${caso.titulo}</strong><br>${caso.detalle}`,
      };
      return respuestaObj; // RETORNAR INMEDIATAMENTE
    }
    
    // 1. Buscar en FAQs (solo si NO encontró en casos)
    if (!respuestaObj && this.faqs && this.faqs.length) {
      const faq = this.faqs.find(f => pregunta.includes(f.pregunta.toLowerCase().split(' ')[1]) || pregunta.includes(f.pregunta.toLowerCase().split(' ')[0]));
      if (faq) {
        console.log('📚 FAQ encontrada');
        respuestaObj = {
          resumen: faq.respuesta + ` <br><span style='color:#888;font-size:13px'>(Referencia: ${faq.referencia})</span>`
        };
        return respuestaObj; // RETORNAR INMEDIATAMENTE
      }
    }
    
    // 2. Buscar en artículos del convenio (búsqueda simple por palabra clave)
    if (!respuestaObj && this.articulos && this.articulos.length) {
      for (const art of this.articulos) {
        if (pregunta.includes(art.titulo.toLowerCase().split(' ')[0]) || pregunta.includes(art.titulo.toLowerCase().split(' ')[1])) {
          console.log('📄 Artículo encontrado');
          respuestaObj = {
            resumen: `<strong>${art.titulo}</strong>: ${art.texto} <br><span style='color:#888;font-size:13px'>(Referencia: ${art.referencia})</span>`
          };
          return respuestaObj; // RETORNAR INMEDIATAMENTE
        }
      }
    }
    
    // 3. Fallback a API externa
    if (!respuestaObj) {
      console.log('🌐 Fallback a API');
      const apiResp = await this.consultarAPI(pregunta);
      if (apiResp) {
        respuestaObj = { resumen: apiResp };
      } else {
        respuestaObj = { resumen: 'No he encontrado una respuesta directa en el convenio. Por favor, consulta el PDF oficial o contacta con ATRM.' };
      }
    }
    
    // Registrar en estadísticas si está disponible
    if (window.sistemaStats && respuestaObj) {
      window.sistemaStats.registrarConsulta(preguntaOriginal, respuestaObj.resumen, 'interiores');
    }
    
    return respuestaObj;
  }

  // Fallback a API externa con contexto de interiores
  async consultarAPI(pregunta) {
    // Contexto resumido del convenio de interiores (puedes ampliar este texto)
  const convenioKB = `CONVENIO COLECTIVO DE LIMPIEZA DE EDIFICIOS Y LOCALES - REGIÓN DE MURCIA\nVigencia: BORM 20/09/2024\n\n=== JORNADA Y DESCANSOS ===\n- Jornada máxima anual: 1.792 horas.\n- Jornada ordinaria: 40 horas semanales, salvo reducción por acuerdo.\n- Descanso semanal: 1,5 días ininterrumpidos.\n- Pausa diaria: 15 minutos si la jornada supera 6 horas.\n\n=== VACACIONES ===\n- 30 días naturales por año trabajado.\n- No sustituibles por compensación económica salvo fin de contrato.\n- El periodo se fija de común acuerdo.\n\n=== SALARIO Y PAGAS EXTRA ===\n- Salario base según categoría profesional (ver tabla salarial vigente).\n- 3 pagas extra: junio, diciembre y marzo.\n- Antigüedad: trienios al 5% del salario base.\n\n=== PERMISOS Y LICENCIAS ===\n- Matrimonio: 15 días naturales.\n- Nacimiento de hijo/a: 2 días (4 si hay desplazamiento).\n- Fallecimiento de familiar: 2 días (4 si hay desplazamiento).\n- Mudanza: 1 día.\n- Exámenes: el tiempo necesario.\n- Hospitalización familiar: 2-4 días según grado.\n\n=== BAJA MÉDICA E INCAPACIDAD TEMPORAL ===\n- Accidente laboral: complemento hasta 100% del salario desde el primer día.\n- Enfermedad común: complemento hasta 100% desde el día 16.\n\n=== SUBROGACIÓN ===\n- En caso de cambio de empresa adjudicataria, se mantiene la antigüedad, salario y condiciones.\n- La nueva empresa debe respetar el convenio.\n\n=== OTROS DERECHOS ===\n- Reducción de jornada por guarda legal.\n- Excedencias voluntarias y por cuidado de familiares.\n- Igualdad y no discriminación.\n- Prevención de riesgos laborales.\n\n=== TABLA SALARIAL (ejemplo 2024) ===\n- Peón/a: 1.200 €/mes\n- Especialista: 1.250 €/mes\n- Encargado/a: 1.400 €/mes\n(Consulta la tabla oficial para tu categoría)\n\n=== CONTACTO SINDICATO ===\nATRM 968 626 511\n`;
    try {
      const resp = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pregunta: `Información del convenio:\n${convenioKB}\n\nPregunta del trabajador: ${pregunta}` })
      });
      if (!resp.ok) return null;
      const data = await resp.json();
      return data?.respuesta || null;
    } catch (e) {
      return null;
    }
  }
}
if (typeof window !== 'undefined') {
  window.iaInteriores = new IAInteriores();
}
