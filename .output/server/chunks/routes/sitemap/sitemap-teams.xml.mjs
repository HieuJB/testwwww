import { d as defineEventHandler, u as useRuntimeConfig, e as setHeader } from '../../runtime.mjs';
import moment from 'moment-timezone';
import 'node:http';
import 'node:https';
import 'fs';
import 'path';
import 'vue';
import 'node:fs';
import 'node:url';
import 'ipx';

const sitemapTeams_xml = defineEventHandler(async (event) => {
  var _a, _b;
  const sitemapObject = [];
  try {
    const baseAPI = useRuntimeConfig(event).apiBaseUrl;
    const brandCode = useRuntimeConfig(event).brandCode;
    const host = (_b = event.req.headers[":authority"]) != null ? _b : (_a = event.req.headers) == null ? void 0 : _a.host;
    const scheme = "https://";
    const dashboardData = await $fetch(baseAPI + "/oapi/v1/dashboard?brand_code=" + brandCode);
    const limit = 1e3;
    const countPage = Math.ceil((dashboardData == null ? void 0 : dashboardData.all_teams) / limit);
    const date = moment().utcOffset("GMT+07:00").format("YYYY-MM-DDT00:00Z");
    for (let page = 1; page <= countPage; page++) {
      sitemapObject.push([
        "<sitemap>",
        `<loc>${scheme}${host}/sitemap/sitemap_team-${page}.xml</loc>`,
        `<lastmod>${date}</lastmod>`,
        "</sitemap>"
      ].join(""));
    }
  } catch (e) {
  } finally {
    const sitemap = [
      // '<?xml version="1.0" encoding="UTF-8"?><?xml-stylesheet type="text/xsl" href="/main-sitemap.xsl"?>',
      '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"> ',
      sitemapObject.join(""),
      "</sitemapindex>"
    ].join("");
    setHeader(event, "content-type", "application/xml");
    return sitemap;
  }
});

export { sitemapTeams_xml as default };
//# sourceMappingURL=sitemap-teams.xml.mjs.map
