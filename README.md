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

## 📁 Datos

- `data/casos.json`: base de conocimiento local de temas del convenio
- `api/chat.js`: proxy a proveedor IA (OpenRouter/DeepSeek)
- `js/ia_mejorada.js`: lógica del asistente en el cliente

