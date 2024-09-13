import { d as defineEventHandler, u as useRuntimeConfig, f as getRouterParam, e as setHeader } from '../../../runtime.mjs';
import 'node:http';
import 'node:https';
import 'fs';
import 'path';
import 'vue';
import 'node:fs';
import 'node:url';
import 'ipx';

const ____page__xml = defineEventHandler(async (event) => {
  var _a, _b, _c, _d;
  const baseAPI = useRuntimeConfig(event).apiBaseUrl;
  const brandCode = useRuntimeConfig(event).brandCode;
  const host = (_b = event.req.headers[":authority"]) != null ? _b : (_a = event.req.headers) == null ? void 0 : _a.host;
  const scheme = (_c = event.req.headers[":scheme"]) != null ? _c : "https://";
  const page = getRouterParam(event, "page.xml");
  const limit = 200;
  const resData = await $fetch(baseAPI + "/oapi/v1/posts?limit=" + limit + "&page=" + (page == null ? void 0 : page.replace(".xml", "")) + "&brand_code=" + brandCode);
  const chunks = [];
  (_d = resData == null ? void 0 : resData.posts) == null ? void 0 : _d.forEach((post) => {
    chunks.push([
      "<sitemap>",
      `<loc>${scheme}${host}/${post == null ? void 0 : post.slug}</loc>`,
      `<lastmod>${post == null ? void 0 : post.post_modified}</lastmod>`,
      "</sitemap>"
    ].join(""));
  });
  const sitemap = [
    '<?xml version="1.0" encoding="UTF-8"?><?xml-stylesheet type="text/xsl" href="/main-sitemap.xsl"?>',
    '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"> ',
    chunks.join(""),
    "</sitemapindex>"
  ].join("");
  setHeader(event, "content-type", "application/xml");
  return sitemap;
});

export { ____page__xml as default };
//# sourceMappingURL=_...page_.xml.mjs.map
