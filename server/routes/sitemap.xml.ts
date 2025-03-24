export default defineEventHandler(async (event) => {
  const baseUrl = 'https://two025hotelbookingweb.onrender.com'
  const apiUrl = 'https://freyjaapi-jjpo.onrender.com/api/v1/rooms/'

  let rooms: any[] = [];
  try {
    const res = await $fetch(apiUrl) as any;
    rooms = res.result || [];
  } catch (error) {
    console.error('無法取得房型資料:', error);
  }
  // 動態房型 sitemap 區塊
  const roomUrls = rooms.map(room => `
    <url>
      <loc>${baseUrl}/rooms/${room._id}/${encodeURIComponent(room.name)}</loc>
      <lastmod>${new Date(room.updatedAt).toISOString()}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>0.8</priority>
      <image:image>
        <image:loc>${room.imageUrl}</image:loc>
        <image:caption>${room.description}</image:caption>
        <image:title>${room.name}</image:title>
      </image:image>
    </url>
  `).join('')

  // 靜態頁面 sitemap 區塊
  const staticUrls = [
    '',
    '/rooms'
  ].map(path => `
    <url>
      <loc>${baseUrl}${path}</loc>
      <changefreq>monthly</changefreq>
      <priority>0.5</priority>
    </url>
  `).join('');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset
    xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
    xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
  >
    ${staticUrls}
    ${roomUrls}
  </urlset>`

  setHeader(event, 'Content-Type', 'application/xml')
  return sitemap
})