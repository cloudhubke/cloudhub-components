const { hot } = require("react-hot-loader/root")

// prefer default export if available
const preferDefault = m => m && m.default || m


exports.components = {
  "component---src-button-mdx": hot(preferDefault(require("/Users/bernardgaitho/repos/cloudhub-components/docs/src/button.mdx"))),
  "component---src-index-mdx": hot(preferDefault(require("/Users/bernardgaitho/repos/cloudhub-components/docs/src/index.mdx"))),
  "component---cache-dev-404-page-js": hot(preferDefault(require("/Users/bernardgaitho/repos/cloudhub-components/docs/.docz/.cache/dev-404-page.js"))),
  "component---src-pages-404-js": hot(preferDefault(require("/Users/bernardgaitho/repos/cloudhub-components/docs/.docz/src/pages/404.js")))
}

