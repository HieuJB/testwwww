export default defineEventHandler(async (event) => {
  const baseAPI = useRuntimeConfig(event).apiBaseUrl
  const brandCode = useRuntimeConfig(event).brandCode

  const host  = event.req.headers[':authority'] ?? event.req.headers?.host
  const scheme = event.req.headers[':scheme'] ?? 'https://'

  const sitemap = [
    'User-agent: *\n',
    'Allow: /\n',
    '\n',
    `Sitemap: ${scheme}${host}/sitemap/sitemap_index.xml`
  ].join('')


  setHeader(event, 'content-type', 'text/plain')
  return sitemap
})