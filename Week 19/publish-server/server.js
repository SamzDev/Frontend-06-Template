let http = require('http');

http.createServer(function (request, response) {
    console.log(request.headers);
    request.on('data', chunk => {
        console.log(chunk.toString());
    });
    request.on('end', chunk => {
        response.end("publish server --> success");
    });
}).listen(3000);