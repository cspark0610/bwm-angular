const Rental = require("../models/rental");

exports.getRentals = (req, res) => {
  Rental.find({}, (error, rentals) => {
    if (error) return res.mongoError(error);
    res.json(rentals);
  });
};

exports.getRentalById = (req, res) => {
  const { id } = req.params;
  Rental.findById(id, (error, rental) => {
    if (error) return res.mongoError(error);
    res.json(rental);
  });
};

exports.createRental = (req, res) => {
  const body = req.body;
  // 1) crear una instancia del modelo y luego hacer un .save()

  // const newRental = new Rental(body);
  // newRental.save((error) => {
  //   if (error) return res.status(422).json({ error });
  //   res.json({
  //     message: `Rental with id: ${newRental._id} created successfully`,
  //   });
  // });

  // 2) agregar usar directamente el .create()
  Rental.create(body, (error, rental) => {
    if (error) return res.mongoError(error);
    res.json({
      message: `Rental with id: ${rental._id} created successfully`,
    });
  });
};

exports.deleteRental = (req, res) => {
  const { id } = req.params;
  // const rIndex = rentals.findIndex((r) => r._id == id);
  // rentals.splice(rIndex, 1);

  Rental.findByIdAndRemove(id, (error, rental) => {
    if (error) return res.mongoError(error);
    res.json({ message: `Rental with id: ${id} was removed!` });
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
