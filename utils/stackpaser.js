/*
 * @Date: 2022-02-25 17:45:16
 * @LastEditors: 赵聪
 * @LastEditTime: 2022-04-27 15:03:05
 * @FilePath: /student/error-node/utils/stackpaser.js
 */
const { SourceMapConsumer } = require('source-map');
const path = require('path');
const fs = require('fs');
const ErrorStackParser = require('error-stack-parser');
module.exports = class StackPaser {
  constructor(sourceMapDir) {
    this.consumers = {};
    this.sourceMapDir = sourceMapDir;
  }
  parseStackTrack(stack, message) {
    const error = new Error(message);
    error.stack = stack;
    const stackFrame = ErrorStackParser.parse(error);
    return stackFrame;
  }

  async getOriginalErrorStack(stackFrame) {
    const origin = [];
    for (const v of stackFrame) {
      origin.push(await this.getOriginPosition(v));
    }
    // 销毁所有consumers
    // console.log(Object.keys(this.consumers));
    // [ ...new Set(Object.keys(this.consumers)) ].forEach(key => {
    //   console.log('key:', key);
    //   this.consumers[key] && this.consumers[key].destroy();
    // });
    return origin;
  }

  async getOriginPosition(stackFrame) {
    let { columnNumber, lineNumber, fileName } = stackFrame;
    fileName = path.basename(fileName);
    console.log('filebasename', fileName);
    // 判断是否存在
    let consumer = this.consumers[fileName];

    if (consumer === undefined) {
      // 读取sourcemap
      const sourceMapPath = path.resolve(this.sourceMapDir, fileName + '.map');
      // 判断目录是否存在
      if (!fs.existsSync(sourceMapPath)) {
        return stackFrame;
      }
      const content = fs.readFileSync(sourceMapPath, 'utf8');
      consumer = await new SourceMapConsumer(content, null);
      this.consumers[fileName] = consumer;
    }
    const parseData = consumer.originalPositionFor({ line: lineNumber, column: columnNumber });
    return parseData;
  }
};
