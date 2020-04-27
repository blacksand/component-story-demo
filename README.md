# 组件化开发演练

此项目使用 [angular][] 与 [storybook][] 来演示前端组件化开发技术。

[angular]: https://angular.cn
[storybook]: https://storybook.js.org

## 主要内容

- 组件化开发介绍
- 开发环境准备
- 创建项目工作区
  - 验证工作区是否就绪
  - 安装其他依赖库
- 开发
  - 文档 / 测试
  - 组件代码
- 开发其他组件
- 集成测试
  - e2e 测试
- 发布
  - 构建

## 组件化开发介绍 [step-1](#step-1)

### 组件化开发的特点:

- 功能封装
  - 单一职责
  - 高内聚
  - 独立性, 减少外部依赖
- 可重用
  - 应用内, 重用组件带来可以提供一致性体验
  - 应用外部, 可用通过打包发布, 源代码复制等方式重用
- 可组合
  - 若干个小组件构成一个复杂组件
  - 整个应用是一个顶层组件
- 可替换
  - 组件提供输入输出接口给外部系统
  - 外部系统不关心组件的内部实现
  - 可以用其他组件替换接口一致的相关组件

### 组件的分类:

> 这个概念来自 `react` 社区, 对于 angular 和 vue 来说, 约束性会小一些

- 展示组件  
  也称为 UI 组件, 哑组件, 负责将输入的数据呈现到 html 中

  - 只关心它的外观
  - 通常是无状态的, 即最终呈现出的 html 代码仅仅与输入参数相关, 输入相同的参数, 总是能得到相同的结果
  - 内部通常包含 html dom 元素, 也可以包含子级 **容器组件** 与 **展示组件**
  - 不依赖于其他 app 服务, 对 angular 来说, 其构造函数中的注入参数应该为空
  - 输出通常是 click, mousemove 等用户交互产生的事件
  - 组件内部一般不会处理异步调用
  - 易于编写与测试

- 容器组件  
  也称为智能组件, 负责处理数据和业务规则等

  - 只关心它的行为
  - 包含子级 **容器组件** 与 **展示组件**, 很少或不包含 html dom 组件
  - 会为子级的展示组件提供数据
  - 会包含 http, store 等外部服务
  - 组件内部通过异步调用使用 http, store 等服务

### 组件间的通信

组件间最主要的通信方式是通过 **输入/输出** 参数进行, 即组件的属性和事件。对容器组件来说， 还可以通过如
router, store, localStorage 等服务来共享数据。

- 使用输入输出参数:

```html
<app-header [text]="companyName" (menuClick)="onMenuClick()"></app-header>
```

## 开发环境准备

系统使用 `nodejs` 开发环境 + `yarn` 包管理器。

| name         | version | install                      |      |
| ------------ | ------- | ---------------------------- | ---- |
| node         | 10.19.0 |                              |      |
| yarn         | 1.22.4  |                              |      |
| @angular/cli | 9.1.3   | yarn global add @angular/cli | 可选 |
| @nrwl/nx     | 9.2.3   | yarn global add @nrwl/nx     | 可选 |

### 针对国内网络, 部分依赖包需要使用镜像服务器下载安装

使用 `mirror-config-china` 配置 npm 包的淘宝镜像库

```bash
yarn global add mirror-config-china
```

因为 `Cypress` 的二进制包不能自动由淘宝镜像上下载, 需要先手工下载好, 然后在环境变量中指定安装包文件的位置。

> win64: https://npm.taobao.org/mirrors/cypress/4.4.1/win32-x64/cypress.zip  
> linux64: https://npm.taobao.org/mirrors/cypress/4.4.1/linux-x64/cypress.zip

设置环境变量:

```bat
REM windows
set CYPRESS_INSTALL_BINARY=D:\Download\cypress.zip
```

```bash
# linux
export CYPRESS_INSTALL_BINARY=~/download/cypress.zip
```

