import { d as defineEventHandler, e as setHeader } from '../../runtime.mjs';
import moment from 'moment-timezone';
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
  const host = (_b = event.req.headers[":authority"]) != null ? _b : (_a = event.req.headers) == null ? void 0 : _a.host;
  const scheme = "https://";
  const objectList = ["posts", "categories", "players", "leagues", "teams"];
  const date = moment().utcOffset("GMT+07:00").format("YYYY-MM-DDT00:00Z");
  const objectSitemap = [];
  objectList == null ? void 0 : objectList.forEach((item) => {
    objectSitemap.push([
      "<sitemap>",
      `<loc>${scheme}${host}/sitemap/sitemap-${item}.xml</loc>`,
      `<lastmod>${date}</lastmod>`,
      "</sitemap>"
    ].join(""));
  });
  const sitemap = [
    // '<?xml version="1.0" encoding="UTF-8"?><?xml-stylesheet type="text/xsl" href="/main-sitemap.xsl"?>',
    '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    objectSitemap.join(""),
    "</sitemapindex>"
  ].join("");
  setHeader(event, "content-type", "application/xml");
  return sitemap;
});

export { sitemap_index_xml_get as default };
//# sourceMappingURL=sitemap_index.xml.get.mjs.map
