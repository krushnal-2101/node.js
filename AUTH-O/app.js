import express from "express";
import HttpError from "./middleware/HttpError.js";
import connectDB from "./config/db.js";

import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ message: "hello from server" });
});

app.use((req, res, next) => {
  next(new HttpError("requested route not found", 404));
});

app.use((error, req, res, next) => {
  if (res.headersSent) {
    next(error);
  }

  res
    .status(error.statusCode || 5000)
    .json({ message: error.message || "internal server error " });
});

async function startServer() {
  try {
    await connectDB();

    const port = process.env.PORT || 5000;

    app.listen(port, () => {
      console.log(`server running on port ${port}`);
    });
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
}

startServer();