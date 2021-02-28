## 学习笔记

为JavaScript环境准备一套工具链，覆盖前端开发的各个环节。

### 第一步，准备脚手架既是Generator。

#### Yeoman

`Yeoman`是现在社区比较流行的脚手架生成器，既是generator的generator。

1. 准备一个js模块

   *  创建一个文件夹
   * 在文件夹里执行`npm init`
2.  `npm install yeoman-generator`安装`yeoman`
3. 配置

下面这份是`package.json`的代码，用于模块配置

 ```javascript
{
  "name": "generator-vue", // 名字必须'generator-'前缀
  "version": "1.0.0",
  "description": "",
  "main": "generators/app/index.js", // 入口文件
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "yeoman-generator": "^4.11.0"
  }
}
 ```



下面这份是`index.js`的代码，用于配置generator 模板

```javascript
 var Generator = require('yeoman-generator');

module.exports = class extends Generator {
    // .......省略部分代码
    
    async initPackage() {
    
      // 配置命令行交互，配置一些项目信息
        let answer = await this.prompt([
            {
                type: "input",
                name: "name",
                message: "Your project name",
                default: this.appname // Default to current folder name
            }
        ]);
    
      // Yeoman 依赖系统
        const pkgJson = {
            "name": answer.name,
            "version": "1.0.0",
            "description": "",
            "main": "generators/app/index.js",
            // .......省略部分代码
        };
      
        // Extend or create package.json file in destination path
        this.fs.extendJSON(this.destinationPath('package.json'), pkgJson);
      	// 执行npm install
        this.npmInstall(["vue"], { 'save-dev': false});
        this.npmInstall(["webpack@4.44.1", "vue-loader", "vue-style-loader", "css-loader@4.2.2", "vue-template-compiler", "copy-webpack-plugin@6.0.3"], { 'save-dev': true});
    
       // .......省略部分代码
    
      // Yeoman 文件模板系统，将模板文件按照配置在对应位置创建文件
        this.fs.copyTpl(
            this.templatePath('webpack.config.js'),
            this.destinationPath('webpack.config.js')
            
        );
    
        // .......省略部分代码
    }
};
```

*在配置`npmInstall`的时候，可以通过`xxx@1.2.3`这样的格式去指定安装包的版本。*

更多详细的配置细节可以参考`Yeoman`的[官方文档](https://yeoman.io/authoring/index.html)

4. `npm link`将配置好的本地模块连接到`npm`的标准模块里
5. `yo vue `  (可以省略`generator-`前缀)，执行这命令就可以按照配置好的模板配置一个`JavaScript`开发环境



### 第二步，Build工具

#### Webpack

Webpack 最初是为Node设计的一款打包工具，是完全针对JavaScript的，它能将一个Node代码打包成一个浏览器的代码。

下面这份是`webpack.config.js`的代码，用于`Webpack`打包配置

```javascript
const webpack = require('webpack'); //to access built-in plugins
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: "./src/main.js", // 入口文件
    module: {
      // Build 规则配置
        rules: [{
                test: /\.vue$/,
                use: 'vue-loader'
            },
            {
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    'css-loader'
                ]
            }
        ]
    },
    plugins: [
      // webpack 插件配置
        new VueLoaderPlugin(),
        new CopyPlugin({
            patterns: [
                { from: 'src/*.html', to: '[name].[ext]' }
            ],
        })
    ]
};
```

*`Webpack`核心机制 --`loader`，`loader`配置在`module`里的`rules` 中*

`loader`是一个纯粹的文本转换，`Webpack`会根据`import`语句或`require`函数，加载对应的文件

然后通过`test`规则，决定哪些后缀名文件采用哪些`loader`

#### Babel

`Babel`是完全独立于`Webpack`的一个独立系统，它的功能是将新版本的JavaScript编译成老版本的JavaScript。

* 全局安装`babel`，执行命令`npm install -g @babel/core @babel/cli`
* 配置`babel`文件`.babelrc`

```
{
    "presets": ["@babel/preset-env"]
}
```

* `npm install --save-dev @babel/preset-env`安装`@babel/preset-env`

* 执行`babel 文件路径`，例如`babel ./src/sample.js`将`sample.js`的内容转换成低版本JavaScript

以上是`babel`独立使用的方式，更多的时候会结合`webpack`使用，这时候用的是`babel-loader`，在build过程中，对每个js文件都进行转换。



#### 本周学习内容

* 初始化工具Yeoman
* Webpack基本知识
* Babel基本知识

#### 参考资料

[Yeoman文档](https://yeoman.io/authoring/index.html)

[Webpack v4 文档](https://v4.webpack.js.org/concepts/)

[Babel文档](https://babeljs.io/docs/en/)


```

```