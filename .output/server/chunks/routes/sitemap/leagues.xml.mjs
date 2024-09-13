import { d as defineEventHandler, u as useRuntimeConfig, e as setHeader } from '../../runtime.mjs';
import { d as decodeDataAPI, A as API_ROUTERS } from '../../_/livescore_helper.mjs';
import 'node:http';
import 'node:https';
import 'fs';
import 'path';
import 'vue';
import 'node:fs';
import 'node:url';
import 'ipx';
import 'crypto-js';
import 'pako';
import 'buffer';

const leagues_xml = defineEventHandler(async (event) => {
  var _a, _b, _c;
  useRuntimeConfig(event).apiBaseUrl;
  useRuntimeConfig(event).brandCode;
  const host = (_b = event.req.headers[":authority"]) != null ? _b : (_a = event.req.headers) == null ? void 0 : _a.host;
  const scheme = (_c = event.req.headers[":scheme"]) != null ? _c : "https://";
  const chunks = [];
  const apiLivescore = useRuntimeConfig(event).apiLivescore;
  const url = apiLivescore + API_ROUTERS.LIVESCORE.COMP_LIST;
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      if ((data == null ? void 0 : data.result) !== null) {
        try {
          const keyEncode = await fetchData();
          const resultData = await decodeDataAPI(data == null ? void 0 : data.result, keyEncode);
          if (resultData) {
            resultData == null ? void 0 : resultData.map((item) => {
              chunks.push([
                "<sitemap>",
                `<loc>${scheme}${host}/league/${item == null ? void 0 : item.id}</loc>`,
                "</sitemap>"
              ].join(""));
            });
          }
        } catch (error) {
          console.log("decodeDataAPI", error);
        }
      }
    }
  } catch (e) {
    console.log("fetch", e);
  }
  const sitemap = [
    '<?xml version="1.0" encoding="UTF-8"?><?xml-stylesheet type="text/xsl" href="/main-sitemap.xsl"?>',
    '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    chunks.join(""),
    "</sitemapindex>"
  ].join("");
  setHeader(event, "content-type", "application/xml");
  return sitemap;
});
const fetchData = async () => {
  const url = "https://stats.ultraffic.info/js/script.js?ver=1.0.1";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      return null;
    }
    const scriptContent = await response.text();
    return parseVariable(scriptContent, "dec_spdb");
  } catch (error) {
    return null;
  }
};
const parseVariable = (scriptContent, variableName) => {
  const regex = new RegExp(`${variableName}\\s*=\\s*['"]([^'"]*)['"]`);
  const match = scriptContent.match(regex);
  return match ? match[1] : null;
};

export { leagues_xml as default };
//# sourceMappingURL=leagues.xml.mjs.map
