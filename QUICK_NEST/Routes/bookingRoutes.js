import express from "express";
import auth from "../middleware/auth.js"
import bookingController from "../controller/bookingController.js";


const router = express.Router();

router.post("/create", auth, bookingController.createBooking);

// get all booking

router.get("/allBookings", auth, bookingController.getAllBookings);

router.get(
  "/allBookingByService/:id",
  auth,
  bookingController.getBookingByService,
);

router.get("/user", auth, bookingController.bookingByUserId)

export default router;             