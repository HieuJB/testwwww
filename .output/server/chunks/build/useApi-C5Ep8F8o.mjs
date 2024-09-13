import { a as useFetch } from './fetch-CC0zbYw2.mjs';
import { c as createUrl } from './createUrl-DyOxdY5I.mjs';
import { d as decodeDataAPI } from './livescore_helper-4bdWaxk-.mjs';

const useApiLiveScore = async (url = "", paras, isEncode = true) => {
  var _a, _b;
  if (isEncode) {
    try {
      const { data, pending, error, refresh, status } = await useFetch(url + (paras ? "?" + new URLSearchParams(paras) : ""), "$UqgiltlUfE");
      return await decodeDataAPI((_a = data == null ? void 0 : data.value) == null ? void 0 : _a[0], (_b = data == null ? void 0 : data.value) == null ? void 0 : _b[1]);
    } catch (e) {
      return null;
    }
  } else {
    try {
      const { data, pending, error, refresh } = await useFetch(createUrl(url, paras), "$HgqqyPIEgZ");
      return { data };
    } catch (e) {
      return null;
    }
  }
};

export { useApiLiveScore as u };
//# sourceMappingURL=useApi-C5Ep8F8o.mjs.map
