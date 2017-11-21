/* eslint-disable import/no-extraneous-dependencies */
const { injectBabelPlugin } = require('react-app-rewired');
const rewireLess = require('react-app-rewire-less');

module.exports = function override(config, env) {
  let modifiedConfig = config;

  modifiedConfig = injectBabelPlugin(
    ['import', { libraryName: 'antd', style: true }],
    config
  ); // change importing css to less
  modifiedConfig = rewireLess.withLoaderOptions({
    modifyVars: { '@primary-color': '#00aeae' }
  })(config, env);

  return modifiedConfig;
};
