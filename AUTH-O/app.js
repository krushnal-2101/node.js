import express from "express";
import HttpError from "./middleware/HtttpError";
import connectDB from "./config/db";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res,status(200).json({ message: "hello from server"})
})


app.use((req, res , next) => {
    next(new HttpError("request not found", 404))
})

app.use((error, req, res , next) => {
    if(res.headersSent) {
        next(error)
    }

    res
     .status(error.statusCode || 500)
     .json({ message: error.message || "an unknown error occurred"})
})



const port = 5000;

async function startServer() {
  try {
    await connectDB();

    app.listen(port, () => {
      console.log("server running on port", port);
    });
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
}

startServer();