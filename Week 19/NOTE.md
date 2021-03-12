## 学习笔记

课程发布系统结构图：

[![发布系统结构图](https://s3.ax1x.com/2021/03/12/6UZyQJ.md.png)](https://imgtu.com/i/6UZyQJ)

### 利用Express，实现一个简单的Server(静态服务器)

以下命令在终端操作

```shell
mkdir server ## 创建一个文件夹，名为server
cd server ## 进入server文件夹目录
npx express-generator ## 通过express-generator进行初始化项目(注意当前路径是在server文件夹目录下)
npm install ## 安装需要的依赖(注意当前路径是在server文件夹目录下)
```

准备工作完成后，可以将`server`文件夹里的`routes`、`view`文件夹以及`app.js`里的相关代码删除，只需要利用`public`文件夹的代码就可以完成一个简单的Server工作了，一个纯粹的静态服务器。这Server负责线上服务。

`app.js`删除相关代码后的完整代码如下：

```javascript
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
```

`app.js`处理完后，基本不需要再修改就可以满足本周学习任务了。

 ### 实现一个Publish-Server 

Publish-Server 负责接收客户端(publish-tool)发送的文件以及将文件复制到线上服务器的工作。

`server.js`部分代码

```javascript
let http = require("http");
let unzipper = require("unzipper");

http.createServer(function (request, response) {
		// 解压文件并复制到本地服务器,注意这是测试整个发布链路
		request.pipe(unzipper.Extract({ path: '../server/public/' }));
}).listen(8082);
```



### 实现Publish-Tool

Publish-Server 负责将项目文件(多文件会进行压缩)发送到Publish-Server。

`publish.js`部分代码

```javascript
let http = require("http");
let archiver = require("archiver");

let request = http.request({
    hostname: "127.0.0.1",
    port: 8082,
    method: "POST",
    headers: {
        'Content-Type': 'application/octet-stream',
    }
}, response => {
    console.log(response);
});

const archive = archiver('zip', {
    zlib: { level: 9 } // Sets the compression level.
});

archive.directory('./sample/', false);
archive.finalize();
archive.pipe(request);
```

### 通过Github OAuth 实现一个登录实例

改造`server.js`

```javascript
let http = require("http");
let https = require("https");
let unzipper = require("unzipper");
let querystring = require('querystring');

// 2. auth路由：接收code,用code+client_id+client_secret请求获得token

function auth(request, response) {
    let query = querystring.parse(request.url.match(/^\/auth\?([\s\S]+)$/)[1]);
    getToken(query.code, function (info) {
      // 通过<a></a>标签将标签回传给publish-tool
        response.write(`<a href='http://localhost:8083/?token=${info.access_token}'>publish</a>`)
        response.end();
    });
}

function getToken(code, callback) {
  // 省略部分代码
    let request = https.request({
        hostname: "github.com",
        path: `/login/oauth/access_token?code=${code}&client_id=${client_id}&client_secret=${client_secret}`,
        port: 443,
        method: "POST"
    }, function (response) {
        let body = "";
        response.on('data', chunk => {
            body += (chunk.toString());
        })
        response.on('end', chunk => {
            callback(querystring.parse(body));
        })
    });
    request.end();
}

// 4. publish路由：用token获取用户信息，检查权限，接受发布

function publish(request, response) {
    let query = querystring.parse(request.url.match(/^\/publish\?([\s\S]+)$/)[1]);
    if (query.token.length > 0) {
        getUser(query.token, info => {
            if (info.login === "Sammmmmmm") {
                request.pipe(unzipper.Extract({ path: '../server/public/' }));
                request.on('end', function () {
                    response.end("success !");
                })  
            }
        });
    }
}

function getUser(token, callback) {

    let request = https.request({
        hostname: "api.github.com",
        path: `/user`,
        port: 443,
        method: "GET",
        headers: {
            Authorization: `token ${token}`,
            "User-Agent": 'toy-publish-by-samdev'
        }
    }, function (response) {
        let body = "";
        response.on('data', chunk => {
            body += (chunk.toString());
        })
        response.on('end', chunk => {
            callback(JSON.parse(body));
        })
    });
    request.end();
}

http.createServer(function (request, response) {

    if (request.url.match(/^\/auth\?/)) {
        return auth(request, response);
    }
    if (request.url.match(/^\/publish\?/)) {
        return publish(request, response);
    }

}).listen(8082);
```

改造`publish.js`

```javascript
let http = require("http");
let archiver = require("archiver");
let child_process = require("child_process");
let querystring = require("querystring");

// 1. 打开 https://github.com/login/oauth/authorize，获取code

child_process.exec(`open https://github.com/login/oauth/authorize?client_id=${client_id}`);

// 3. 再创建一个server，接收token，后点击发布，将文件传到publish-server
http.createServer(function (request, response){
    let query = querystring.parse(request.url.match(/^\/\?([\s\S]+)$/)[1]);
    pubulish(query.token);
}).listen(8083);

function pubulish(token) {
    let request = http.request({
        hostname: "127.0.0.1",
        port: 8082,
        method: "POST",
        path: "/publish?token=" + token,
        headers: {
            'Content-Type': 'application/octet-stream',
        }
    }, response => {
        console.log(response);
    });
    
    const archive = archiver('zip', {
        zlib: { level: 9 } // Sets the compression level.
    });
  
    archive.directory('./sample/', false);
    archive.finalize();
    archive.pipe(request);
}
```

改造之后，就可以利用Github的用户信息，做个简单的用户鉴权，从而控制发布权限。

### 本周学习内容

* 实现一个发布系统
  * 通过Express搭建一个Web server
  * 编写一个Publish server
  * 编写一个Publish server
  * 通过Github OAuth 实现一个登录实例

### 参考资料

[Installing Express](https://expressjs.com/en/starter/installing.html)

[Stream | Node.js v13.14.0 Documentation](https://nodejs.org/docs/latest-v13.x/api/stream.html#stream_class_stream_readable)

[Authorizing OAuth Apps - GitHub Docs](https://docs.github.com/en/developers/apps/authorizing-oauth-apps)

