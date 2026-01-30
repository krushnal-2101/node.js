import http from "http";
import fs from "fs";

const server = http.createServer((req, res) => {
  fs.readFile("index.html", (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end("file not found");
    } else {
      res.writeHead(200, { "content-type": "text/html" });
      res.end(data);
    }
  });
});

const port = 5000;

server.listen(port, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("server running on port", port);
  }
});