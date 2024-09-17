import { createError } from 'h3';
import { withLeadingSlash, withoutTrailingSlash, parseURL } from 'ufo';
import { promises } from 'fs';
import { resolve, dirname } from 'pathe';
import { fileURLToPath } from 'url';

const assets = {
  "/logo_x120.png": {
    "type": "image/png",
    "etag": "\"1a78-SWMFxHEaYFyWLZUwxPmU/V208rk\"",
    "mtime": "2024-09-17T16:38:12.540Z",
    "path": "../public/logo_x120.png"
  },
  "/logo_x128.png": {
    "type": "image/png",
    "etag": "\"1468-djN4JfJhEec8wD4gc4YaUZVdyf8\"",
    "mtime": "2024-09-17T16:38:12.539Z",
    "path": "../public/logo_x128.png"
  },
  "/logo_x180.png": {
    "type": "image/png",
    "etag": "\"29d6-6+THnK+5wUX5Q2SBzM+86UcMH1Y\"",
    "mtime": "2024-09-17T16:38:12.538Z",
    "path": "../public/logo_x180.png"
  },
  "/logo_x192.png": {
    "type": "image/png",
    "etag": "\"1ff2-rxxizfUXc1SiA9JyqY0Bysluvcg\"",
    "mtime": "2024-09-17T16:38:12.537Z",
    "path": "../public/logo_x192.png"
  },
  "/logo_x32.png": {
    "type": "image/png",
    "etag": "\"64c-drF9ykuxbc9Qw1/yXo8ueLiRtx0\"",
    "mtime": "2024-09-17T16:38:12.535Z",
    "path": "../public/logo_x32.png"
  },
  "/logo_x384.png": {
    "type": "image/png",
    "etag": "\"4d60-fG5KxzhgFtuP4BF2hEZNWvqBSCM\"",
    "mtime": "2024-09-17T16:38:12.533Z",
    "path": "../public/logo_x384.png"
  },
  "/logo_x48.png": {
    "type": "image/png",
    "etag": "\"609-0C7jxSvABDTZBDOuxtWvggfWRuU\"",
    "mtime": "2024-09-17T16:38:12.531Z",
    "path": "../public/logo_x48.png"
  },
  "/logo_x512.png": {
    "type": "image/png",
    "etag": "\"7145-iTeNjqDWjGV92BSndvg3dnJ48vw\"",
    "mtime": "2024-09-17T16:38:12.530Z",
    "path": "../public/logo_x512.png"
  },
  "/logo_x72.png": {
    "type": "image/png",
    "etag": "\"9c8-16pBDOm0idxWIxISpD6rtDVddw4\"",
    "mtime": "2024-09-17T16:38:12.529Z",
    "path": "../public/logo_x72.png"
  },
  "/logo_x96.png": {
    "type": "image/png",
    "etag": "\"df7-F3LnF4SI+0YCZv1FMaHJ3/V37lk\"",
    "mtime": "2024-09-17T16:38:12.528Z",
    "path": "../public/logo_x96.png"
  },
  "/manifest.json": {
    "type": "application/json",
    "etag": "\"613-3f2lY1syOGJL8z2l1CLiCo1j2VM\"",
    "mtime": "2024-09-17T16:38:12.528Z",
    "path": "../public/manifest.json"
  },
  "/pwa.jpg": {
    "type": "image/jpeg",
    "etag": "\"1e735-gd8pI307wW+rNCUWQGiEsh7NV/4\"",
    "mtime": "2024-09-17T16:38:12.527Z",
    "path": "../public/pwa.jpg"
  },
  "/sw.js": {
    "type": "application/javascript",
    "etag": "\"594-9goRrvQot7Dh2XShFTjLyjJLMXQ\"",
    "mtime": "2024-09-17T16:38:12.527Z",
    "path": "../public/sw.js"
  },
  "/_nuxt/entry-622c93f1.mjs": {
    "type": "application/javascript",
    "etag": "\"12429-jbZUtAhryqTzZKieqsZWBWn0sMM\"",
    "mtime": "2024-09-17T16:38:12.545Z",
    "path": "../public/_nuxt/entry-622c93f1.mjs"
  },
  "/_nuxt/assets/entry.0f3dfac9.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"3a-9IQS4Jzy2d7RAmP4lw49xhB96I4\"",
    "mtime": "2024-09-17T16:38:12.547Z",
    "path": "../public/_nuxt/assets/entry.0f3dfac9.css"
  }
};

const mainDir = dirname(fileURLToPath(globalThis.entryURL));

function readAsset (id) {
  return promises.readFile(resolve(mainDir, getAsset(id).path))
}

function getAsset (id) {
  return assets[id]
}

const METHODS = ["HEAD", "GET"];
const PUBLIC_PATH = "/_nuxt/";
const TWO_DAYS = 2 * 60 * 60 * 24;
const STATIC_ASSETS_BASE = "/home/jusin/Desktop/test/nuxt3-pwa/dist" + "/" + "1726591091";
async function serveStatic(req, res) {
  if (!METHODS.includes(req.method)) {
    return;
  }
  let id = withLeadingSlash(withoutTrailingSlash(parseURL(req.url).pathname));
  let asset = getAsset(id);
  if (!asset) {
    const _id = id + "/index.html";
    const _asset = getAsset(_id);
    if (_asset) {
      asset = _asset;
      id = _id;
    }
  }
  if (!asset) {
    if (id.startsWith(PUBLIC_PATH) && !id.startsWith(STATIC_ASSETS_BASE)) {
      throw createError({
        statusMessage: "Cannot find static asset " + id,
        statusCode: 404
      });
    }
    return;
  }
  const ifNotMatch = req.headers["if-none-match"] === asset.etag;
  if (ifNotMatch) {
    res.statusCode = 304;
    return res.end("Not Modified (etag)");
  }
  const ifModifiedSinceH = req.headers["if-modified-since"];
  if (ifModifiedSinceH && asset.mtime) {
    if (new Date(ifModifiedSinceH) >= new Date(asset.mtime)) {
      res.statusCode = 304;
      return res.end("Not Modified (mtime)");
    }
  }
  if (asset.type) {
    res.setHeader("Content-Type", asset.type);
  }
  if (asset.etag) {
    res.setHeader("ETag", asset.etag);
  }
  if (asset.mtime) {
    res.setHeader("Last-Modified", asset.mtime);
  }
  if (id.startsWith(PUBLIC_PATH)) {
    res.setHeader("Cache-Control", `max-age=${TWO_DAYS}, immutable`);
  }
  const contents = await readAsset(id);
  return res.end(contents);
}

export { serveStatic as default };
