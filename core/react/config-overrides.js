const fs = require('fs')
const path = require('path')
const {override, addBundleVisualizer, babelInclude, disableEsLint, removeModuleScopePlugin, addWebpackAlias} = require('customize-cra')

const hookedjsModulePaths =
  fs.readdirSync(path.join(__dirname, '../../modules/'))
    .filter(p => !['.DS_Store', 'api', 'react'].includes(p))
    .map(p => path.resolve(__dirname, `../../modules/${p}`))
    .concat([
      path.resolve(__dirname, `../common`),
    ])
const hookedjsModuleSrcs = [
  ...hookedjsModulePaths.map(p => p + '/react'),
  ...hookedjsModulePaths.map(p => p + '/common')
]

module.exports = override(
  addBanner(),
  disableEsLint(),
  removeModuleScopePlugin(),

  babelInclude([
    path.resolve('src'),
    path.resolve(path.resolve(__dirname, '../../react/src')),
    ...hookedjsModuleSrcs,
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