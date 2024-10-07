import {timeStamp2DateUTCTimeZone} from '@/utils/moment_helper'
import moment from 'moment-timezone';
import { createError, defineEventHandler } from "h3";

export default defineEventHandler(async (event) => {
  const sitemapObject = []
  try {
    const baseAPI = useRuntimeConfig(event).apiBaseUrl
    const brandCode = useRuntimeConfig(event).brandCode
    const host  = event.req.headers[':authority'] ?? event.req.headers?.host
    const scheme = 'https://'
    let limit = 1000 // Cần chú ý mapping với server đang limit 1000
    const params = event?.context?.params?.xml
  
    const objectType = params?.split('-')?.[0]
    const page = params?.split('-')?.[1]?.split('.')?.[0]
    const ext = params?.split('.')?.[1]
    if (!ext || ext !== 'xml') {
      throw createError({
        statusCode: 404,
        message: "Page not found",
        statusMessage: "Page not found",
        data: ['error']
      });
    }

    let isExits = false
    switch(objectType) {
      case 'sitemap_post': {
        // sitemap_post
        const resData = await $fetch(baseAPI + '/oapi/v1/posts?limit=' + limit + '&page=' + page +   '&brand_code=' + brandCode)
        if (resData?.posts) {
          resData?.posts?.forEach(post => {
            sitemapObject.push([
              '<url>',
              `<loc>${scheme}${host}/${post?.slug}</loc>`,
              `<lastmod>${moment(post?.post_modified).utcOffset('GMT+07:00').format('YYYY-MM-DDTHH:mmZ')}</lastmod>`,
              `<priority>0.8</priority>`,
              '</url>'
            ].join(''))
          }); 
          isExits = true
        }
        break; 
      }
  
      case 'sitemap_category': {
        // sitemap_category
        const date = moment().utcOffset('GMT+07:00').format('YYYY-MM-DDTHH:mmZ')
        const resData = await $fetch(baseAPI + '/oapi/v1/categories?limit=' + limit + '&page=' + page +   '&brand_code=' + brandCode)
        if (resData?.post_categories) {
          resData?.post_categories?.forEach(category => {
            sitemapObject.push([
              '<url>',
              `<loc>${scheme}${host}/${category?.slug}</loc>`,
              `<lastmod>${date}</lastmod>`,
              `<priority>0.8</priority>`,
              '</url>'
            ].join(''))
          });
          isExits = true
        }
        break; 
      }
  
      case 'sitemap_player': {
        // sitemap_player
        const resData = await $fetch(baseAPI + '/oapi/v1/players?limit=' + limit + '&page=' + page +   '&brand_code=' + brandCode)
        if (resData?.players) {
          resData?.players?.forEach(player => {
            sitemapObject.push([
              '<url>',
              `<loc>${scheme}${host}/player/${player?.id}</loc>`,
              `<lastmod>${timeStamp2DateUTCTimeZone(player?.last_updated, 'YYYY-MM-DDTHH:mmZ')}</lastmod>`,
              `<priority>0.8</priority>`,
              '</url>'
            ].join(''))
          });
          isExits = true
        }
        break; 
      }
  
      case 'sitemap_league': {
        // sitemap_league
        const resData = await $fetch(baseAPI + '/oapi/v1/leagues?limit=' + limit + '&page=' + page +   '&brand_code=' + brandCode)
        if (resData?.leagues) {
          resData?.leagues?.forEach(league => {
            sitemapObject.push([
              '<url>',
              `<loc>${scheme}${host}/league/${league?.id}</loc>`,
              `<lastmod>${timeStamp2DateUTCTimeZone(league?.last_updated, 'YYYY-MM-DDTHH:mmZ')}</lastmod>`,
              `<priority>0.8</priority>`,
              '</url>'
            ].join(''))
          });
          isExits = true
        }
        break; 
      }

      case 'sitemap_team': {
        // sitemap_team
        const resData = await $fetch(baseAPI + '/oapi/v1/teams?limit=' + limit + '&page=' + page +   '&brand_code=' + brandCode)
        if (resData?.teams) {
          resData?.teams?.forEach(team => {
            sitemapObject.push([
              '<url>',
              `<loc>${scheme}${host}/team/${team?.id}</loc>`,
              `<lastmod>${timeStamp2DateUTCTimeZone(team?.last_updated, 'YYYY-MM-DDTHH:mmZ')}</lastmod>`,
              `<priority>0.8</priority>`,
              '</url>'
            ].join(''))
          }); 
          isExits = true
        }
        break; 
      }
      
      default:
        break; 
    }

    if (isExits) {
      const sitemap = [
        // '<?xml version="1.0" encoding="UTF-8"?><?xml-stylesheet type="text/xsl" href="/main-sitemap.xsl"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"> ',
        sitemapObject.join(''),
        '</urlset>',
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