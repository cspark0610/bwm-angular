const express = require("express");
const router = express.Router();
const {
  createBooking,
  getBookings,
  getUserBookings,
  getRecievedBookings,
  deleteBooking,
} = require("../controllers/bookings");
const {
  isUserRentalOwner,
} = require("../middlewares/rentals/isUserRentalOwner");
const { onlyAuthUser } = require("../middlewares/auth");

router.get("/", getBookings);
router.get("/me", onlyAuthUser, getUserBookings);
router.get("/recieved", onlyAuthUser, getRecievedBookings);
router.post("/", onlyAuthUser, isUserRentalOwner, createBooking);
router.delete("/:id", onlyAuthUser, deleteBooking);

module.exports = router;
