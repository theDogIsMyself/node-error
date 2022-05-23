/*
 * @Date: 2022-02-24 15:47:03
 * @LastEditors: 赵聪
 * @LastEditTime: 2022-02-25 16:51:52
 * @FilePath: /student/backend/config/plugin.js
 */
'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }
  security : {
    xframe: {
      enable: false,
    },
  }
};
