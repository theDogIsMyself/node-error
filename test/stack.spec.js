/*
 * @Date: 2022-02-25 17:46:56
 * @LastEditors: 赵聪
 * @LastEditTime: 2022-02-25 18:30:04
 * @FilePath: /student/backend/test/stack.spec.js
 */
const StackParser = require('../utils/stackparser')
const { resolve } = require('path')
const error = {
    stack: 'ReferenceError: xxx is not defined\n' +
        '    at http://localhost:7001/public/bundle.e7877aa7bc4f04f5c33b.js:1:1392',
    message: 'Uncaught ReferenceError: xxx is not defined',
    filename: 'http://localhost:7001/public/bundle.e7877aa7bc4f04f5c33b.js'
}


it('stackparser on-the-fly', async () => {

    const stackParser = new StackParser(__dirname)

    // 断言 
    expect(originStack[0]).toMatchObject(
        {
            source: 'webpack:///src/index.js',
            line: 24,
            column: 4,
            name: 'xxx'
        }
    )
})
