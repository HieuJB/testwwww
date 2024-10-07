import {formatDateMoment} from '@/utils/moment_helper'
import moment from 'moment-timezone';

export default defineEventHandler(async (event) => {
  // perform async logic
  // const uriAPI = 'https://dummyjson.com/quotes?limit=10&skip=' +  1 * 100
  const baseAPI = useRuntimeConfig(event).apiBaseUrl
  const brandCode = useRuntimeConfig(event).brandCode
  const limit = 200

  const host  = event.req.headers[':authority'] ?? event.req.headers?.host
  const scheme = event.req.headers[':scheme'] ?? 'https://'
  
  const dashboardData = await $fetch(baseAPI + '/oapi/v1/dashboard' + '?brand_code=' + brandCode)

  // Post data
  //const postsData = await $fetch(baseAPI + '/posts?limit=1' + '&brand_code=' + brandCode)
  const postCountPage = Math.ceil(dashboardData?.all_posts / limit)
  const timestamp = new Date().toISOString()
  const postSitemap = []
  for (let page = 1; page <= postCountPage; page++) {
    postSitemap.push([
      '<sitemap>',
      `<loc>${scheme}${host}/sitemap/post/${page}.xml</loc>`,
      `<lastmod>${timestamp}</lastmod>`,
      '</sitemap>'
    ].join(''))
  }

  // Category
  //const categoriesData = await $fetch(baseAPI + '/categories?limit=1' + '&brand_code=' + brandCode)
  const categoriesCountPage = Math.ceil(dashboardData?.all_categories / limit)
  const categoriesSitemap = []
  for (let page = 1; page <= categoriesCountPage; page++) {
    categoriesSitemap.push([
      '<sitemap>',
      `<loc>${scheme}${host}/sitemap/category/${page}.xml</loc>`,
      `<lastmod>${timestamp}</lastmod>`,
      '</sitemap>'
    ].join(''))
  }

    // Leagues
  const leaguesSitemap = []
  leaguesSitemap.push([
    '<sitemap>',
    `<loc>${scheme}${host}/sitemap/leagues.xml</loc>`,
    `<lastmod>${timestamp}</lastmod>`,
    '</sitemap>'
  ].join(''))

  // Matches
  const matchesSitemap = []
  let start = new Date('2023-07-01'); // Ngày bắt đầu có data
  const end = moment().add(7, 'days'); // Lây thêm 7 ngày
  while (start <= end) {
    // compensate for zero-based months in display
    const displayMonth = start.getUTCMonth() + 1;
    matchesSitemap.push([
      '<sitemap>',
      `<loc>${scheme}${host}/sitemap/match/month/${start.getUTCFullYear()}-${(displayMonth).toString().padStart(2, '0')}.xml</loc>`,
      `<lastmod>${start.toISOString()}</lastmod>`,
      '</sitemap>'
    ].join(''))
    // progress the start date by one month
    start = new Date(start.setUTCMonth(displayMonth));
  }

  const sitemap = [
    // '<?xml version="1.0" encoding="UTF-8"?><?xml-stylesheet type="text/xsl" href="/main-sitemap.xsl"?>',
    '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"> ',
    postSitemap.join(''),
    categoriesSitemap.join(''),
    leaguesSitemap.join(''),
    matchesSitemap.join(''),
    '</sitemapindex>',
  ].join('')


  setHeader(event, 'content-type', 'application/xml')
  return sitemap
})