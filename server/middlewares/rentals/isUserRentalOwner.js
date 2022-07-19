const Rental = require("../models/rental");

// va a ser usado en el controller de booking para validar que el usuario que quiere hacer una reserva no sea el owner del rental
exports.isUserRentalOwner = (req, res, next) => {
  const { rental } = req.body;

  const user = res.locals.user;

  Rental.findById(rental._id, (error, foundRental) => {
    if (error) return res.mongoError(error);
    if (foundRental.user.toString() !== user._id.toString()) {
      return res
        .status(422)
        .json({ error: "You are not the owner of this rental" });
    }
    next();
  });
};
