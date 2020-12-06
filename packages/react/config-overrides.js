const path = require('path')
const {override, addBundleVisualizer, addBabelPlugins, babelInclude, disableEsLint, removeModuleScopePlugin, addWebpackAlias} = require('customize-cra')

const modulesPath = path.resolve(__dirname, 'node_modules')

module.exports = override(
  addBanner(),
  disableEsLint(),
  removeModuleScopePlugin(),

  babelInclude([
    path.resolve('src'),
    // path.resolve(modulesPath, "react-native-elements"),
    path.resolve(__dirname, '../common'),
  ]),


  addWebpackAlias({
    // ["ag-grid-react$"]: path.resolve(__dirname, "src/shared/agGridWrapper.js")
    react: 'preact/compat',
    'react-dom/test-utils': 'preact/test-utils',
    'react-dom': 'preact/compat',
  }),

  process.env.BUNDLE_VISUALIZE == 1 && addBundleVisualizer(),
)


function addBanner(vars) {
  return config => {
    console.log('Applying Webpack Config Overrides')
    return config
  }
}