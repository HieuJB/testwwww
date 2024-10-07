import moment from 'moment-timezone';
import { createError, defineEventHandler } from "h3";

export default defineEventHandler(async (event) => {
  const sitemapObject = []
  try {
    const baseAPI = useRuntimeConfig(event).apiBaseUrl
    const brandCode = useRuntimeConfig(event).brandCode
  
    const host  = event.req.headers[':authority'] ?? event.req.headers?.host
    const scheme = 'https://'
    const dashboardData = await $fetch(baseAPI + '/oapi/v1/dashboard-v2' + '?brand_code=' + brandCode)
    
    if (dashboardData?.posts) {
      dashboardData?.posts?.pages?.map(item => {
        sitemapObject.push([
          '<sitemap>',
          `<loc>${scheme}${host}/sitemap/sitemap_post-${item?.page}.xml</loc>`,
          `<lastmod>${moment(item?.last_modified).utcOffset('GMT+07:00').format('YYYY-MM-DDTHH:mmZ')}</lastmod>`,
          '</sitemap>'
        ].join(''))
      })
      const sitemap = [
        // '<?xml version="1.0" encoding="UTF-8"?><?xml-stylesheet type="text/xsl" href="/main-sitemap.xsl"?>',
        '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"> ',
        sitemapObject.join(''),
        '</sitemapindex>',
      ].join('')
    
      setHeader(event, 'content-type', 'application/xml')
      return sitemap
    } else {
      throw createError({
        statusCode: 404,
        message: "Page not found",
        statusMessage: "Page not found",
        data: ['error']
      });
    }
  } catch (e) {
    throw createError({
      statusCode: 404,
      message: "Page not found",
      statusMessage: "Page not found",
      data: ['error']
    });
  }
})