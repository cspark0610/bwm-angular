const { Booking } = require("../models/booking");
const mongoose = require("mongoose");
mongoose.Promise = require("bluebird");
const moment = require("moment");

function checkIfBookingDatesAreVaslid(booking) {
  let isValid = true;
  if (!booking.startAt || !booking.endAt) {
    isValid = false;
  }
  if (moment(booking.startAt) > moment(booking.endAt)) {
    isValid = false;
  }
  return isValid;
}

function checkIfBookingFoundIsValid(pendingBooking, rentalBookings) {
  let isValid = true;
  if (rentalBookings) {
    isValid = rentalBookings.every((booking) => {
      const pendingStart = moment(pendingBooking.startAt);
      const pendingEnd = moment(pendingBooking.endAt);

      const bookingStart = moment(booking.startAt);
      const bookingEnd = moment(booking.endAt);

      return (
        (bookingStart < pendingStart && bookingEnd < pendingStart) ||
        (pendingEnd < bookingEnd && pendingEnd < bookingStart)
      );
    });
  }

  return isValid;
}

exports.createBooking = async (req, res) => {
  const bookingData = req.body;
  const booking = new Booking({ ...bookingData, user: res.locals.user });

  if (!checkIfBookingDatesAreVaslid(booking)) {
    return res.sendApiError({
      title: "Invalid Booking",
      detail: "Booking dates are invalid",
    });
  }

  const rentalBookings = await Booking.find({
    rental: bookingData.rental,
  }).exec();

  const isValid = checkIfBookingFoundIsValid(booking, rentalBookings);
  if (!isValid) {
    return res.sendApiError({
      title: "Invalid Booking to create",
      detail: "Invalid Booking to create",
    });
  }
  const savedBooking = await booking.save();
  if (!savedBooking) return res.mongoError(res);

  return res.json({ message: "booking is Not created" });
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