## 创建项目工作区

使用 `@nrwl/nx-workspace` 作为开发工作区环境。

在命令行输入 `yarn create nx-workspace` 创建工作区, 执行命令后, 依次输入

1. workspace name: `elane`  
   工作区名称, 通常用组织名称缩写, 会默认用作组件选择器前缀

2. preset: `angular`  
   可以选择如下类型:

   - empty: 空项目
   - web-components: web 组件
   - angular: angular 前端项目
   - angular-nest: angular 前端 + nest 后端
   - react: react 前端
   - react-express: react 前端 + express 后端
   - next: next 框架

3. application name: `dashboard`  
   项目名称

4. style: `SASS(.scss)`  
   前端项目中默认使用的 css 样式表文件类型

等待一段时间, 依赖包下载安装完成后, 工作空间就可以使用了。

> 通过运行 `nx update` 检测是否有需要进行 angular 包的升级  
> 如果在全局环境中安装了 @nrwl/cli, 则可以直接使用 `nx` 命令, 否则需要用 `yarn nx`

接下来, 运行一下测试程序, 以确保所有依赖包都安装正确:

### 使用 jest 进行单元测试

```bash
nx test dashboard

# 以下为命令运行输出
ng run dashboard:test
PASS apps/dashboard/src/app/app.component.spec.ts
AppComponent

    ✓ should create the app (94ms)
    ✓ should have as title 'dashboard' (39ms)
    ✓ should render title (39ms)

Test Suites: 1 passed, 1 total
Tests: 3 passed, 3 total
Snapshots: 0 total
Time: 3.317s
Ran all test suites.
```

### 使用 cypress 进行端到端测试

```bash
nx e2e dashboard-e2e

# 以下为命令运行输出
 (Run Starting)
 ┌────────────────────────────────────────────────────────────────────────────────────────────────┐
 │ Cypress:    4.4.1                                                                              │
 │ Browser:    Electron 80                                                                        │
 │ Specs:      1 found (app.spec.ts)                                                              │
 └────────────────────────────────────────────────────────────────────────────────────────────────┘

 ──────────────────────────────────────────────────────────────────────────────────────────────────

 Running:  app.spec.ts                                                                     (1 of 1)
   Starting type checking service...
   Using 1 worker with 2048MB memory limit
   Starting type checking service...
   Using 1 worker with 2048MB memory limit

   dashboard
     ✓ should display welcome message (2639ms)

   1 passing (3s)

   (Results)

 ┌────────────────────────────────────────────────────────────────────────────────────────────────┐
 │ Tests:        1                                                                                │
 │ Passing:      1                                                                                │
 │ Failing:      0                                                                                │
 │ Pending:      0                                                                                │
 │ Skipped:      0                                                                                │
 │ Screenshots:  0                                                                                │
 │ Video:        true                                                                             │
 │ Duration:     2 seconds                                                                        │
 │ Spec Ran:     app.spec.ts                                                                      │
 └────────────────────────────────────────────────────────────────────────────────────────────────┘

 (Video)
 -  Started processing:  Compressing to 32 CRF
 -  Finished processing: /home/blacksand/projects/elane/dist/cypress/apps/dashboard-    (0 seconds)
                         e2e/videos/app.spec.ts.mp4
===================================================================================================
 (Run Finished)
      Spec                                              Tests  Passing  Failing  Pending  Skipped
 ┌────────────────────────────────────────────────────────────────────────────────────────────────┐
 │ ✔  app.spec.ts                              00:02        1        1        -        -        - │
 └────────────────────────────────────────────────────────────────────────────────────────────────┘
   ✔  All specs passed!                        00:02        1        1
```

如果上面两个测试都正常通过, 那么开发工作区环境就已经准备就绪了。

> 每次运行 cypress 进行 e2e 测试, 它会自动对失败的测试进行截屏和录像, 便于修改代码时重现问题原因

