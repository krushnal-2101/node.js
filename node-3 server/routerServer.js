import http from "http";

const server = http
  .createServer((req, res) => {
    if (req.url === "/") {
      res.end("this is home page");
    } else if (req.url === "/about") {
      res.end("this is about page");
    } else {
      res.end("page not found");
    }
  })


server.listen(5000, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("server running port 5000");
  }
});