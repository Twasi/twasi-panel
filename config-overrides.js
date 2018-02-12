/* eslint-disable import/no-extraneous-dependencies */

module.exports = function override(config) {
  const modifiedConfig = config;

  /* modifiedConfig = injectBabelPlugin(
    ['import', { libraryName: 'antd', style: true }],
    config
  ); // change importing css to less
  modifiedConfig = rewireLess.withLoaderOptions({
    modifyVars: {
      '@primary-color': '#00aeae',
      '@icon-url': "'/iconfont/iconfont'"
    }
  })(config, env); */

  return modifiedConfig;
};
