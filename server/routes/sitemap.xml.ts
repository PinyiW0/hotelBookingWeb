export default defineEventHandler((event) => {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
      <loc>https://two025hotelbookingweb.onrender.com</loc>
      <changefreq>daily</changefreq>
      <priority>1.0</priority>
    </url>
    <url>
      <loc>https://two025hotelbookingweb.onrender.com/login</loc>
      <changefreq>monthly</changefreq>
      <priority>0.5</priority>
    </url>
  </urlset>`

  setHeader(event, 'Content-Type', 'application/xml')
  return sitemap
})