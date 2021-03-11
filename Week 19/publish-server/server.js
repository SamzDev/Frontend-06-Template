let http = require("http");
let https = require("https");
let unzipper = require("unzipper");
let querystring = require('querystring');


// 2. auth路由：接收code,用code+client_id+client_secret换token

function auth(request, response) {
    let query = querystring.parse(request.url.match(/^\/auth\?([\s\S]+)$/)[1]);
    getToken(query.code, function (info) {
        console.log(info);
        // response.write(JSON.stringify(info));
        response.write(`<a href='http://localhost:8083/?token=${info.access_token}'>publish</a>`)
        response.end();
    });
}

function getToken(code, callback) {
    const client_id = "Iv1.7612dcbeb679b24d";
    const client_secret = "86f44b8ce61f95ea8fe1a105dbf06dd5a32c1b82";

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
        // console.log(response);
    });
    request.end();
}

// 4. publish路由：用token获取用户信息，检查权限，接受发布

function publish(request, response) {
    let query = querystring.parse(request.url.match(/^\/publish\?([\s\S]+)$/)[1]);
    if (query.token.length > 0) {
        getUser(query.token, info => {
            if (info.login === "SamzDev") {
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
            // Accept: "application/vnd.github.v3+json"
        }
    }, function (response) {
        let body = "";
        response.on('data', chunk => {
            body += (chunk.toString());
        })
        response.on('end', chunk => {
            callback(JSON.parse(body));
            // console.log(body);
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

    // console.log("request");
    // let outFile = fs.createWriteStream("../server/public/tmp.zip");
    // request.pipe(outFile);
    // request.pipe(unzipper.Extract({ path: '../server/public/' }));

}).listen(8082);