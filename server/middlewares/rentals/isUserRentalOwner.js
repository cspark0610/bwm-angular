const Rental = require("../../models/rental");
const mongoose = require("mongoose");
mongoose.Promise = require("bluebird");

// va a ser usado en el controller de booking para validar que el usuario que quiere hacer una reserva no sea el owner del rental
exports.isUserRentalOwner = async (req, res, next) => {
  const { rental } = req.body;
  const user = res.locals.user;

  const foundRental = await Rental.findById(rental).populate("owner").exec();
  console.log(foundRental, "aca");
  if (!foundRental) return res.mongoError(res);

  if (foundRental.owner.id === user.id) {
    return res.sendApiError({
      title: "Invalid User",
      detail: "Cannot create booking on your rental",
    });
  }
  next();
};
