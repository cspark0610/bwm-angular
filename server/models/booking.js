const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
  startAt: { type: Date, required: "Strating date is required YYYY/MM/DD" },
  endAt: { type: Date, required: "Ending date is required YYYY/MM/DD" },
  price: { type: Number, required: "Price is required" },
  nights: { type: Number, required: "Number of nights is required" },
  guests: { type: Number, required: "Guests is required" },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  rental: { type: Schema.Types.ObjectId, ref: "Rental", required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Booking", bookingSchema);
