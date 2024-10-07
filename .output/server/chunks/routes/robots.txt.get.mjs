import { d as defineEventHandler, u as useRuntimeConfig, e as setHeader } from '../runtime.mjs';
import 'node:http';
import 'node:https';
import 'fs';
import 'path';
import 'vue';
import 'node:fs';
import 'node:url';
import 'ipx';

const robots_txt_get = defineEventHandler(async (event) => {
  var _a, _b, _c;
  useRuntimeConfig(event).apiBaseUrl;
  useRuntimeConfig(event).brandCode;
  const host = (_b = event.req.headers[":authority"]) != null ? _b : (_a = event.req.headers) == null ? void 0 : _a.host;
  const scheme = (_c = event.req.headers[":scheme"]) != null ? _c : "https://";
  const sitemap = [
    "User-agent: *\n",
    "Allow: /\n",
    "\n",
    `Sitemap: ${scheme}${host}/sitemap/sitemap_index.xml`
  ].join("");
  setHeader(event, "content-type", "text/plain");
  return sitemap;
});

export { robots_txt_get as default };
//# sourceMappingURL=robots.txt.get.mjs.map
