/*
 * @Date: 2022-02-25 16:08:10
 * @LastEditors: 赵聪
 * @LastEditTime: 2022-04-27 11:39:43
 * @FilePath: /student/error-node/app/controller/monitor.js
 */
'use strict';

const Controller = require('egg').Controller;
// const { getOriginSource } = require('../utils/sourcemap')
const fs = require('fs');
const path = require('path');
const StackParser = require('../../utils/stackpaser.js');
class MonitorController extends Controller {
  async index() {
    const { ctx } = this;
    const { info } = ctx.query;
    const json = JSON.parse(Buffer.from(info, 'base64').toString('utf-8'));
    console.log('fronterror:', json);
    if (json.stack) {
      const stackParser = new StackParser(path.join(this.config.baseDir, 'uploads'));
      // node 端 使用 error-stack-parse 解析堆栈 变成数组
      const stackFrame = stackParser.parseStackTrack(json.stack, json.message);
      // 根据 SourceMapConsumer.originalPositionFor 把stackFrame对象中的line 和 row 文件 映射到根据 fileName 源码
      const originStack = await stackParser.getOriginalErrorStack(stackFrame);
      this.ctx.getLogger('frontendLogger').error(json, originStack);
    } else {
      this.ctx.getLogger('frontendLogger').error(json.message);
    }


    ctx.body = '';
  }

  async upload() {
    const { ctx } = this;
    const stream = ctx.req;
    const filename = ctx.query.name;
    const dir = path.join(this.config.baseDir, 'uploads');
    // 判断upload目录是否存在
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }

    const target = path.join(dir, filename);
    const writeStream = fs.createWriteStream(target);
    stream.pipe(writeStream);
  }
}

module.exports = MonitorController;