### 安装其他依赖 [step-2](#step-2)

后续的演示过程需要用到以下依赖项目, 请确保安装完成

```bash
# material ui
yarn add @angular/cdk @angular/material

# bulma ui
yarn add bulma

# storybook 与相关插件
yarn add -D @nrwl/storybook               \
            @storybook/addons             \
            @storybook/addon-actions      \
            @storybook/addon-backgrounds  \
            @storybook/addon-docs         \
            @storybook/addon-storysource  \
            @storybook/addon-viewport
```

### storybook 介绍

> Storybook is an open source tool for developing UI components in isolation for React, Vue, and Angular.
> It makes building stunning UIs organized and efficient.
>
> Storybook 是一个开源工具，用于为 React，Vue 和 Angular 隔离开发 UI 组件。
> 它使构建令人惊叹的 UI 井井有条且高效。

storybook 通过编写 **用户故事** (敏捷开发) 的方式对组件开发过程进行管理

- 提供了一个隔离的开发环境, 用于快速开发 UI 组件
- 为测试工作搭建了良好的平台, 可与其他工具配合进行自动化测试
- 集中了组件的示例演示, 文档, 测试于一体, 为开发团队, 运营实施, 以及最终用户提供了一个交流平台

## 进行组件开发

### 创建组件 [step-3](#step-3)

在开始编写组件代码之前, 我们需要在工作空间中创建一个组件库, 将来这个库可以被单独打包, 并做为 npm
库进行发布, 从而实现项目库级别的重用。

```bash
# 在 libs/ui 目录下创建一个名为 ui-bulma 的项目库,
# 其中包含一个文件名为 ui-bulma.module.ts 的 angular 模块。
nx g lib bulma --directory=ui

# 在 ui-bulma.module 中创建一个组件, 后续编写用户故事时需要用到
nx g c welcome --project ui-bulma
```

> bulma 是一个纯 sass 实现的轻量级 ui 库, 使用模块化设计, 小巧精干, 易于使用

创建好库之后, 我们就可以在其中创建组件了:

```bash
# 首先, 创建一个名为 layout 的模块
nx g m layout --project ui-bulma

# 然后, 在 layout 模块中创建一个名为 sidenav-layout 的组件
nx g c layout/sidenav-layout --project ui-bulma
```

现在, 暂时忽略其他目录和文件, 我们的工作区文件夹应该是这样的:

```bash
elane
├──apps
│  ├── dashboard
│  │   └── src
│  │       └── ...
│  └── dashboard-e2e
│      └── src
│          └── ...
└──libs
   └── ui
       └── bulma
           └── src
               ├── layout
               │   ├── layout.module.ts
               │   └── sidenav-layout
               │       ├── sidenav-layout.component.html
               │       ├── sidenav-layout.component.scss
               │       ├── sidenav-layout.component.spec.ts
               │       └── sidenav-layout.component.ts
               └── ui-bulma.module.ts
```

### 准备 storybook [step-4](#step-4)

首先, 我们需要为 `ui-bulma` 库启用 storybook 功能, 运行下面的命令,
对提示的问题全部选择默认的 'Yes'

```bash
nx g storybook-configuration ui-bulma
```

> 默认设置中, storybook 服务使用本机 `4400` 端口, wsl2 环境中经常出现该端口被占用不能启动服务的情况, 所以在
> vscode 中全局查找 `4400`, 修改为 `24400`, 共有两个文件需要修改, 分别是 `angular.json` 和 `cypress.json`。

然后, 我们需要启动 storybook 服务, 运行下面的命令:

```bash
nx run ui-bulma:storybook
# 运行成功后出现:
╭─────────────────────────────────────────────────────╮
│                                                     │
│   Storybook 5.3.9 started                           │
│   12 s for manager and 14 s for preview             │
│                                                     │
│    Local:            http://localhost:24400/        │
│    On your network:  http://172.31.246.90:24400/    │
│                                                     │
╰─────────────────────────────────────────────────────╯
```

