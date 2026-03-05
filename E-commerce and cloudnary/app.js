import dotenv from 'dotenv';

dotenv.config({ path: "./.env" });

import express from 'express';
import cors from 'cors';


const app = express();

app.use(cors())
app.use(express.json())


app.use("/products", productsRouter);

console.log("port", process.env.PORT);

app.get("/", (req, res) => {
  res.status(200).json("hello from server!!!!!");
});

app.use((req, res, next) => {
  next(new HttpError("requested route not found", 404));
});

app.use((error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }

  res
    .status(error.statusCode || 500)
    .json({ message: error.message || "internal server error" });
});


async function startServer() {
  try {
    await connectDB();

    const port = process.env.PORT || 5000;

    app.listen(port, () => {
      console.log(`server listening on port`, port);
    });
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
}

startServer();