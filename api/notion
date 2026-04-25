export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Notion-Version');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const notionPath = req.query.path || '';
  const notionUrl = `https://api.notion.com/v1/${notionPath}`;

  try {
    const fetchOptions = {
      method: req.method,
      headers: {
        'Content-Type': 'application/json',
        'Notion-Version': req.headers['notion-version'] || '2022-06-28',
        'Authorization': req.headers['authorization'] || '',
      },
    };
    if (req.method !== 'GET' && req.body) {
      fetchOptions.body = JSON.stringify(req.body);
    }
    const notionRes = await fetch(notionUrl, fetchOptions);
    const data = await notionRes.json();
    return res.status(notionRes.status).json(data);
  } catch (err) {
    return res.status(500).json({ error: 'Proxy error', message: err.message });
  }
}
