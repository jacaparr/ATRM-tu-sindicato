require('dotenv').config();
const axios = require('axios');
const fs = require('fs').promises;
const path = require('path');

/**
 * Script para generar vídeos con D-ID API
 * Tutorial: https://docs.d-id.com/reference/createtalk
 * 
 * REQUISITOS:
 * 1. Registrarse en https://studio.d-id.com/
 * 2. Obtener API Key desde: https://studio.d-id.com/account-settings
 * 3. Añadir DID_API_KEY=tu_clave en .env
 * 
 * TRIAL GRATUITO: 5 minutos de vídeo
 */

const DID_API_KEY = process.env.DID_API_KEY;
const DID_API_URL = 'https://api.d-id.com/talks';

// Configuración de avatares disponibles
const AVATARES = {
  hombre_profesional: 'amy-jcwCkrULAS', // Avatar masculino profesional
  mujer_profesional: 'anna-qSmokMMJfr', // Avatar femenino profesional
  hombre_cercano: 'jacob-jB4yLLRRf7', // Avatar más informal
  mujer_cercana: 'natalie-tbNkyODcl3' // Avatar más informal
};

// Voces en español disponibles (Microsoft Azure)
const VOCES = {
  hombre_español: 'es-ES-AlvaroNeural',
  mujer_española: 'es-ES-ElviraNeural',
  hombre_mexicano: 'es-MX-JorgeNeural',
  mujer_mexicana: 'es-MX-DaliaNeural'
};

/**
 * Genera un vídeo con D-ID
 * @param {Object} opciones - Configuración del vídeo
 * @param {string} opciones.texto - Texto que dirá el avatar
 * @param {string} opciones.avatar - ID del avatar (ver AVATARES)
 * @param {string} opciones.voz - ID de la voz (ver VOCES)
 * @param {string} opciones.nombre_archivo - Nombre del archivo de salida
 */
