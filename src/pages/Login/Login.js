import '@/common/base/base.js'
import './Login.css'

// 提供给调试时html文件修改动态刷新，因此注意下面的写法，非开发环境一定不要引入
// 去掉的话不影响正常使用，只是调试时修改了html文件需要手动刷新页面
if (process.env.NODE_ENV === 'development') {
  require('./Login.html')
}

$('#loginBtn').on('click', () => {
  console.log('aaa')
  $.alert('我是一个对话框')
})
