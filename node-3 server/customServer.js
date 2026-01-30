import http from "http"

const server = http.createServer((req, res) => {
    res.writeHead(200, {"content-type": "text/html"});
    res.end("<h1>hello server this</h1>")
})

const port = 50001

server.listen(port, ()=> {
    console.log("server running in port", port)
})