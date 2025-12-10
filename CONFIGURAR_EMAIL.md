# 📧 Configuración del correo de denuncias (Resend)

El formulario de denuncias anónimas se apoya en la función serverless `api/denuncia.js`, que envía los mensajes mediante la API de **Resend**. Así mantienes las claves privadas fuera del navegador y usas dominios verificados.

## 🚀 Pasos para dejarlo operativo

### 1. Crear cuenta y verificar dominio
1. Entra a [https://resend.com](https://resend.com) y crea tu cuenta.
2. En el panel, ve a **Domains** y añade tu dominio (ej. `atrm-sindicato.es`).
3. Sigue las instrucciones DNS de Resend hasta que el dominio aparezca como `Verified`.
4. Opcional: crea una dirección específica como `denuncias@atrm-sindicato.es` para este flujo.

### 2. Generar la API Key
1. Dirígete a **API Keys** → **Create API Key**.
2. Asigna un nombre (ej. `denuncias-prod`) y copia el valor mostrado (solo aparece una vez).

### 3. Variables de entorno necesarias
En Vercel (o el proveedor que uses), crea las siguientes variables:

| Variable             | Descripción |
|----------------------|-------------|
| `RESEND_API_KEY`     | Clave privada creada en el paso anterior. |
| `RESEND_FROM`        | Email verificado que actuará como remitente, ej. `denuncias@atrm-sindicato.es`. |
| `RESEND_TO`          | Lista de destinatarios separada por comas (`info@atrm.es,secretaria@atrm.es`). |
| `RESEND_FROM_NAME`   | *(Opcional)* Nombre a mostrar: por defecto "ATRM Denuncias". |
| `RESEND_SUBJECT`     | *(Opcional)* Asunto personalizado. |
| `RESEND_REPLY_TO`    | *(Opcional)* Email que recibirá las respuestas. |

> Consejo: ejecuta `vercel env pull` para traerlas a `.env.local` y usarlas con `vercel dev`.

### 4. Probar el flujo
1. Inicia `vercel dev` (o `netlify dev`).
2. Abre la web en `http://localhost:3000` (o el puerto indicado) y envía una denuncia de prueba.
3. Comprueba que el endpoint responde `{ success: true }` y que el correo llegue a la bandeja indicada en `RESEND_TO`.

## 🔐 Qué hace el backend
- Valida que la denuncia no llegue vacía y limite a 5000 caracteres.
- Añade metadatos útiles (fecha/hora UTC e IP aproximada) al cuerpo del correo.
- Genera HTML y texto plano saneados para evitar inyecciones.
- Si Resend devuelve error, se registra en logs y el frontend informa al usuario para que contacte por teléfono/email.

## 🛠️ Personalización
- Ajusta el contenido del correo editando `buildHtmlBody` o `buildTextBody` en `api/denuncia.js`.
- Añade más destinatarios simplemente ampliando `RESEND_TO` con comas.
- Antes del `fetch` a Resend puedes persistir la denuncia en una base de datos o disparar otra automatización.

---

¿Dudas? Escríbeme y lo dejamos listo juntos.
