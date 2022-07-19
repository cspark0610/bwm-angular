const { Booking } = require("../models/booking");
const mongoose = require("mongoose");
mongoose.Promise = require("bluebird");

exports.createBooking = (req, res) => {
  const bookingData = req.body;

  return res.json({ message: "booking created" });
};

exports.getBookings = (req, res) => {
  return null;
};

exports.getBooking = (req, res) => {
  return null;
};

exports.updateBooking = (req, res) => {
  return null;
};

exports.deleteBooking = (req, res) => {
  return null;
};