现在, 在浏览器中打开 `http://localhost:24400/` 即可查看 storybook 了, 一切顺利的话,
在左侧的导航菜单中, 能看见两个组件的故事列表, 点击 `SidenavLayoutComponent` 里面的 `Primary`,
在右侧主界面中, 就会出现之前创建的 SidenavLayout 组件, 因为尚未对它编码, 所以它显示初始的
`sidenav-layout works!` 字符。

> 在浏览器中查看调试程序时, 尽量使用 **无痕模式** 或 **隐身模式**, 可以减少额外的干扰

### 编写故事 [step-5](#step-5)

保持上一个步骤中打开的浏览器, 然后启动编辑器, 对这个故事进行修改, 打开文件:
`libs/ui/bulma/src/lib/layout/sidenav-layout/sidenav-layout.component.stories.ts`,
替换其中的内容为:

```ts
import { moduleMetadata } from '@storybook/angular';
import { SidenavLayoutComponent } from './sidenav-layout.component';
import { CommonModule } from '@angular/common';

export default {
  title: 'ui-bulma|layout/sidenave-layout',
  component: SidenavLayoutComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule],
      declarations: [SidenavLayoutComponent]
    })
  ]
};

export const primary = () => ({
  component: SidenavLayoutComponent,
  props: {}
});
```

storybook 通过 `default export` 的对象中的 `title` 属性进行导航树的管理, 观察一下我们设置的故事书
标题 `ui-bulma|layout/sidenave-layout` 是如何转换为导航树目录层级的。

在故事书文件中, 除了默认导出 `export default` 之外的所有带有名称的导出对象, 都会被识别为一个用户故事,
所以, 我们现在有一个名为 `primary` 的故事了, 保留它不变, 在文件末尾添加一个新的故事:

```ts
export const desktop = () => ({
  component: SidenavLayoutComponent,
  props: {}
});

desktop.story = {
  name: '桌面布局'
};
```

添加完后, 保存文件, 浏览器中的用户故事应该会自动刷新, 一个新的 `桌面布局` 的故事会出现在导航树中, 点击它。

这个故事就是我们用来编写和调试 Layout 组件在桌面浏览器中显示效果的开发环境, 之后我们还要创建用于手机和平板浏览器
环境下的用户故事。

### 编写组件 [step-6](#step-6)

我们的 sidenav-layout 布局是应用的主界面, 它将页面划分为四个区域, 分别是: 页头, 页脚, 导航树, 内容区。

```js
-------------------------------------
|  (1)                              | 1: 页头
-------------------------------------
|         |                         |
|  (2)    |  (3)                    | 2: 导航树
|         |                         | 3: 内容区
|         |                         |
-------------------------------------
|  (4)                              | 4: 页脚
-------------------------------------
```

对 layout 组件的基本需求如下:

- 页头中需要显示 app 名称, 名称是由后端或配置文件中读取的
- 点击页头中的切换按钮, 可以切换导航树的显示
- 内容区中是路由插槽
- 当内容区不满一屏时, 页脚显示在视图底部, 内容超过一屏时, 页脚显示在内容之后
- 能够在手机 / 平板 / 桌面网站中自适应显示

下一步, 我们针对这四个区域分别创建相关的组件:

```bash
nx g c layout/app-header --project ui-bulma
nx g c layout/app-sidenav --project ui-bulma
nx g c layout/page-container --project ui-bulma
nx g c layout/app-footer --project ui-bulma
```

#### 编辑 header 组件

组件中需要用到 `bulma` 的样式库, 所以要添加对 bulma 的引用:

```scss
// apps/dashboard/src/styles.scss
@import '~bulma/bulma';
```

现在, 可以开始编写 app-header 的故事和组件代码了。

相关的代码在 git 的 `step-7` tag 中, 使用 `git checkout step-7` 签出查看.

