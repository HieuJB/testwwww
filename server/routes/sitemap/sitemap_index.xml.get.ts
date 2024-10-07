import moment from 'moment-timezone';
import {timeStamp2DateUTCTimeZone} from '@/utils/moment_helper'
import { createError, defineEventHandler } from "h3";

export default defineEventHandler(async (event) => {
  try {
    const baseAPI = useRuntimeConfig(event).apiBaseUrl
    const brandCode = useRuntimeConfig(event).brandCode
    const host  = event.req.headers[':authority'] ?? event.req.headers?.host
    const scheme = 'https://'
    
    const dashboardData = await $fetch(baseAPI + '/oapi/v1/dashboard-v2' + '?brand_code=' + brandCode)
    // Post
    const objectList = ['posts', 'categories', 'players', 'leagues', 'teams']
    //const date = moment().utcOffset('GMT+07:00').format('YYYY-MM-DDT00:00Z')
    let last_modified = ''
    let date = ''
    const objectSitemap = []
    let isRender = false
    objectList?.forEach(item => {
      isRender = false
      switch(item) {
        case 'posts': 
          if (dashboardData?.posts) {
            last_modified = new Date(Math.max(...dashboardData?.posts?.pages.map(e => new Date(e.last_modified))));
            date = moment(last_modified).utcOffset('GMT+07:00').format('YYYY-MM-DDTHH:mmZ')
            isRender = true
          }
          break; 
        case 'categories': 
          if (dashboardData?.categories) {
            last_modified = new Date(Math.max(...dashboardData?.categories?.pages.map(e => new Date(e.last_modified))));
            date = moment(last_modified).utcOffset('GMT+07:00').format('YYYY-MM-DDTHH:mmZ')
            isRender = true
          }
          break;
        case 'players': 
          // Format timestamp
          if (dashboardData?.players) {
            last_modified = Math.max(...dashboardData?.players?.pages.map(e => new Date(e.last_modified)));
            date = timeStamp2DateUTCTimeZone(last_modified, 'YYYY-MM-DDTHH:mmZ')
            isRender = true
          }
          break; 
        case 'leagues': 
          // Format timestamp
          if (dashboardData?.leagues) {
            last_modified = Math.max(...dashboardData.leagues?.pages.map(e => new Date(e.last_modified)));
            date = timeStamp2DateUTCTimeZone(last_modified, 'YYYY-MM-DDTHH:mmZ')
            isRender = true
          }
          break; 
        case 'teams': 
          // Format timestamp
          if (dashboardData?.teams) {
            last_modified = Math.max(...dashboardData?.teams?.pages.map(e => new Date(e.last_modified)));
            date = timeStamp2DateUTCTimeZone(last_modified, 'YYYY-MM-DDTHH:mmZ')
            isRender = true
          }
          break; 
        default:
          date = moment().utcOffset('GMT+07:00').format('YYYY-MM-DDT00:00Z')
          break; 
      }
      if (isRender) {
        objectSitemap.push([
          '<sitemap>',
          `<loc>${scheme}${host}/sitemap/sitemap-${item}.xml</loc>`,
          `<lastmod>${date}</lastmod>`,
          '</sitemap>'
        ].join(''))
      }
    })

    const sitemap = [
      // '<?xml version="1.0" encoding="UTF-8"?><?xml-stylesheet type="text/xsl" href="/main-sitemap.xsl"?>',
      '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
      objectSitemap.join(''),
      '</sitemapindex>',
    ].join('')


    setHeader(event, 'content-type', 'application/xml')
    return sitemap
  } catch (e) {
    throw createError({
      statusCode: 500,
    });
  }
})