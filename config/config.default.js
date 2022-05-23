/*
 * @Date: 2022-02-24 15:47:03
 * @LastEditors: 赵聪
 * @LastEditTime: 2022-03-11 13:40:55
 * @FilePath: /student/backend/config/config.default.js
 */
/* eslint valid-jsdoc: "off" */
const path = require('path');
('use strict');

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {});

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1645688728429_5321';

  // add your middleware config here
  config.middleware = [];
  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
    security: {
      csrf: {
        enable: false,
      },
    },
    customLogger: {
      frontendLogger: {
        file: path.join(appInfo.root, 'logs/frontend.log'),
      },
    },
  };

  return {
    ...config,
    ...userConfig,
  };
};
