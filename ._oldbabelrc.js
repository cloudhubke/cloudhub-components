const plugins = [
  '@babel/plugin-transform-object-assign',
  '@babel/plugin-syntax-dynamic-import',
  '@babel/plugin-proposal-class-properties',
  [
    'babel-plugin-import',
    {
      libraryName: '@material-ui/core',
      // Use "'libraryDirectory': ''," if your bundler does not support ES modules
      libraryDirectory: '',
      camel2DashComponentName: false,
    },
    'core',
  ],
  [
    'babel-plugin-import',
    {
      libraryName: '@material-ui/lab',
      // Use "'libraryDirectory': ''," if your bundler does not support ES modules
      libraryDirectory: '',
      camel2DashComponentName: false,
    },
    'lab',
  ],
  [
    'babel-plugin-import',
    {
      libraryName: '@material-ui/icons',
      // Use "'libraryDirectory': ''," if your bundler does not support ES modules
      libraryDirectory: '',
      camel2DashComponentName: false,
    },
    'icons',
  ],
  [
    'import',
    {
      libraryName: 'lodash',
      libraryDirectory: '',
      camel2DashComponentName: false, // default: true
    },
  ],
];

const presets = [
  [
    '@babel/preset-env',
    {
      modules: false,
    },
  ],
  '@babel/preset-react',
];

module.exports = { presets, plugins };