> 因为没有配置图标字库, 切换按钮暂时使用文本 `<=>` 代替.

#### 配置 storybook 插件 [step-8](#step-8)

现在能看到 bulma 风格的顶部导航条了, 在进一步操作前, 我们需要对 stroybook 进行配置, 让它能提供诸如
切换手机/平板视图, 修改输入参数, 查看输出事件等功能。 打开 `.storybook/addons.js`, 替换内容如下:

```js
import '@storybook/addon-actions/register';
import '@storybook/addon-backgrounds/register';
import '@storybook/addon-docs/register';
import '@storybook/addon-knobs/register';
import '@storybook/addon-storysource/register';
import '@storybook/addon-viewport/register';
```

替换 `.storybook/webpack.config.js`:

```js
const createCompiler = require('@storybook/addon-docs/mdx-compiler-plugin');

// Export a function. Accept the base config as the only param.
module.exports = async ({ config, mode }) => {
  // `mode` has a value of 'DEVELOPMENT' or 'PRODUCTION'
  // You can change the configuration based on that.
  // 'PRODUCTION' is used when building the static version of storybook.

  // Make whatever fine-grained changes you need

  // Return the altered config
  config.module.rules.push({
    // 2a. Load `.stories.mdx` / `.story.mdx` files as CSF and generate
    //     the docs page from the markdown
    test: /\.(stories|story)\.mdx$/,
    use: [
      {
        loader: 'babel-loader',
        // may or may not need this line depending on your app's setup
        options: {
          plugins: ['@babel/plugin-transform-react-jsx']
        }
      },
      {
        loader: '@mdx-js/loader',
        options: {
          compilers: [createCompiler({})]
        }
      }
    ]
  });
  // 2b. Run `source-loader` on story files to show their source code
  //     automatically in `DocsPage` or the `Source` doc block.
  config.module.rules.push({
    test: /\.(stories|story)\.[tj]sx?$/,
    loader: require.resolve('@storybook/source-loader'),
    exclude: [/node_modules/],
    enforce: 'pre'
  });

  return config;
};
```

最后是 `libs/ui/bulma/.storybook/config.js`:

```js
import { configure, addDecorator, addParameters } from '@storybook/angular';
import { DocsContainer, DocsPage } from '@storybook/addon-docs/blocks';
import { withKnobs } from '@storybook/addon-knobs';

addParameters({
  docs: {
    iframeHeight: '60px',
    page: DocsPage,
    container: DocsContainer
  },
  backgrounds: [
    { name: 'twitter', value: '#00aced', default: true },
    { name: 'facebook', value: '#3b5998' },
    { name: 'grey', value: '#c5c5c5' }
  ],
  options: {
    sortStoriesByKind: true,
    storySort: (a, b) => {
      console.log(a, b);
      return a[1].kind === b[1].kind
        ? 0
        : a[1].id.localeCompare(b[1].id, undefined, { numeric: true });
    }
  }
});

addDecorator(withKnobs);

configure(
  require.context('../src/lib', true, /\.stories\.(ts|tsx|mdx)$/),
  module
);
```

完成后, 刷新 storybook 页面, 可以看见多了一些内容.

#### 重新修改 app-header 的用户故事 [step-9](#step-9)

在 `app-header.stories.ts` 中, 添加下面的代码:

```ts
import { text, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

export const mobile = () => ({
  component: AppHeaderComponent,
  props: {
    header: text('header', 'Elane'),
    onToggle: action('toggleSidenav')
  }
});

mobile.story = {
  name: '手机布局',
  parameters: { viewport: { defaultViewport: 'mobile1' } }
};
```

保存文件, 查看 app-header/手机布局 页面, 发现多了一个滚动条, 在 `styles.scss` 中添加下面的语句关闭它:

```scss
html {
  overflow: hidden;
}
```

#### 修改 layout 组件
