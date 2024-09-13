import { c as defineCachedEventHandler, u as useRuntimeConfig } from '../../../../runtime.mjs';
import 'node:http';
import 'node:https';
import 'fs';
import 'path';
import 'vue';
import 'node:fs';
import 'node:url';
import 'ipx';

const ____paras_ = defineCachedEventHandler(async (event) => {
  var _a;
  const baseAPI = useRuntimeConfig(event).apiBaseUrl;
  useRuntimeConfig(event).brandCode;
  const subApi = (_a = event.req.url) == null ? void 0 : _a.replace("/api", "");
  const data = await $fetch(baseAPI + subApi);
  return data;
});

export { ____paras_ as default };
//# sourceMappingURL=_...paras_.mjs.map
