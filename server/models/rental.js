const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const rentalSchema = new Schema({
  title: {
    type: String,
    required: true,
    maxlength: [128, "Invalid length! Maximum is 128 characters"],
  },
  city: { type: String, required: true, lowercase: true },
  street: {
    type: String,
    required: true,
    minlength: [4, "Invalid length! Minimum is 4 characters"],
    lowercase: true,
  },
  category: { type: String, required: true, lowercase: true },
  image: { type: String, required: true },
  numOfRooms: { type: Number, required: true },
  description: { type: String, required: true },
  dailyPrice: { type: Number, required: true },
  owner: { type: Schema.Types.ObjectId, ref: "User" },
  shared: Boolean,
  createdAt: { type: Date, default: Date.now },
});

// error handling with mongoose Schema, custom function
// es accesible desde la instancia de la clase del Schema creado,
// ex : new Rental().sendError(res, { status: 422, detail: "Error" });

// rentalSchema.methods.sendError = function (res, config) {
//   const { detail, status } = config;
//   return res.status(status).json({ status, detail });
// };

// accessing the model from the schema, ex: Rental.sendError(res, { status: 422, detail: "Error" });
rentalSchema.statics.sendError = function (res, config) {
  const { detail, status } = config;
  return res.status(status).json({ status, detail });
};

module.exports = mongoose.model("Rental", rentalSchema);
