const Booking = require("../models/booking");
const Rental = require("../models/rental");
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

const createQueryDates = (st, et) => {
  let queryDates;
  if (st && et) {
    queryDates = {
      date: { $gte: st, $lte: et },
    };
  } else if (st && !et) {
    queryDates = { $expr: { $gte: ["startAt", st] } };
    // queryDates = { date: { $gte: st } };
  } else if (!st && et) {
    // queryDates = { $expr: { $gte: ["endAt", et] } };
    queryDates = { date: { $lte: et } };
  } else {
    queryDates = {};
  }
  return queryDates;
};

exports.getBookings = async (req, res) => {
  const queryDates = createQueryDates(req.query.startAt, req.query.endAt);
  console.log(queryDates);
  const bookings = await Booking.find(queryDates).exec();
  if (!bookings) return res.mongoError(res);
  return res.json(bookings);
};

exports.getUserBookings = async (req, res) => {
  const { user } = res.locals;

  const userBookings = await Booking.find({ user: user._id })
    //"-password" popular todos los campos menos el del password
    .populate("user", "-password")
    .populate("rental")
    .exec();

  if (!userBookings) return res.mongoError(res);
  return res.json(userBookings);
};

// as rental owner i want to recieve all booking made of my rental place
exports.getRecievedBookings = async (req, res) => {
  const { user } = res.locals;

  // 1st find all rentals only select rentlas ID ,where owner is user logged in
  const rentals = await Rental.find({ owner: user._id }).select("_id").exec();
  // [ { _id: new ObjectId("62d706d609241873ae4195f4") } ]

  const rentalsIds = rentals.map((rental) => rental._id);
  // [ new ObjectId("62d706d609241873ae4195f4") ]

  // find me all bookings where rental is included rentalsIds array
  const bookings = await Booking.find({ rental: { $in: rentalsIds } })
    .populate("user", "-password")
    .populate("rental")
    .exec();

  if (!rentals) return res.mongoError(res);
  res.json(bookings);
};

exports.deleteBooking = async (req, res) => {
  const DAYS_THRESHOLD = 2;
  const id = req.params.id;
  const { user } = res.locals;

  const bookingToDelete = await Booking.findById(id).populate("user").exec();
  if (!bookingToDelete) return res.mongoError(res);

  if (bookingToDelete.user._id.toString() !== user._id.toString()) {
    return res.sendApiError({
      title: "Invalid User",
      detail: "You are not the owner of this booking to delete",
    });
  }

  const daysDiffernce = Math.abs(
    moment().diff(moment(bookingToDelete.startAt), "days")
  );
  if (daysDiffernce <= DAYS_THRESHOLD) {
    return res.sendApiError({
      title: "Invalid Booking",
      detail: "You can not delete a booking at least 2 days before it starts",
    });
  }

  await Booking.findByIdAndDelete(id);
  res.json({
    message: `Booking with id : ${id} was successfully deleted`,
  });
};
