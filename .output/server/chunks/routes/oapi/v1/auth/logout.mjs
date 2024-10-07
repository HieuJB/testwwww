import { d as defineEventHandler, u as useRuntimeConfig, b as getHeader } from '../../../../runtime.mjs';
import 'node:http';
import 'node:https';
import 'fs';
import 'path';
import 'vue';
import 'node:fs';
import 'node:url';
import 'ipx';

const logout = defineEventHandler(async (event) => {
  const baseAPI = useRuntimeConfig(event).apiBaseUrl;
  useRuntimeConfig(event).brandCode;
  const accessToken = getHeader(event, "Authorization");
  const headers = {
    Authorization: `Bearer ${accessToken}`
  };
  const data = await $fetch(baseAPI + event._path, {
    method: "POST",
    headers
  });
  return data;
});

export { logout as default };
//# sourceMappingURL=logout.mjs.map
