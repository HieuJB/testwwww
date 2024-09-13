import { d as defineEventHandler, u as useRuntimeConfig } from '../../../../runtime.mjs';
import 'node:http';
import 'node:https';
import 'fs';
import 'path';
import 'vue';
import 'node:fs';
import 'node:url';
import 'ipx';

const slug = defineEventHandler(async (event) => {
  var _a;
  const baseAPI = useRuntimeConfig(event).apiBaseUrl;
  const brandCode = useRuntimeConfig(event).brandCode;
  const subApi = (_a = event.req.url) == null ? void 0 : _a.replace("/api", "");
  const data = await $fetch(baseAPI + subApi + "&brand_code=" + brandCode);
  return data;
});

export { slug as default };
//# sourceMappingURL=slug.mjs.map
