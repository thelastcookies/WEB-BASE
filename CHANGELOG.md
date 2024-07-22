# Changelog

## [0.14.0](https://github.com/thelastcookies/WEB-BASE/compare/v0.13.0...v0.14.0) (2024-07-22)


### Features

* 新增 menuStore 用于作为全局的菜单状态存储 ([1fbef5b](https://github.com/thelastcookies/WEB-BASE/commit/1fbef5b509255720b598c4748345fc7d881f2271))
* 新增用户，角色，权限的接口以及类型声明 ([c27982c](https://github.com/thelastcookies/WEB-BASE/commit/c27982cf011f14dce2e449124a8172154c18875d))

## [0.13.0](https://github.com/thelastcookies/WEB-BASE/compare/v0.12.0...v0.13.0) (2024-07-20)


### Features

* 增加 antd 的颜色预设到 UnoCSS ([09f7c6d](https://github.com/thelastcookies/WEB-BASE/commit/09f7c6df090a875165ab0e490637f90826acf5af))
* 新增全局的设备类型状态存储，优化 Header 和 UserAvatar 的移动端适配方式 ([a7c9dbb](https://github.com/thelastcookies/WEB-BASE/commit/a7c9dbba8af11a42106a4ae35549a15478467b6c))
* 新增外链的占位页面，同时更新路由组织和跳转方法 ([7cd5b06](https://github.com/thelastcookies/WEB-BASE/commit/7cd5b063b7ea04d2e3b70d2f74930a3896852c30))
* 新增浏览器环境检测功能 ([35f67a7](https://github.com/thelastcookies/WEB-BASE/commit/35f67a7317495e1c0747dca62a2240728a191898))
* 新增移动端适配的底部菜单栏 ([fe47f95](https://github.com/thelastcookies/WEB-BASE/commit/fe47f9579d3c008bf6ee94dd2ba78f35112aa762))
* 新增菜单的 icon 配置 ([0bdb1b0](https://github.com/thelastcookies/WEB-BASE/commit/0bdb1b0a32995eaef7c00f99a2b684bae88b0ce9))


### Bug Fixes

* 修复环境变量配置问题 ([c8a51f7](https://github.com/thelastcookies/WEB-BASE/commit/c8a51f7a6896f67472abee9152527ac7fa034a4a))
* 修复环境变量配置问题补充提交 ([0ee6fde](https://github.com/thelastcookies/WEB-BASE/commit/0ee6fde907941726a8acb4dc421fd16ac0daaea1))
* 修复顶层页面过渡动画失效的问题 ([d76abd5](https://github.com/thelastcookies/WEB-BASE/commit/d76abd53146aa71eb97d86220d9ee5e7f1250ed5))
* 增加外链页面没有正常跳转的提示 ([5fb8b38](https://github.com/thelastcookies/WEB-BASE/commit/5fb8b389b036586f3b752cbcbfaa97c7375bfb16))

## [0.12.0](https://github.com/thelastcookies/WEB-BASE/compare/v0.11.0...v0.12.0) (2024-07-17)


### Features

* 完善 Layout，Header 组件的移动端适配 ([58a2188](https://github.com/thelastcookies/WEB-BASE/commit/58a21887566eafedf693d87cdd512b79ceab76fd))
* 完善登录页的移动端适配 ([3567f23](https://github.com/thelastcookies/WEB-BASE/commit/3567f23a73d3ec7044fdaa0f9bbcb5652e9975b2))
* 新增禁用路由守卫的功能 ([d9ae733](https://github.com/thelastcookies/WEB-BASE/commit/d9ae733ffb5a77840df487a4fd14470ecb17fda8))


### Bug Fixes

* 修复一个可能导致时间选择器所选值非法的问题 ([ac6176a](https://github.com/thelastcookies/WEB-BASE/commit/ac6176ab4d5f0ca57d2c005fdfce7777e158e149))

## [0.11.0](https://github.com/thelastcookies/WEB-BASE/compare/v0.10.0...v0.11.0) (2024-07-15)


### Features

* 新增页面切换 transition 效果 ([d7e1595](https://github.com/thelastcookies/WEB-BASE/commit/d7e15958c1b4050a7b662537dda68619b97d1644))


### Bug Fixes

* 解决 Windows 系统下项目路径解析错误的问题 ([42c068a](https://github.com/thelastcookies/WEB-BASE/commit/42c068ad59780cad4bb0c5b78ed7b410ae53a544))

## [0.10.0](https://github.com/thelastcookies/WEB-BASE/compare/v0.9.0...v0.10.0) (2024-07-06)


### Features

* 新增表单设计器功能模块 ([a9ee194](https://github.com/thelastcookies/WEB-BASE/commit/a9ee194cc666d6106099b1a44b9a98cbea6929bf))


### Bug Fixes

* 修复一个可能导致登录时 disable 状态异常的问题 ([b33a85b](https://github.com/thelastcookies/WEB-BASE/commit/b33a85b849048d6290d8ea4d268c7d11e2c5afb8))
* 修改 BaseIcon size 配置项 ([b4e45c8](https://github.com/thelastcookies/WEB-BASE/commit/b4e45c81c49b9e0c3fba9a045b739d5114b2a9c4))

## [0.9.0](https://github.com/thelastcookies/WEB-BASE/compare/v0.8.0...v0.9.0) (2024-06-30)


### Features

* 增加 SlidePicker 组件与组件 Sample ([c3c4c43](https://github.com/thelastcookies/WEB-BASE/commit/c3c4c43540d5d60029fa968b66683c05b250c570))
* 增加 SlidePicker 组件自定义颜色支持 ([ea83b6f](https://github.com/thelastcookies/WEB-BASE/commit/ea83b6f3b8871054bdab08387c8d07285096c8fb))
* 增加特殊页面 Sample.vue ([a9119df](https://github.com/thelastcookies/WEB-BASE/commit/a9119df90d8721d869715ad5f1187d1f59fb37ad))
* 重新设计路由组织形式，增加对 iframe 页面嵌入的支持，增加静态路由示例 ([4e32809](https://github.com/thelastcookies/WEB-BASE/commit/4e328097621b8618e8f7e0d9e0226158f7a0cf60))


### Bug Fixes

* 修改 App.vue 中包裹路由的 div 设置 ([33bd9e5](https://github.com/thelastcookies/WEB-BASE/commit/33bd9e531607e510bea69e81cd364471885d5589))
* 特殊状态下 SlidePicker 编辑状态无法退出的问题消缺。 ([6c7c60b](https://github.com/thelastcookies/WEB-BASE/commit/6c7c60b0cd6ce68950ffab1302b74e656ce318e2))

## [0.8.0](https://github.com/thelastcookies/WEB-BASE/compare/v0.7.0...v0.8.0) (2024-05-05)


### Features

* 为类型为菜单的页面配置 redirect，指向第一个配置了 path 的直系子孙 ([e12df0c](https://github.com/thelastcookies/WEB-BASE/commit/e12df0c43747087e9e0a9266337263013b2ec47f))
* 使用 data-fns 作为时间处理工具 ([089cf56](https://github.com/thelastcookies/WEB-BASE/commit/089cf561bed577a69acce4f89bef5c594a6d659f))
* 增加表格中按钮样式 preset ([6ec643a](https://github.com/thelastcookies/WEB-BASE/commit/6ec643ad35645c9587067653fe4614bbad7731fc))
* 增加随路由自动展开当前活跃菜单的功能 ([658239f](https://github.com/thelastcookies/WEB-BASE/commit/658239f06c33151acfd53b9b9d0216eeb77a002b))
* 定义 routeTo 方法参数的联合类型 ([a99d758](https://github.com/thelastcookies/WEB-BASE/commit/a99d758d293246ff547183af3fc9f3afde535eed))
* 对 ActionItem 接口类型进行拆分细化 ([3b51146](https://github.com/thelastcookies/WEB-BASE/commit/3b5114640191297ab500d1e4f78981b52237137e))
* 将导航方法 "routeTo" Promise 化，并增加导航到菜单时的处理方法 ([f54e7b9](https://github.com/thelastcookies/WEB-BASE/commit/f54e7b990989054ffef29f14fe25f7b723545cdf))
* 弃用平铺路由，使用层级路由来更好地发挥 Vue Router 的能力 ([82f1af3](https://github.com/thelastcookies/WEB-BASE/commit/82f1af37484eb6d173c1fb53cbfda8788dfb8a16))


### Bug Fixes

* 优化了侧边栏菜单的生成方法，修复可能的类型错误问题 ([9e5faa8](https://github.com/thelastcookies/WEB-BASE/commit/9e5faa8ca66e31a098e6cbd914d3fde3550ef459))
* 修复一个可能导致注销后重新登录时菜单加载失败的问题 ([40f705b](https://github.com/thelastcookies/WEB-BASE/commit/40f705b1b5d35495419b073628ac3ed6317a9152))
* 修改控制台错误提示输出 ([fdae4d2](https://github.com/thelastcookies/WEB-BASE/commit/fdae4d232759537ab7a8007751595340a1b464b0))
* 去除多余的样式 ([16a1a80](https://github.com/thelastcookies/WEB-BASE/commit/16a1a80818221038b43ddee0702dff99ccdd304c))
* 解决 token 失效时引起导航问题 ([60eda90](https://github.com/thelastcookies/WEB-BASE/commit/60eda900222d8c966b92e7e6b573eb52d03a030c))
* 设置中文环境 ([92f93e1](https://github.com/thelastcookies/WEB-BASE/commit/92f93e1b469ab0f07a82d13e4e2d792112d34965))

## [0.7.0](https://github.com/thelastcookies/WEB-BASE/compare/v0.6.0...v0.7.0) (2024-04-04)


### Features

* 对影响整体布局紧凑度的内外边距值进行 CSS 变量提取，并增加 UnoCSS 支持 ([8e1aad7](https://github.com/thelastcookies/WEB-BASE/commit/8e1aad7b766856d7953bc0b6bbe8e501b699df8d))


### Bug Fixes

* 修复 AppStore 中没有正确验证配置文件与没有 resolve 的问题 ([82b0523](https://github.com/thelastcookies/WEB-BASE/commit/82b0523e0af35a13f690f98a8b0150a65677952b))
* 修复 UserStore 没有正确地抛出异常导致 Token 过期后系统加载异常的问题 ([e9db47d](https://github.com/thelastcookies/WEB-BASE/commit/e9db47d33e3d88e652e692e62e903f8c2377d477))
* 修复登录表单有默认值时 label 状态异常的问题，增加账户 input 的自动聚焦 ([05f2ea8](https://github.com/thelastcookies/WEB-BASE/commit/05f2ea856cc16d90a521883ac31fa4d67c64d739))
* 修复系统根节点的颜色错误问题，调整 rem 基值 ([e1be34f](https://github.com/thelastcookies/WEB-BASE/commit/e1be34f0a7a003fde24533f6d05b8768b847fece))
* 补充路由守卫中遗漏的错误处理 ([4d0d5ef](https://github.com/thelastcookies/WEB-BASE/commit/4d0d5ef1de114bb2ab8fb59dcb4581366a3ea3ca))

## [0.6.0](https://github.com/thelastcookies/WEB-BASE/compare/v0.5.0...v0.6.0) (2024-03-31)


### Features

* 使用订阅路由变化的方式更新菜单和面包屑 ([409d742](https://github.com/thelastcookies/WEB-BASE/commit/409d74277fcc6df9a6b0c626c411e04ea78ffe7c))
* 增加路由组件传参支持 ([ad00a52](https://github.com/thelastcookies/WEB-BASE/commit/ad00a52308c0d1d40c5484fb8b6d427ce8e2b45c))
* 完善菜单功能，增加对隐藏菜单的支持 ([7294190](https://github.com/thelastcookies/WEB-BASE/commit/729419049343aff7f4c2f0486e6f0b94d5188182))
* 新增 UnoCSS 主题，导入 Antdv CSS 变量 ([7b1d11b](https://github.com/thelastcookies/WEB-BASE/commit/7b1d11bc4e839bfd33d7596c098bb35bccd42517))


### Bug Fixes

* 使用 UnoCSS 'vue-scoped' mode，解决 UnoCSS 样式优先级低的问题 ([57af199](https://github.com/thelastcookies/WEB-BASE/commit/57af19907016bbb0e8334ee8b8fde972cfd5cde5))
* 修复 ActionStore 方法在初始化前被调用的问题 ([a042989](https://github.com/thelastcookies/WEB-BASE/commit/a042989d3fef64e062c37060da5e79bd2625e504))
* 修复 UserAvatar.vue 文字颜色错误的问题 ([58ef791](https://github.com/thelastcookies/WEB-BASE/commit/58ef791211e2212f87475c8c8cb50da1124979d9))
* 删除 Layout.vue 中的多余内容 ([8cceb1d](https://github.com/thelastcookies/WEB-BASE/commit/8cceb1d2273549ca60fdbf896db3fbabd8a8def5))
* 增加 guard.ts 的错误提示 ([cc9cc5c](https://github.com/thelastcookies/WEB-BASE/commit/cc9cc5c362ee456fdbc0c8e227791f42d1945d93))
* 增加面包屑组件数据校验，修复死循环问题 ([98ba5f4](https://github.com/thelastcookies/WEB-BASE/commit/98ba5f46213718f8c51ac3d44a82b29e8a527d61))
* 新增路由配置缺陷时的提示 ([a5076c7](https://github.com/thelastcookies/WEB-BASE/commit/a5076c73839b25c9d9fb3216f71a627658cc8a31))

## [0.5.0](https://github.com/thelastcookies/WEB-BASE/compare/v0.4.0...v0.5.0) (2024-03-28)


### Features

* 增加登录表单提交后禁用功能 ([34e398d](https://github.com/thelastcookies/WEB-BASE/commit/34e398d4f9384a70fb3c15080d77f2160d07a200))


### Bug Fixes

* 修复 404 页面无法正常展示的问题 ([cceddb1](https://github.com/thelastcookies/WEB-BASE/commit/cceddb10c791e6ac07d3cf629d42cb2ea825db5b))
* 修改 tsconfig.json 配置 ([cbe50ec](https://github.com/thelastcookies/WEB-BASE/commit/cbe50ecea0a3ee6755cb55629ed6b66f08d9839f))
* 添加路由匹配失败时的回退模式 ([b36f10a](https://github.com/thelastcookies/WEB-BASE/commit/b36f10a2e9b10385e12a886d49d076a2d5a72e82))

## [0.4.0](https://github.com/thelastcookies/WEB-BASE/compare/v0.3.0...v0.4.0) (2024-03-26)


### Features

* 新增 Loading 组件 ([0233340](https://github.com/thelastcookies/WEB-BASE/commit/023334042fe7d99b8aa4b8b7d44bba95ffddc27e))
* 新增用户头像组件 ([e645239](https://github.com/thelastcookies/WEB-BASE/commit/e645239142572bf9220fea5c4bceda7b720253a8))
* 新增登录后系统总入口 ([f1275d1](https://github.com/thelastcookies/WEB-BASE/commit/f1275d1c3b4e071327307232b00fb11873de775a))
* 新增边栏菜单组件 ([5c300e4](https://github.com/thelastcookies/WEB-BASE/commit/5c300e4eb925414670b187cabe1481035ad09b13))
* 新增面包屑组件 ([58c6f7b](https://github.com/thelastcookies/WEB-BASE/commit/58c6f7bdc8f42a11ff144e911effffbf8e15c8bf))
* 新增页眉组件 ([6472120](https://github.com/thelastcookies/WEB-BASE/commit/647212016a8c175c9ec1c94622a05e412abb235a))


### Bug Fixes

* 修改 Less 变量为 CSS 变量 ([737cd1a](https://github.com/thelastcookies/WEB-BASE/commit/737cd1abf97634fdbf1db40dbe2853897821a034))
* 删除已不需要的内容 ([66cc8a9](https://github.com/thelastcookies/WEB-BASE/commit/66cc8a973a0a6071b1025dce50b127a288cbfaf3))
* 补充 Layout.vue 的路由配置 ([f2335ea](https://github.com/thelastcookies/WEB-BASE/commit/f2335ea787e710173ee0ca582283f3435ef4b03f))
* 调整页眉，面包屑，头像组件的位置 ([7bf345b](https://github.com/thelastcookies/WEB-BASE/commit/7bf345beb9bbc99a8031ecf52bfc2db589a7651f))

## [0.3.0](https://github.com/thelastcookies/WEB-BASE/compare/v0.2.0...v0.3.0) (2024-03-25)


### Features

* 新增 BaseIcon.vue 特性 ([ee5a30b](https://github.com/thelastcookies/WEB-BASE/commit/ee5a30bfe5259e59d77f77de006b08226a1cc311))
* 新增 Login.vue，作为系统登录页 ([bc15af3](https://github.com/thelastcookies/WEB-BASE/commit/bc15af333a6e90042ed93676c25805128094edec))
* 新增 LoginForm.vue 组件 ([d9b050b](https://github.com/thelastcookies/WEB-BASE/commit/d9b050b74092d8b72f64513f2f009408f27020b8))


### Bug Fixes

* 修复 App 组件内缺少 RouterView 的问题 ([77bee7c](https://github.com/thelastcookies/WEB-BASE/commit/77bee7c0636a3c7875ea1870845ecd68c22a4eb5))
* 修改 env 环境变量的存储路径使 index.html title 正常显示 ([16cf686](https://github.com/thelastcookies/WEB-BASE/commit/16cf686843f06cd697de2ae6325a8398ed688ccb))

## [0.2.0](https://github.com/thelastcookies/WEB-BASE/compare/v0.1.0...v0.2.0) (2024-03-25)


### Features

* 在应用级别引入深浅色 antdv 主题 与 CSS 变量，实现主题切换功能 ([5395fbc](https://github.com/thelastcookies/WEB-BASE/commit/5395fbcc2107327aa820eedd47f1f0549dde0b85))
* 根据 Antdv 新增深色、浅色模式的 CSS 变量 ([981f3a4](https://github.com/thelastcookies/WEB-BASE/commit/981f3a45b571f8532f2d43c126001a779e4a6535))

## [0.1.0](https://github.com/thelastcookies/WEB-BASE/compare/v0.0.0...v0.1.0) (2024-03-25)


### Features

* 按照不同的请求方法对 axios 实例进行再封装 ([ce4c970](https://github.com/thelastcookies/WEB-BASE/commit/ce4c97023241a5b3185bf63bb496ddb9057624ad))
* 新增 Action 状态管理 ([791c161](https://github.com/thelastcookies/WEB-BASE/commit/791c161561d2385403e3e5ca1063949218895b94))
* 新增 App 应用状态管理 ([c54a26c](https://github.com/thelastcookies/WEB-BASE/commit/c54a26cdfc7a51a6a99540d801881882eb2c5456))
* 新增 axios 功能扩展，包括请求、响应的处理；导出 axios 实例 ([03ef1f7](https://github.com/thelastcookies/WEB-BASE/commit/03ef1f7aa578d8d0a2923ba35f822999c5333e6e))
* 新增 BaseIcon.vue 组件 ([835c23b](https://github.com/thelastcookies/WEB-BASE/commit/835c23b3599f0fad48cc7e25154ecc3dc8450616))
* 新增 token 状态管理 ([1bdbccf](https://github.com/thelastcookies/WEB-BASE/commit/1bdbccf5982088c451045bbbbfbc1e22711da10c))
* 新增 UnoCSS 配置，并注入 Vite Plugins ([d4ec60e](https://github.com/thelastcookies/WEB-BASE/commit/d4ec60e6726eacc8776d43024a5eab90d0b13f20))
* 新增基本的用户、角色、菜单、权限接口 ([d02a2c1](https://github.com/thelastcookies/WEB-BASE/commit/d02a2c148c40ce5245b9901c5346b2f8943a2182))
* 新增用户信息状态管理 ([178d494](https://github.com/thelastcookies/WEB-BASE/commit/178d4941351fb593030c710b3a15d3f5e4184303))
* 新增路由动态生成功能 ([f08cebf](https://github.com/thelastcookies/WEB-BASE/commit/f08cebf9abb4e1c9a62d3de76545b106fb0e9044))
* 新增路由守卫 ([b1390f4](https://github.com/thelastcookies/WEB-BASE/commit/b1390f4b665ec4b6edb1d4e9db8427cd6365c277))
* 新增静态路由配置文件 ([a252a90](https://github.com/thelastcookies/WEB-BASE/commit/a252a90e54f2ada72f8811688a149d5c1947c3bf))
* 新增页面组件的 Glob 导入功能 ([28b2437](https://github.com/thelastcookies/WEB-BASE/commit/28b2437bf482e26236e45f3dbae15c85ee6b770f))

## 0.0.0 (2024-03-25)


### Continuous Integration

* 集成 GitHub Actions，Husky，Commitlint ([d76a779](https://github.com/thelastcookies/WEB-BASE/commit/d76a779e4c8cddb4d5ea84cc142599f249bf0e12))
