const http = require('http')
const fs = require('fs')

const server = http.createServer((req, res)=>{
    // 规范化url，去掉查询字符串、可选的反斜杠，并把它变成小写
    const path = req.url.replace(/\/?(?:\?.*)?$/, '').toLowerCase()
    switch(path) {
        case '':
            serveStaticFile(res, '/public/home.html', 'text/html')
            break
        case '/about':
            serveStaticFile(res, '/public/about.html', 'text/html')
            break
        case '/img/logo.png':
            serveStaticFile(res, '/public/img/logo.png', 'image/jpeg')
            break
        default:
            serveStaticFile(res, '/public/404.html', 'text/html', 404)
    }
})

server.listen(3000, ()=>{
    console.log('Server running at http://127.0.0.1:3000')
})

function serveStaticFile(res, path, contentType, responseCode) {
    if ( !responseCode ) responseCode = 200
    fs.readFile(__dirname + path, function(err, data){
        if ( err ) {
            res.writeHead(500, {'Content-Type': 'text/plain'})
            res.end('500 - Internal Error')
        } else {
            res.writeHead(responseCode, {'Content-Type': contentType})
            res.end(data)
        }
    })
}