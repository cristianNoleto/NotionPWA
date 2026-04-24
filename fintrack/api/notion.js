export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Notion-Version');

  if (req.method === 'OPTIONS') return res.status(200).end();

  const path = req.query.path || '';
  const notionUrl = `https://api.notion.com/v1${path}`;

  const response = await fetch(notionUrl, {
    method: req.method,
    headers: {
      'Authorization': `Bearer ${process.env.NOTION_TOKEN}`,
      'Notion-Version': '2022-06-28',
      'Content-Type': 'application/json',
    },
    body: ['POST', 'PATCH'].includes(req.method) ? JSON.stringify(req.body) : undefined,
  });

  const data = await response.json();
  return res.status(response.status).json(data);
}