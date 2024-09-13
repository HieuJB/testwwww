import { d as defineEventHandler, u as useRuntimeConfig, f as getRouterParam, e as setHeader } from '../../../../runtime.mjs';
import { A as API_ROUTERS, d as decodeDataAPI } from '../../../../_/livescore_helper.mjs';
import moment from 'moment-timezone';
import { f as formatDateMomentUTCTimeZone } from '../../../../_/moment_helper.mjs';
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

const ____paras__xml = defineEventHandler(async (event) => {
  var _a, _b, _c;
  useRuntimeConfig(event).apiBaseUrl;
  useRuntimeConfig(event).brandCode;
  const host = (_b = event.req.headers[":authority"]) != null ? _b : (_a = event.req.headers) == null ? void 0 : _a.host;
  const scheme = (_c = event.req.headers[":scheme"]) != null ? _c : "https://";
  let monthAndYear = getRouterParam(event, "paras.xml");
  const chunks = [];
  if (monthAndYear) {
    monthAndYear = monthAndYear == null ? void 0 : monthAndYear.replace(".xml", "");
    const apiLivescore = useRuntimeConfig(event).apiLivescore;
    let paras = {
      date: monthAndYear,
      tz: moment().tz(Intl.DateTimeFormat().resolvedOptions().timeZone).format("Z")
    };
    const url = apiLivescore + API_ROUTERS.LIVESCORE.MATCHS_RECENT + "?" + new URLSearchParams(paras);
    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        if ((data == null ? void 0 : data.result) !== null) {
          try {
            const keyEncode = await fetchData();
            let resultData = await decodeDataAPI(data == null ? void 0 : data.result, keyEncode);
            if (resultData) {
              resultData == null ? void 0 : resultData.map((match) => {
                chunks.push([
                  "<sitemap>",
                  `<loc>${scheme}${host}/match/${match == null ? void 0 : match.id}</loc>`,
                  `<lastmod>${formatDateMomentUTCTimeZone(match == null ? void 0 : match.match_time, "yyyy-MM-DD HH:mm")}</lastmod>`,
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

export { ____paras__xml as default };
//# sourceMappingURL=_...paras_.xml.mjs.map
