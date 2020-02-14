const {override, fixBabelImports, addLessLoader, addBabelPlugin} = require('customize-cra');
const aliyunTheme = require('@ant-design/aliyun-theme');

module.exports = override(
    fixBabelImports('import', {
      libraryName: 'antd',
      libraryDirectory: 'es',
      style: true,
    }),

    addLessLoader({
      javascriptEnabled: true,
      modifyVars:{
        '@table-padding-vertical':'10px',
        '@layout-body-background': '@white'
      }

    }),

);
