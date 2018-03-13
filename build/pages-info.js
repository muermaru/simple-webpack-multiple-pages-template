'use strict'
const path = require('path')
const glob = require('glob')

// 获取pages文件夹下的内容
const staticRootDir = path.resolve(__dirname, '../')
const srcRootDir = path.resolve(staticRootDir, './src')
const pagesDir = path.resolve(srcRootDir, './pages')
const globInstance = new glob.Glob('!(_)*', {
  cwd: pagesDir, // 在pages目录里找
  sync: true, // 这里不能异步，只能同步
})

const pagesNameArr = globInstance.found

module.exports = {
  pagesDir,
  pagesNameArr
}
