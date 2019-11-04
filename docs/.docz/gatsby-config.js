const { mergeWith } = require('lodash/fp')

let custom
try {
  custom = require('./gatsby-config.custom')
} catch (err) {
  custom = {}
}

const config = {
  pathPrefix: '/',

  siteMetadata: {
    title: 'Docs',
    description: 'My awesome app using docz',
  },
  plugins: [
    {
      resolve: 'gatsby-theme-docz',
      options: {
        themeConfig: {},
        themesDir: 'src',
        docgenConfig: {},
        menu: [],
        mdPlugins: [],
        hastPlugins: [],
        ignore: [],
        typescript: false,
        ts: false,
        propsParser: true,
        'props-parser': true,
        debug: false,
        native: false,
        openBrowser: false,
        o: false,
        open: false,
        'open-browser': false,
        root: '/Users/bernardgaitho/repos/cloudhub-components/docs/.docz',
        base: '/',
        source: './',
        src: './',
        files: '**/*.{md,markdown,mdx}',
        public: '/public',
        dest: '.docz/dist',
        d: '.docz/dist',
        editBranch: 'master',
        eb: 'master',
        'edit-branch': 'master',
        config: '',
        title: 'Docs',
        description: 'My awesome app using docz',
        host: 'localhost',
        port: 3000,
        p: 3000,
        separator: '-',
        paths: {
          root: '/Users/bernardgaitho/repos/cloudhub-components/docs',
          templates:
            '/Users/bernardgaitho/repos/cloudhub-components/docs/node_modules/docz-core/dist/templates',
          docz: '/Users/bernardgaitho/repos/cloudhub-components/docs/.docz',
          cache:
            '/Users/bernardgaitho/repos/cloudhub-components/docs/.docz/.cache',
          app: '/Users/bernardgaitho/repos/cloudhub-components/docs/.docz/app',
          appPackageJson:
            '/Users/bernardgaitho/repos/cloudhub-components/docs/package.json',
          gatsbyConfig:
            '/Users/bernardgaitho/repos/cloudhub-components/docs/gatsby-config.js',
          gatsbyBrowser:
            '/Users/bernardgaitho/repos/cloudhub-components/docs/gatsby-browser.js',
          gatsbyNode:
            '/Users/bernardgaitho/repos/cloudhub-components/docs/gatsby-node.js',
          gatsbySSR:
            '/Users/bernardgaitho/repos/cloudhub-components/docs/gatsby-ssr.js',
          importsJs:
            '/Users/bernardgaitho/repos/cloudhub-components/docs/.docz/app/imports.js',
          rootJs:
            '/Users/bernardgaitho/repos/cloudhub-components/docs/.docz/app/root.jsx',
          indexJs:
            '/Users/bernardgaitho/repos/cloudhub-components/docs/.docz/app/index.jsx',
          indexHtml:
            '/Users/bernardgaitho/repos/cloudhub-components/docs/.docz/app/index.html',
          db:
            '/Users/bernardgaitho/repos/cloudhub-components/docs/.docz/app/db.json',
        },
      },
    },
  ],
}

const merge = mergeWith((objValue, srcValue) => {
  if (Array.isArray(objValue)) {
    return objValue.concat(srcValue)
  }
})

module.exports = merge(config, custom)
