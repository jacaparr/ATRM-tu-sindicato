export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { title, message, url } = req.body;
  const ONESIGNAL_APP_ID = "fe43fad2-030c-49f2-83e2-d73581d60bf8";
  const ONESIGNAL_REST_API_KEY = "os_v2_app_7zb7vuqdbre7fa7c242ydvql7bnldxxkjawu2nuyh6jhhs7wl464pmuyycnzeayijnh3olk27mihjldowzaxgpjlte4cfi725e6zd7q";

  // Preparamos el payload de OneSignal
  const payload = {
    app_id: ONESIGNAL_APP_ID,
    included_segments: ['Subscribed Users'], // Envía a todos los suscritos
    headings: { en: title, es: title },
    contents: { en: message, es: message },
    name: 'ATRM Push Notification'
  };

  if (url) {
      payload.url = url; // Url a la que ir al hacer click
  }

  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      Authorization: "Basic " + ONESIGNAL_REST_API_KEY,
      'content-type': 'application/json'
    },
    body: JSON.stringify(payload)
  };

  try {
    const response = await fetch('https://onesignal.com/api/v1/notifications', options);
    const data = await response.json();
    if (response.ok) {
        return res.status(200).json({ success: true, data });
    } else {
        return res.status(400).json({ success: false, error: data });
    }
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
}