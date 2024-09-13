import { d as defineEventHandler, u as useRuntimeConfig } from '../../../runtime.mjs';
import 'node:http';
import 'node:https';
import 'fs';
import 'path';
import 'vue';
import 'node:fs';
import 'node:url';
import 'ipx';

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
const _____ = defineEventHandler(async (event) => {
  const apiLivescore = useRuntimeConfig(event).apiLivescore;
  const url = apiLivescore + event._path;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      return null;
    }
    const data = await response.json();
    if ((data == null ? void 0 : data.result) !== null) {
      try {
        const keyEncode = await fetchData();
        return [data == null ? void 0 : data.result, keyEncode];
      } catch (error) {
        return null;
      }
      return null;
    } else {
      return null;
    }
  } catch (e) {
    return null;
  }
});

export { _____ as default };
//# sourceMappingURL=_..._.mjs.map
