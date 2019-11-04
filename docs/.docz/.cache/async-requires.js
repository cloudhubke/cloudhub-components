// prefer default export if available
const preferDefault = m => m && m.default || m

exports.components = {
  "component---src-button-mdx": () => import("../../src/button.mdx" /* webpackChunkName: "component---src-button-mdx" */),
  "component---src-index-mdx": () => import("../../src/index.mdx" /* webpackChunkName: "component---src-index-mdx" */),
  "component---cache-dev-404-page-js": () => import("dev-404-page.js" /* webpackChunkName: "component---cache-dev-404-page-js" */),
  "component---src-pages-404-js": () => import("../src/pages/404.js" /* webpackChunkName: "component---src-pages-404-js" */)
}

