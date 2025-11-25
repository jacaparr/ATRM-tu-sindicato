# 📧 Configuración de EmailJS para Denuncias Anónimas

El formulario de denuncias ahora envía emails reales usando **EmailJS** (servicio gratuito).

## 🚀 Pasos para configurar:

### 1. Crear cuenta en EmailJS
1. Ve a [https://www.emailjs.com/](https://www.emailjs.com/)
2. Crea una cuenta gratuita (permite 200 emails/mes gratis)
3. Verifica tu email

### 2. Configurar servicio de email
1. En el dashboard, ve a **Email Services**
2. Haz clic en **Add New Service**
3. Selecciona tu proveedor (Gmail, Outlook, etc.)
4. Conecta tu cuenta de email donde quieres recibir las denuncias (ej: `info@atrm-sindicato.es`)
5. Copia el **Service ID** que te da (algo como `service_abc123`)

### 3. Crear plantilla de email
1. Ve a **Email Templates**
2. Haz clic en **Create New Template**
3. En el editor, usa esta plantilla:

```
Asunto: 🚨 Nueva Denuncia Anónima - ATRM

Nueva denuncia anónima recibida desde la web:

📝 CONTENIDO:
{{denuncia}}

📅 FECHA: {{fecha}}
🏷️ TIPO: {{tipo}}

---
Este mensaje fue enviado automáticamente desde https://atrm-tu-sindicato.vercel.app/
```

4. Guarda y copia el **Template ID** (algo como `template_xyz789`)

### 4. Obtener clave pública
1. Ve a **Account** → **General**
2. Copia tu **Public Key** (algo como `abc123def456`)

### 5. Actualizar el código
Abre `index.html` y busca estas líneas (alrededor de la línea 209):

```javascript
emailjs.init({
  publicKey: "YOUR_PUBLIC_KEY", // ⬅️ Reemplazar con tu Public Key
});
```

```javascript
emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
  // ⬆️ Reemplazar con tu Service ID y Template ID
```

Reemplaza:
- `YOUR_PUBLIC_KEY` → Tu Public Key de EmailJS
- `YOUR_SERVICE_ID` → Tu Service ID
- `YOUR_TEMPLATE_ID` → Tu Template ID

### 6. Probar
1. Guarda los cambios
2. Haz commit y push:
```bash
git add index.html
git commit -m "Configurar EmailJS para denuncias"
git push origin main
```
3. Ve a la web y prueba enviar una denuncia de prueba
4. Deberías recibir el email en la cuenta configurada

## 📊 Límites del plan gratuito:
- ✅ 200 emails por mes
- ✅ Sin tarjeta de crédito requerida
- ✅ Servicio confiable y rápido

## 🔐 Seguridad:
- Las claves públicas son seguras para usar en el frontend
- Las denuncias se envían directamente a tu email sin almacenar en base de datos
- El sistema es totalmente anónimo (no registra IPs ni datos del usuario)

## 💡 Alternativa: Formspree
Si prefieres otro servicio, puedes usar [Formspree](https://formspree.io/) que es aún más simple:
1. Regístrate en formspree.io
2. Crea un formulario
3. Te dan un endpoint
4. Cambia el `emailjs.send()` por un fetch a ese endpoint

---

**¿Necesitas ayuda?** Contáctame y te ayudo a configurarlo paso a paso.
