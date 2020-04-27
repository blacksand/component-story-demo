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

## 组件化开发介绍

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

### 安装其他依赖

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
