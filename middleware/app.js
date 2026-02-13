import express from "express";
import HttpError from "./middleware/HttpError.js";
import checkRoll from "./middleware/checkRoll.js";
import helmet from "helmet";



const app = express();

// application level

app.use(express.json());

app.get("/", (req, res)=> {
    res.status(200, json("hello from server"))
})


// route middleware

app.use(helmet());


app.use("/admin", checkRoll, (req, res)=> [
    res.status(200, json("welcome to admin panel"))
])


// undefined routes handling

app.use((req, res, next) => {
  next(new HttpError(" route not found", 404));
});

// centralize error handling


app.use((error, req, res, next) => {
  if (req.headersSent) {
    next(error);
  }
  res
    .status(error.statusCode || 500)
    .json({ message: error.message || "internal server error" });
});

const port = 5000;

app.listen(port, () => {
  console.log("server listening on port", port);
});