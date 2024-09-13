import { a as getRequestURL } from '../runtime.mjs';
import { m as useRequestEvent } from './server.mjs';

function useRequestURL() {
  {
    return getRequestURL(useRequestEvent());
  }
}

export { useRequestURL as u };
//# sourceMappingURL=url-DZIKx68S.mjs.map
