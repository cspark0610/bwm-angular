const Rental = require("../models/rental");
const Booking = require("../models/booking");
const mongoose = require("mongoose");
mongoose.Promise = require("bluebird");

exports.getRentals = (req, res) => {
  const queryCity = req.query.city ? { city: req.query.city } : {};
  Rental.find(queryCity, (error, rentals) => {
    if (error) return res.mongoError(error);
    res.json(rentals);
  });
};

// /api/v1/rentals/me , i expect to receive all rentals of the user
exports.getUserRentals = async (req, res) => {
  // recordar que seteamos el user en "res.locals.user" en auth middleware
  const { user } = res.locals;
  const userRentals = await Rental.find({ owner: user._id }).exec();
  if (!userRentals) return res.mongoError(res);

  res.json(userRentals);
};

exports.getRentalById = (req, res) => {
  const { id } = req.params;
  Rental.findById(id, (error, rental) => {
    if (error) return res.mongoError(error);
    res.json(rental);
  });
};

exports.createRental = async (req, res) => {
  const body = req.body;
  // 1) crear una instancia del modelo y luego hacer un .save()

  // const newRental = new Rental(body);
  // newRental.save((error) => {
  //   if (error) return res.status(422).json({ error });
  //   res.json({
  //     message: `Rental with id: ${newRental._id} created successfully`,
  //   });
  // });

  try {
    await Rental.create(body);
    res.json({
      message: `Rental with id: ${body._id} created successfully`,
    });
  } catch (error) {
    res.mongoError(error);
  }
};

exports.deleteRental = async (req, res) => {
  const { id } = req.params;
  const { user } = res.locals;
  const rental = await Rental.findById(id)
    .populate("owner", "-password")
    .exec();
  if (!rental) return res.mongoError(res);
  const bookings = await Booking.find({ rental }).exec();

  if (user._id.toString() !== rental.owner._id.toString()) {
    return res.sendApiError({
      title: "Invalid User",
      detail: "You are not owner of this rental!",
    });
  }

  if (bookings && bookings.length > 0) {
    return res.sendApiError({
      title: "Active Bookings",
      detail: "Cannot delete rental with active booking!",
    });
  }
  await Rental.findByIdAndDelete(id);
  res.json({
    message: `Rental with id: ${id} was deleted successfully`,
  });
};

exports.updateRental = (req, res) => {
  const id = req.params.id;
  // const rentalToUpdate = req.body;
  // const foundRental = rentals.find((r) => r._id == id);
  // Object.assign(foundRental, rentalToUpdate);

  Rental.findByIdAndUpdate(id, req.body, { new: true }, (error, rental) => {
    if (error) return res.mongoError(error);
    res.json({
      message: `Rental with id: ${id} was updated!, new data: ${JSON.stringify(
        rental
      )}`,
    });
  });
};
