const express = require("express");
const router = express.Router();
const {
  createBooking,
  getBookings,
  getBooking,
  updateBooking,
  deleteBooking,
} = require("../controllers/bookings");

router.get("/", getBookings);
router.get("/:id", getBooking);

router.post("/", createBooking);
router.put("/:id", updateBooking);
router.delete("/:id", deleteBooking);

module.exports = router;
