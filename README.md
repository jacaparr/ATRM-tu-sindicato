# ATRM · Tu Sindicato

Sitio estático con asistente IA para consultas del convenio de Limpieza Pública Viaria (Región de Murcia).

## 🧠 Asistente IA (fallback a modelos externos)

El frontend busca primero en una base local (`data/casos.json`). Si no encuentra un caso, llama a la función serverless `api/chat.js`, que ahora es configurable para usar:

- OpenRouter (por defecto): modelos económicos y algunos gratuitos
- DeepSeek (API nativa): modelo gratuito `deepseek-chat` (según disponibilidad)

### Configuración por variables de entorno

En el entorno de despliegue (Vercel/Netlify), define estas variables:

- `IA_PROVIDER`: `openrouter` (default) | `deepseek`
- `IA_MODEL` (opcional):
	- OpenRouter: por ejemplo `mistralai/mistral-7b-instruct:free` o `deepseek/deepseek-chat`
	- DeepSeek nativo: `deepseek-chat`
- `OPENROUTER_API_KEY`: si `IA_PROVIDER=openrouter`
- `DEEPSEEK_API_KEY`: si `IA_PROVIDER=deepseek`

Si no defines nada, usaremos OpenRouter con `mistralai/mistral-7b-instruct:free`.

### Notas

- La respuesta se limita a ~300 tokens y el frontend puede acortarla si está en modo Breve.
- No se exponen claves en el cliente: todo pasa por `api/chat.js`.

## 🧩 Modos de respuesta

Desde el UI (modal y chat flotante) puedes elegir:

- Breve (por defecto)
- Completo
- Estricto (literal desde JSON local, sin llamadas externas)

La preferencia se guarda en `localStorage` como `atrm_modo_respuesta`.

## ▶️ Desarrollo local

Este proyecto es estático. Para una vista rápida, puedes servirlo con cualquier servidor simple:

```powershell
# PowerShell
python -m http.server 8000
```

Las funciones serverless (`api/`) requieren un entorno como Vercel/Netlify para ejecutarse con variables de entorno.

## 🚨 Denuncias anónimas con Resend

El formulario de denuncias (`index.html` → `#formDenuncia`) hace `fetch` contra `api/denuncia.js`, que envía el mensaje mediante la API de [Resend](https://resend.com/). Así mantenemos el token privado en el backend.

Configura estas variables en tu plataforma (Vercel recomendado):

- `RESEND_API_KEY`: clave privada de Resend.
- `RESEND_FROM`: email verificado que actuará como remitente (por ejemplo, `denuncias@atrm-sindicato.es`).
- `RESEND_TO`: destinatarios separados por coma (uno o varios correos internos).
- `RESEND_FROM_NAME` (opcional): nombre para el remitente (por defecto, "ATRM Denuncias").
- `RESEND_SUBJECT` (opcional): asunto del email.
- `RESEND_REPLY_TO` (opcional): dirección para responder.

La API valida que el texto exista (máx. 5000 caracteres), añade metadatos mínimos (UTC + IP aproximada) y devuelve `{ success: true }` cuando Resend acepta el envío. Ejecuta `vercel dev` (o `netlify dev`) para probarlo en local con tus variables cargadas.

### Registro interno en Supabase (opcional)

Si quieres conservar un histórico y alimentar el panel administrativo:

1. Crea una tabla `denuncias` en Supabase (Postgres) con esta estructura mínima:

```sql
create table public.denuncias (
	id uuid primary key default gen_random_uuid(),
	texto text not null,
	estado text default 'pendiente',
	ip text,
	metadatos jsonb,
	created_at timestamptz default timezone('utc', now()),
	actualizado_en timestamptz default timezone('utc', now())
);
```

2. Define estas variables adicionales en tu entorno (las dos primeras son necesarias para el guardado; las otras habilitan la API interna):

- `SUPABASE_URL`: URL del proyecto (https://xyz.supabase.co)
- `SUPABASE_SERVICE_ROLE`: clave service-role (solo en backend)
- `SUPABASE_TABLE` *(opcional)*: nombre de la tabla (default `denuncias`)
- `ADMIN_API_TOKEN`: token que autoriza el listado interno

3. El endpoint `api/denuncias-list.js` expone las denuncias guardadas (requiere header `x-admin-token`).
4. El panel estático `admin/denuncias.html` consume ese endpoint. Pega el token administrativo una vez y queda guardado en `localStorage` del navegador.

## 📰 Noticias automáticas

- El archivo `data/atrm_sindicato_data.json` se alimenta ahora mediante `scripts/auto_noticias.py`, que consulta los RSS de Google News para términos como *sindicato* y añade hasta 4 novedades recientes.
- El workflow `.github/workflows/auto-news.yml` se ejecuta cada lunes a las 06:00 UTC (y también se puede lanzar manualmente con **Run workflow**). Si el script genera cambios, hace commit y push con el bot de GitHub.
- Para probarlo localmente: `python scripts/auto_noticias.py`. Si no hay noticias nuevas verás `Sin novedades relevantes`; en caso contrario se añadirán al inicio de la lista (máximo 10 en total).

## 📄 Extracción automática del convenio de interiores

- `data/convenio_interiores_articulos.json` se puede regenerar directamente desde el PDF oficial (`assets/convenio_interiores.pdf`).
- Requisitos: `pip install pdfplumber` (puedes añadirlo a un entorno virtual o al `requirements.txt` del proyecto si lo tienes).
- Ejecución básica:

```powershell
python scripts/extraer_convenio_interiores.py
```

- Parámetros opcionales:
	- `--pdf ruta/al/pdf.pdf` si quieres utilizar otra copia del convenio.
	- `--out data/mi_archivo.json` para escribir en una ruta alternativa.
- El script detecta cada "Artículo N" del PDF, limpia el texto y genera keywords automáticas para que la IA de interiores pueda responder directamente desde el convenio. Si detecta cero artículos, revisa que el PDF sea el correcto o que no esté escaneado sin OCR.

## 📁 Datos

- `data/casos.json`: base de conocimiento local de temas del convenio
- `api/chat.js`: proxy a proveedor IA (OpenRouter/DeepSeek)
- `js/ia_mejorada.js`: lógica del asistente en el cliente

