import http from 'http';

const server = http.createServer((req, res)=> {
    res.end("Hello from node-1");
})

const port = 30001;

server.listen(port, (err)=> {
    if(err){
        console.log(err);
        return;
    }else{
        console.log("Server is listening on port", port);
    }
})