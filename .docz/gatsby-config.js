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
    title: 'Cloudhub Components',
    description: 'Various components to use in react projects',
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
        root: '/Users/bernardgaitho/repos/cloudhub-components/.docz',
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
        title: 'Cloudhub Components',
        description: 'Various components to use in react projects',
        host: 'localhost',
        port: 3000,
        p: 3000,
        separator: '-',
        paths: {
          root: '/Users/bernardgaitho/repos/cloudhub-components',
          templates:
            '/Users/bernardgaitho/repos/cloudhub-components/node_modules/docz-core/dist/templates',
          docz: '/Users/bernardgaitho/repos/cloudhub-components/.docz',
          cache: '/Users/bernardgaitho/repos/cloudhub-components/.docz/.cache',
          app: '/Users/bernardgaitho/repos/cloudhub-components/.docz/app',
          appPackageJson:
            '/Users/bernardgaitho/repos/cloudhub-components/package.json',
          gatsbyConfig:
            '/Users/bernardgaitho/repos/cloudhub-components/gatsby-config.js',
          gatsbyBrowser:
            '/Users/bernardgaitho/repos/cloudhub-components/gatsby-browser.js',
          gatsbyNode:
            '/Users/bernardgaitho/repos/cloudhub-components/gatsby-node.js',
          gatsbySSR:
            '/Users/bernardgaitho/repos/cloudhub-components/gatsby-ssr.js',
          importsJs:
            '/Users/bernardgaitho/repos/cloudhub-components/.docz/app/imports.js',
          rootJs:
            '/Users/bernardgaitho/repos/cloudhub-components/.docz/app/root.jsx',
          indexJs:
            '/Users/bernardgaitho/repos/cloudhub-components/.docz/app/index.jsx',
          indexHtml:
            '/Users/bernardgaitho/repos/cloudhub-components/.docz/app/index.html',
          db:
            '/Users/bernardgaitho/repos/cloudhub-components/.docz/app/db.json',
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
