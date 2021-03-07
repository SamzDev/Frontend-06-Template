## 学习笔记

[承接上周笔记](https://github.com/SamzDev/Frontend-06-Template/tree/main/Week%2017/NOTE.md)，这周的学习任务是测试工具

### 第三步，Test工具

非一次性的业务代码，建议尽量使用单元测试，保障代码稳定性。

#### 单元测试--`Mocha`

`Mocha`是目前比较流行的测试框架之一(还有一个`Jest`)。`Mocha`最早也是一个针对Node.js的测试框架，所以默认在使用`Webpack`之前，都不支持`import` 、`export`的。

1. 安装`Mocha`

   全局安装`npm install --global mocha`

   局部安装`npm install --save-dev mocha`

2. 安装`babel/register`

   为了解决`Mocha`在使用`Webpack`之前，都不支持`import` 、`export`的问题，需用用到`babel/register`

   安装方式：`npm install --save-dev @babel/core @babel/register`

   通过`.babelrc`文件配置`JavaScript`代码转换方式

   ```zsh
   {
       "presets": ["@babel/preset-env"],
   }
   ```

   

3. 使用`mocha --require @babel/register`命令执行测试

   如果用全局的`mocha`命令会出现`MODULE_FOUND`，所以建议用以下命令，调用本地的`mocha`

   `./node_modules/.bin/mocha --require @babel/register`

#### 代码覆盖(code coverage) -- `nyc`

代码覆盖(code coverage)，表示测试覆盖了源文件的哪些代码。`nyc`是`istanbuljs`的命令行工具，可用于coverage，它可以在一个复杂的文件里计算最终测试的覆盖比例。

1. 安装`nyc`

   安装方式：`npm install --save-dev nyc`

2. 使用`nyc`

   `nyc ./node_modules/.bin/mocha`
   
3. 让`nyc`支持`babel`

   * 安装`babel-plugin-istanbul`

   * 配置`.babelrc`文件
   
   ```zsh
   {
       "presets": ["@babel/preset-env"],
       "plugins": ["istanbul"]
   }
   ```
   
   * 配置`.nycrc`文件
   
   ```zsh
   {
       "extends": "@istanbuljs/nyc-config-babel"
   }
   ```
   
   * 最后执行`nyc ./node_modules/.bin/mocha --require @babel/register`就可以正常通过`babel`解决了不支持`import` 、`export`的问题，同时又能进行代码覆盖测试

#### 所有工具与generator集成

将脚手架(generator)、构建(build)、测试(test)三个工具都整合到一起。

以下是`index.js` 的部分代码

```javascript
var Generator = require('yeoman-generator');

module.exports = class extends Generator {
    // The name `constructor` is important here
    constructor(args, opts) {
        // Calling the super constructor is important so our generator is correctly set up
        super(args, opts);

    }

    async initPackage() {

        let answer = await this.prompt([
            {
                type: "input",
                name: "name",
                message: "Your project name",
                default: this.appname // Default to current folder name
            }
        ]);

        const pkgJson = {
            "name": answer.name,
            "version": "1.0.0",
            "description": "",
            "main": "generators/app/index.js",
            "scripts": {
              // 配置要运行的脚本命令，npm run build/test/coverage就会执行对应的命令
                "build": "webpack",
                "test": "mocha --require @babel/register",
                "coverage": "nyc mocha --require @babel/register"
            },
            // 省略部分代码
        };
      
        // Extend or create package.json file in destination path
        this.fs.extendJSON(this.destinationPath('package.json'), pkgJson);
        this.npmInstall(["vue"], { 'save-dev': false});
      	// 配置好需要package，可以指定版本 
        this.npmInstall([
            "webpack@4.44.1",
            "webpack-cli@3.3.12",
            "vue-loader@15.9.3",
            "vue-style-loader@4.1.2",
            "babel-loader@8.1.0",
            "@babel/core@7.11.6",
            "@babel/preset-env@7.11.5",
            "@babel/register@7.11.5",
            "@istanbuljs/nyc-config-babel@3.0.0",
            "babel-plugin-istanbul@6.0.0",
            "mocha@8.1.3",
            "nyc@15.1.0",
            "css-loader@4.2.2",
            "vue-template-compiler@2.6.12",
            "copy-webpack-plugin@6.0.3"],
            { 'save-dev': true}
        );

        this.fs.copyTpl(
            this.templatePath('HelloWorld.vue'),
            this.destinationPath('src/HelloWorld.vue'),
            {}
        );

        // 省略部分代码
};
```

在上周的基础上，将`.nycrc`和`.babelrc`两个配置文件添加进`templates`里并通过`fs.copyTpl`复制到生成的项目中，再按照以上`index.js`配置好需要的`packages` 以及`scripts`就完成了整个工具链的集成了。通过这个工具生成的项目就包含了基本的项目资源以及build、test功能。

#### 本周学习内容

* 单元测试工具--Mocha
* 代码覆盖(code coverage) -- nyc
* 所有工具与generator的集成

#### 参考资料

[Mocha官网](https://mochajs.org/)

[nyc - npm](https://www.npmjs.com/package/nyc)