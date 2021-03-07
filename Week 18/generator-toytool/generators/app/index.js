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
                "build": "webpack",
                "test": "mocha --require @babel/register",
                "coverage": "nyc mocha --require @babel/register"
            },
            "author": "",
            "license": "ISC",
            "devDependencies": {
              
            },
            "dependencies": {
            }
        };
      
        // Extend or create package.json file in destination path
        this.fs.extendJSON(this.destinationPath('package.json'), pkgJson);
        this.npmInstall(["vue"], { 'save-dev': false});
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

        this.fs.copyTpl(
            this.templatePath('sample-test.js'),
            this.destinationPath('test/sample-test.js')
            
        );

        this.fs.copyTpl(
            this.templatePath('webpack.config.js'),
            this.destinationPath('webpack.config.js')
            
        );

        this.fs.copyTpl(
            this.templatePath('.babelrc'),
            this.destinationPath('.babelrc')
            
        );

        this.fs.copyTpl(
            this.templatePath('.nycrc'),
            this.destinationPath('.nycrc')
            
        );

        this.fs.copyTpl(
            this.templatePath('main.js'),
            this.destinationPath('src/main.js')
            
        );

        this.fs.copyTpl(
            this.templatePath('index.html'),
            this.destinationPath('src/index.html'),
            { title: answer.name }
            
        );
    }
};