# simple-webpack-multiple-pages-template

## 一个基于webpack和jquery的简单多页应用项目模板

> 有些情况下，我们需要使用传统的jquery进行多页面网站的开发，但是同时我们又想利用新的技术对项目进行各种优化和打包以提高网站的效率，本模板项目可以一定程度上满足这种需求

***

- 多页面合并打包
- 默认使用jquery，支持jquery插件和相关的样式组件(项目默认引入了jquery-weui作为jquery插件和样式组件的示例，如果不需要的话可以移除，注意同时也要删除base.js中相关引用)
- 支持动态调试，实时刷新(建议看下Login.js中的相关注释)
- 抽取公共模块和代码分别打包
- 合并公共样式文件，兼容性样式自动补全，合并重复样式代码(`postcss`)
- 支持`less`(当然也可以添加其他的)
- es6语法转换(`babel`)
- `eslint`代码检查

***

    打包
    npm run build
    调试
    npm run dev
    生成打包文件分析
    npm run analyz

***

项目目录结构:

    .
    ├── build                        // 存放webpack的config文件
    │   ├── pages-info.js
    │   ├── webpack.base.config.js
    │   ├── webpack.dev.config.js
    │   └── webpack.prod.config.js
    ├── dist                         // 打包后生成的项目文件夹
    ├── index.html                   // 没有业务上的作用，可以用来进行重定向
    ├── package-lock.json
    ├── package.json
    └── src
        ├── assets                   // 所有图片文件都放在这个文件夹
        ├── common                   // 存放所有公共文件
        │   ├── base
        │   │   └── base.js          // 基js文件，一些全局的样式和模块引入可以统一放在这个文件里，然后推荐所有页面js文件都引入这个文件
        │   ├── lib                  // 公共代码文件夹
        │   └── style                // 公共样式文件夹
        │       └── common.css
        └── pages                    // 存放页面相关文件，模板中的两个为示例，注意一个页面的相关文件都一定要用相同的名称；不同的页面之间的名称不能相同
            ├── ChangePW
            │   ├── ChangePW.html
            │   └── ChangePW.js
            └── Login
                ├── Login.css
                ├── Login.html
                └── Login.js

打包后目录结构(根目录下dist文件夹):

    .
    ├── css
    │   ├── Login.a4e8521b509048dbfd9844bad21cfee9.css
    │   └── common.362c4985a088703b47fc6d801c07d62a.css
    ├── js
    │   ├── ChangePW
    │   │   └── ChangePW.dad7bf7bf5800a664654.js
    │   ├── Commons
    │   │   ├── common.554cbd255bb2da5d7686.js
    │   │   ├── manifest.abf5a0af1ee018df2915.js
    │   │   └── vendor.f85da03b296213531f47.js
    │   └── Login
    │       └── Login.d40c196836c97550aef4.js
    └── pages
        ├── ChangePW.html
        └── Login.html

>注意在进行调试时执行`npm run dev`后要在浏览器里手动访问想要调试的页面。例如想要调试Login页面，需要访问:http://loclhost:8080/pages/Login.html
