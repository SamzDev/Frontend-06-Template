let http = require('http');

let request = http.request({
    hostname: "127.0.0.1",
    port: 3000
}, response => {
    console.log(response);
});

request.end();