/*
 * @Date: 2022-02-24 15:47:03
 * @LastEditors: 赵聪
 * @LastEditTime: 2022-02-25 16:37:15
 * @FilePath: /student/backend/app/router.js
 */
'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/monitor/error', controller.monitor.index);
  router.post('/monitor/sourcemap',controller.monitor.upload)
};
