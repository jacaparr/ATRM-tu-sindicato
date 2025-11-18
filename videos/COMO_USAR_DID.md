# 🎬 Cómo Generar Vídeos con D-ID (Trial Gratuito)

## 📋 Pasos para Empezar

### 1️⃣ Crear Cuenta en D-ID (5 minutos gratis)

1. Ve a https://studio.d-id.com/
2. Haz clic en "Sign Up" (arriba derecha)
3. Regístrate con tu email o Google
4. Confirma tu email

### 2️⃣ Obtener tu API Key

1. Una vez dentro, ve a tu perfil (icono de usuario arriba derecha)
2. Selecciona **"Account Settings"**
3. En el menú lateral, haz clic en **"API Keys"**
4. Copia tu API Key (empieza con algo como `Basic abc123...`)

### 3️⃣ Configurar el Proyecto

Abre el archivo `.env` y añade tu clave:

```env
DID_API_KEY=Basic tu_clave_aqui
```

⚠️ **IMPORTANTE**: Incluye la palabra "Basic" antes de la clave.

### 4️⃣ Generar los Vídeos de Prueba

En la terminal PowerShell, ejecuta:

```powershell
node scripts/generar-video-did.js
```

Esto generará 2 vídeos (≈2.5 minutos cada uno):
- ✅ **Vídeo 1**: ¿Qué es el Convenio Colectivo?
- ✅ **Vídeo 2**: Jornada Laboral Según el Convenio

### 5️⃣ Esperar el Procesamiento

- D-ID tarda entre **1-3 minutos** por vídeo
- El script mostrará el progreso en tiempo real:
  ```
  🎬 Generando vídeo: video1_que_es_convenio
  ✅ Vídeo creado con ID: abc123
  ⏳ Esperando a que D-ID procese el vídeo...
  📊 Estado: processing
  📊 Estado: done
  ⬇️ Descargando vídeo...
  ✅ Vídeo guardado en: videos/contenido/video1_que_es_convenio.mp4
  ```

### 6️⃣ Revisar los Vídeos

Los vídeos se guardarán en:
```
videos/
  └── contenido/
      ├── video1_que_es_convenio.mp4
      └── video2_jornada_laboral.mp4
```

Ábrelos con el reproductor de Windows para verlos.

---

## 🎯 Créditos del Trial Gratuito

- **Trial gratuito**: 5 minutos de vídeo
- **Vídeo 1**: ≈2 minutos (avatar femenino, voz española)
- **Vídeo 2**: ≈2.5 minutos (avatar masculino, voz española)
- **Total usado**: ≈4.5 minutos de los 5 disponibles

---

## 💰 Planes de Pago (si te convence el resultado)

Si los vídeos de prueba te gustan y quieres generar los 28 restantes:

### Opción 1: Plan Lite ($5.90/mes)
- 10 minutos de vídeo/mes
- Suficiente para 3-4 vídeos
- Tendrías que mantenerlo 8-10 meses

### Opción 2: Plan Pro ($29/mes) ⭐ RECOMENDADO
- 100 minutos de vídeo/mes
- Suficiente para los 30 vídeos (≈120 min)
- **Paga 1 mes, genera todo, cancela**

### Opción 3: Plan Advanced ($196/mes)
- 300 minutos/mes
- Solo si planeas hacer mucho más contenido

---

## 🔧 Personalización de los Vídeos

Si quieres cambiar avatares o voces, edita `scripts/generar-video-did.js`:

### Avatares disponibles:
```javascript
hombre_profesional: 'amy-jcwCkrULAS'
mujer_profesional: 'anna-qSmokMMJfr'
hombre_cercano: 'jacob-jB4yLLRRf7'
mujer_cercana: 'natalie-tbNkyODcl3'
```

### Voces disponibles:
```javascript
hombre_español: 'es-ES-AlvaroNeural'
mujer_española: 'es-ES-ElviraNeural'
hombre_mexicano: 'es-MX-JorgeNeural'
mujer_mexicana: 'es-MX-DaliaNeural'
```

---

## ❓ Resolución de Problemas

### Error: "DID_API_KEY no encontrada"
- Verifica que `.env` tenga la línea `DID_API_KEY=Basic tu_clave`
- Asegúrate de incluir "Basic" antes de la clave

### Error: "Authentication failed"
- Tu API Key es incorrecta
- Cópiala de nuevo desde https://studio.d-id.com/account-settings

### Error: "Insufficient credits"
- Has agotado los 5 minutos gratuitos
- Necesitas añadir un método de pago en D-ID

### El vídeo tarda mucho
- Normal: D-ID puede tardar 1-3 minutos por vídeo
- Si tarda más de 5 minutos, revisa https://status.d-id.com/

---

## 📊 Siguientes Pasos

Una vez tengas los 2 vídeos de prueba:

1. **Revísalos y decide** si te gusta la calidad
2. **Si te convence**: Añade método de pago y suscríbete al plan de $29
3. **Genera los 28 restantes**: Ejecuta el script completo (próximamente)
4. **Cancela la suscripción** cuando tengas todos los vídeos

---

## 🆘 Soporte

- Documentación D-ID: https://docs.d-id.com/
- Estado del servicio: https://status.d-id.com/
- Soporte D-ID: support@d-id.com
