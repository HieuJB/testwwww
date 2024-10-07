import { d as defineEventHandler, u as useRuntimeConfig, e as setHeader, f as createError } from '../../runtime.mjs';
import { t as timeStamp2DateUTCTimeZone } from '../../_/moment_helper.mjs';
import 'node:http';
import 'node:https';
import 'fs';
import 'path';
import 'vue';
import 'node:fs';
import 'node:url';
import 'ipx';
import 'moment-timezone';

const sitemapPlayers_xml = defineEventHandler(async (event) => {
  var _a, _b, _c, _d;
  const sitemapObject = [];
  try {
    const baseAPI = useRuntimeConfig(event).apiBaseUrl;
    const brandCode = useRuntimeConfig(event).brandCode;
    const host = (_b = event.req.headers[":authority"]) != null ? _b : (_a = event.req.headers) == null ? void 0 : _a.host;
    const scheme = "https://";
    const dashboardData = await $fetch(baseAPI + "/oapi/v1/dashboard-v2?brand_code=" + brandCode);
    if (dashboardData == null ? void 0 : dashboardData.players) {
      (_d = (_c = dashboardData == null ? void 0 : dashboardData.players) == null ? void 0 : _c.pages) == null ? void 0 : _d.map((item) => {
        sitemapObject.push([
          "<sitemap>",
          `<loc>${scheme}${host}/sitemap/sitemap_player-${item == null ? void 0 : item.page}.xml</loc>`,
          `<lastmod>${timeStamp2DateUTCTimeZone(item == null ? void 0 : item.last_modified, "YYYY-MM-DDTHH:mmZ")}</lastmod>`,
          "</sitemap>"
        ].join(""));
      });
      const sitemap = [
        // '<?xml version="1.0" encoding="UTF-8"?><?xml-stylesheet type="text/xsl" href="/main-sitemap.xsl"?>',
        '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"> ',
        sitemapObject.join(""),
        "</sitemapindex>"
      ].join("");
      setHeader(event, "content-type", "application/xml");
      return sitemap;
    } else {
      throw createError({
        statusCode: 404,
        message: "Page not found",
        statusMessage: "Page not found",
        data: ["error"]
      });
    }
  } catch (e) {
    throw createError({
      statusCode: 404,
      message: "Page not found",
      statusMessage: "Page not found",
      data: ["error"]
    });
  }
});

export { sitemapPlayers_xml as default };
//# sourceMappingURL=sitemap-players.xml.mjs.map