async function generarVideo({ texto, avatar = 'hombre_profesional', voz = 'hombre_español', nombre_archivo }) {
  
  if (!DID_API_KEY) {
    throw new Error('❌ Falta DID_API_KEY en .env. Lee las instrucciones en el archivo.');
  }

  console.log(`\n🎬 Generando vídeo: ${nombre_archivo}`);
  console.log(`📝 Texto: ${texto.substring(0, 100)}...`);
  console.log(`👤 Avatar: ${avatar}`);
  console.log(`🗣️ Voz: ${voz}`);

  try {
    // 1. Crear el vídeo (D-ID lo procesa en segundo plano)
    const response = await axios.post(
      DID_API_URL,
      {
        script: {
          type: 'text',
          input: texto,
          provider: {
            type: 'microsoft',
            voice_id: VOCES[voz]
          }
        },
        source_url: `https://create-images-results.d-id.com/DefaultPresenters/${AVATARES[avatar]}/image.jpeg`,
        config: {
          result_format: 'mp4',
          fluent: true, // Movimientos más naturales
          pad_audio: 0
        }
      },
      {
        headers: {
          'Authorization': `Basic ${DID_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const videoId = response.data.id;
    console.log(`✅ Vídeo creado con ID: ${videoId}`);
    console.log(`⏳ Esperando a que D-ID procese el vídeo...`);

    // 2. Esperar a que el vídeo esté listo
    let videoUrl = null;
    let intentos = 0;
    const maxIntentos = 60; // 5 minutos máximo (5 segundos x 60)

    while (!videoUrl && intentos < maxIntentos) {
      await new Promise(resolve => setTimeout(resolve, 5000)); // Esperar 5 segundos
      
      const statusResponse = await axios.get(
        `${DID_API_URL}/${videoId}`,
        {
          headers: {
            'Authorization': `Basic ${DID_API_KEY}`
          }
        }
      );

      const status = statusResponse.data.status;
      console.log(`📊 Estado: ${status}`);

      if (status === 'done') {
        videoUrl = statusResponse.data.result_url;
      } else if (status === 'error') {
        throw new Error(`Error al procesar el vídeo: ${statusResponse.data.error}`);
      }

      intentos++;
    }

    if (!videoUrl) {
      throw new Error('Timeout: El vídeo tardó demasiado en procesarse');
    }

    // 3. Descargar el vídeo
    console.log(`⬇️ Descargando vídeo desde: ${videoUrl}`);
    const videoResponse = await axios.get(videoUrl, { responseType: 'arraybuffer' });
    
    // 4. Guardar el vídeo
    const videosDir = path.join(__dirname, '..', 'videos', 'contenido');
    await fs.mkdir(videosDir, { recursive: true });
    
    const rutaArchivo = path.join(videosDir, `${nombre_archivo}.mp4`);
    await fs.writeFile(rutaArchivo, videoResponse.data);
    
    console.log(`✅ Vídeo guardado en: ${rutaArchivo}`);
    
    return {
      exito: true,
      ruta: rutaArchivo,
      url: videoUrl,
      id: videoId
    };

  } catch (error) {
    console.error('❌ Error al generar vídeo:', error.response?.data || error.message);
    throw error;
  }
}

/**
 * Genera los vídeos de prueba (trial gratuito = 5 minutos)
 * Usaremos los 2 primeros guiones: ~6-8 minutos de contenido
 */
async function generarVideosPrueba() {
  console.log('🚀 Iniciando generación de vídeos de prueba con D-ID');
  console.log('📦 Trial gratuito: 5 minutos de vídeo');
  console.log('🎯 Generando 2 vídeos cortos (≈2.5 minutos cada uno)\n');

  // Cargar los guiones completos
  const guionesPath = path.join(__dirname, '..', 'videos', 'GUIONES_COMPLETOS.md');
  const guionesContent = await fs.readFile(guionesPath, 'utf-8');

  // Extraer texto del primer vídeo (simplificado para prueba)
  const video1_texto = `
¡Bienvenido a ATRM, tu sindicato!
El convenio colectivo de limpieza de edificios y locales de la Región de Murcia es el documento que regula tus derechos laborales.
Este acuerdo fue firmado entre representantes sindicales y empresariales, y está publicado en el Boletín Oficial de la Región de Murcia.
Cubre aspectos fundamentales como salarios, jornadas, categorías profesionales y condiciones de trabajo.
Como trabajador del sector, este convenio te protege y garantiza condiciones dignas.
Si tienes dudas, en ATRM estamos para ayudarte. ¡Contáctanos!
  `.trim();

  const video2_texto = `
¿Cuántas horas debes trabajar según el convenio?
La jornada laboral máxima es de 1748 horas anuales, lo que equivale a 40 horas semanales en promedio.
El convenio permite jornadas especiales como tiempo parcial, nocturno o por turnos, siempre respetando tus derechos.
El horario debe respetarse estrictamente: cualquier hora extra debe ser compensada según lo establecido.
Además, tienes derecho a descansos durante tu jornada y entre jornadas.
Recuerda: conocer tus derechos es el primer paso para defenderlos. ATRM está contigo.
  `.trim();

  try {
    // Vídeo 1: ¿Qué es el Convenio Colectivo?
    await generarVideo({
      texto: video1_texto,
      avatar: 'mujer_profesional',
      voz: 'mujer_española',
      nombre_archivo: 'video1_que_es_convenio'
    });

    // Vídeo 2: Jornada Laboral Según el Convenio
    await generarVideo({
      texto: video2_texto,
      avatar: 'hombre_profesional',
      voz: 'hombre_español',
      nombre_archivo: 'video2_jornada_laboral'
    });

    console.log('\n🎉 ¡Vídeos de prueba generados exitosamente!');
    console.log('📁 Ubicación: videos/contenido/');
    console.log('\n📊 Próximos pasos:');
    console.log('1. Revisa los vídeos generados');
    console.log('2. Si te gustan, considera el plan de pago ($29/mes) para generar los 28 restantes');
    console.log('3. Ejecuta: node scripts/actualizar-videos-js.js para actualizar la web');

  } catch (error) {
    console.error('\n❌ Error en la generación de vídeos de prueba');
    console.error('Revisa que:');
    console.error('1. DID_API_KEY esté correctamente configurada en .env');
    console.error('2. Tengas créditos disponibles en tu cuenta de D-ID');
    console.error('3. La API de D-ID esté funcionando: https://status.d-id.com/');
  }
}

// Ejecutar si se llama directamente
if (require.main === module) {
  generarVideosPrueba();
}

module.exports = { generarVideo, AVATARES, VOCES };
