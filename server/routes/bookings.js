const express = require("express");
const router = express.Router();
const {
  createBooking,
  getBookings,
  getBooking,
  updateBooking,
  deleteBooking,
} = require("../controllers/bookings");
const {
  isUserRentalOwner,
} = require("../middlewares/rentals/isUserRentalOwner");
const { onlyAuthUser } = require("../middlewares/auth");

router.get("/", getBookings);
router.get("/:id", getBooking);

router.post("/", onlyAuthUser, isUserRentalOwner, createBooking);
router.put("/:id", updateBooking);
router.delete("/:id", deleteBooking);

module.exports = router;
