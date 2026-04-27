import dotenv from "dotenv";
import express from "express";
import HttpError from "./middleware/HttpError.js";
import connectDB from "./config/db.js";
import userRouter from "./Routes/userRoutes.js";
import adminRoutes from "./Routes/adminRoutes.js"
import bookingRoutes from "./Routes/bookingRoutes.js";
import providerRoutes from "./Routes/providerRoutes.js"
import helmet from "helmet";
import hpp from "hpp";


dotenv.config({ path: "./.env" });

import dns from "dns"
import {rateLimit} from "express-rate-limit";


dns.setServers(["1.1.1.1","8.8.8.8"])


const app = express();

app.use(express.json());



// convert json data

app.use(rateLimit())

app.use(helmet())

app.use(hpp())





app.use("/user", userRouter);

app.use("/admin", adminRoutes);

app.use("/booking", bookingRoutes);

app.use('/provider', providerRoutes)

app.get("/", (req, res) => {
  res.json("hello from server");
});

app.use(( req, res, next) => {
  return next(new HttpError("requested route not found", 404));
});


app.use((error, req, res, next) => {
  if (res.headersSent) {
    next(error);
  }
  res
    .status(error.statusCode || 500)
    .json(error.message || "internal server error");
});

const port = process.env.PORT || 5000;

console.log("port", port);

async function startServer() {
  try {
    await connectDB();

    app.listen(port, () => {
      console.log(`server listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
    process.exit(1);  
  }
}
startServer();



