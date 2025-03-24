export default defineEventHandler(() => {
  return `
User-agent: *
Disallow: /login
Disallow: /register
Disallow: /forget
Disallow: /member
Sitemap: https://two025hotelbookingweb.onrender.com/sitemap.xml
`.trim()
})