import { d as defineEventHandler, u as useRuntimeConfig, e as setHeader, f as createError } from '../../runtime.mjs';
import moment from 'moment-timezone';
import { t as timeStamp2DateUTCTimeZone } from '../../_/moment_helper.mjs';
import 'node:http';
import 'node:https';
import 'fs';
import 'path';
import 'vue';
import 'node:fs';
import 'node:url';
import 'ipx';

const sitemap_index_xml_get = defineEventHandler(async (event) => {
  var _a, _b;
  try {
    const baseAPI = useRuntimeConfig(event).apiBaseUrl;
    const brandCode = useRuntimeConfig(event).brandCode;
    const host = (_b = event.req.headers[":authority"]) != null ? _b : (_a = event.req.headers) == null ? void 0 : _a.host;
    const scheme = "https://";
    const dashboardData = await $fetch(baseAPI + "/oapi/v1/dashboard-v2?brand_code=" + brandCode);
    const objectList = ["posts", "categories", "players", "leagues", "teams"];
    let last_modified = "";
    let date = "";
    const objectSitemap = [];
    let isRender = false;
    objectList == null ? void 0 : objectList.forEach((item) => {
      var _a2, _b2, _c, _d, _e;
      isRender = false;
      switch (item) {
        case "posts":
          if (dashboardData == null ? void 0 : dashboardData.posts) {
            last_modified = new Date(Math.max(...(_a2 = dashboardData == null ? void 0 : dashboardData.posts) == null ? void 0 : _a2.pages.map((e) => new Date(e.last_modified))));
            date = moment(last_modified).utcOffset("GMT+07:00").format("YYYY-MM-DDTHH:mmZ");
            isRender = true;
          }
          break;
        case "categories":
          if (dashboardData == null ? void 0 : dashboardData.categories) {
            last_modified = new Date(Math.max(...(_b2 = dashboardData == null ? void 0 : dashboardData.categories) == null ? void 0 : _b2.pages.map((e) => new Date(e.last_modified))));
            date = moment(last_modified).utcOffset("GMT+07:00").format("YYYY-MM-DDTHH:mmZ");
            isRender = true;
          }
          break;
        case "players":
          if (dashboardData == null ? void 0 : dashboardData.players) {
            last_modified = Math.max(...(_c = dashboardData == null ? void 0 : dashboardData.players) == null ? void 0 : _c.pages.map((e) => new Date(e.last_modified)));
            date = timeStamp2DateUTCTimeZone(last_modified, "YYYY-MM-DDTHH:mmZ");
            isRender = true;
          }
          break;
        case "leagues":
          if (dashboardData == null ? void 0 : dashboardData.leagues) {
            last_modified = Math.max(...(_d = dashboardData.leagues) == null ? void 0 : _d.pages.map((e) => new Date(e.last_modified)));
            date = timeStamp2DateUTCTimeZone(last_modified, "YYYY-MM-DDTHH:mmZ");
            isRender = true;
          }
          break;
        case "teams":
          if (dashboardData == null ? void 0 : dashboardData.teams) {
            last_modified = Math.max(...(_e = dashboardData == null ? void 0 : dashboardData.teams) == null ? void 0 : _e.pages.map((e) => new Date(e.last_modified)));
            date = timeStamp2DateUTCTimeZone(last_modified, "YYYY-MM-DDTHH:mmZ");
            isRender = true;
          }
          break;
        default:
          date = moment().utcOffset("GMT+07:00").format("YYYY-MM-DDT00:00Z");
          break;
      }
      if (isRender) {
        objectSitemap.push([
          "<sitemap>",
          `<loc>${scheme}${host}/sitemap/sitemap-${item}.xml</loc>`,
          `<lastmod>${date}</lastmod>`,
          "</sitemap>"
        ].join(""));
      }
    });
    const sitemap = [
      // '<?xml version="1.0" encoding="UTF-8"?><?xml-stylesheet type="text/xsl" href="/main-sitemap.xsl"?>',
      '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
      objectSitemap.join(""),
      "</sitemapindex>"
    ].join("");
    setHeader(event, "content-type", "application/xml");
    return sitemap;
  } catch (e) {
    throw createError({
      statusCode: 500
    });
  }
});

export { sitemap_index_xml_get as default };
//# sourceMappingURL=sitemap_index.xml.get.mjs.map
