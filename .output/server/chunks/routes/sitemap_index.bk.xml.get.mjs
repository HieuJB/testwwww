import { d as defineEventHandler, u as useRuntimeConfig, e as setHeader } from '../runtime.mjs';
import moment from 'moment-timezone';
import 'node:http';
import 'node:https';
import 'fs';
import 'path';
import 'vue';
import 'node:fs';
import 'node:url';
import 'ipx';

const sitemap_index_bk_xml_get = defineEventHandler(async (event) => {
  var _a, _b, _c;
  const baseAPI = useRuntimeConfig(event).apiBaseUrl;
  const brandCode = useRuntimeConfig(event).brandCode;
  const limit = 200;
  const host = (_b = event.req.headers[":authority"]) != null ? _b : (_a = event.req.headers) == null ? void 0 : _a.host;
  const scheme = (_c = event.req.headers[":scheme"]) != null ? _c : "https://";
  const dashboardData = await $fetch(baseAPI + "/oapi/v1/dashboard?brand_code=" + brandCode);
  const postCountPage = Math.ceil((dashboardData == null ? void 0 : dashboardData.all_posts) / limit);
  const timestamp = (/* @__PURE__ */ new Date()).toISOString();
  const postSitemap = [];
  for (let page = 1; page <= postCountPage; page++) {
    postSitemap.push([
      "<sitemap>",
      `<loc>${scheme}${host}/sitemap/post/${page}.xml</loc>`,
      `<lastmod>${timestamp}</lastmod>`,
      "</sitemap>"
    ].join(""));
  }
  const categoriesCountPage = Math.ceil((dashboardData == null ? void 0 : dashboardData.all_categories) / limit);
  const categoriesSitemap = [];
  for (let page = 1; page <= categoriesCountPage; page++) {
    categoriesSitemap.push([
      "<sitemap>",
      `<loc>${scheme}${host}/sitemap/category/${page}.xml</loc>`,
      `<lastmod>${timestamp}</lastmod>`,
      "</sitemap>"
    ].join(""));
  }
  const leaguesSitemap = [];
  leaguesSitemap.push([
    "<sitemap>",
    `<loc>${scheme}${host}/sitemap/leagues.xml</loc>`,
    `<lastmod>${timestamp}</lastmod>`,
    "</sitemap>"
  ].join(""));
  const matchesSitemap = [];
  let start = /* @__PURE__ */ new Date("2023-07-01");
  const end = moment().add(7, "days");
  while (start <= end) {
    const displayMonth = start.getUTCMonth() + 1;
    matchesSitemap.push([
      "<sitemap>",
      `<loc>${scheme}${host}/sitemap/match/month/${start.getUTCFullYear()}-${displayMonth.toString().padStart(2, "0")}.xml</loc>`,
      `<lastmod>${start.toISOString()}</lastmod>`,
      "</sitemap>"
    ].join(""));
    start = new Date(start.setUTCMonth(displayMonth));
  }
  const sitemap = [
    // '<?xml version="1.0" encoding="UTF-8"?><?xml-stylesheet type="text/xsl" href="/main-sitemap.xsl"?>',
    '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"> ',
    postSitemap.join(""),
    categoriesSitemap.join(""),
    leaguesSitemap.join(""),
    matchesSitemap.join(""),
    "</sitemapindex>"
  ].join("");
  setHeader(event, "content-type", "application/xml");
  return sitemap;
});

export { sitemap_index_bk_xml_get as default };
//# sourceMappingURL=sitemap_index.bk.xml.get.mjs.map
