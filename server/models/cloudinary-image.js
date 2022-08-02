const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// schema to store in mongo db databse
const imageSchema = new Schema({
  url: { type: String, required: true },
  cloudinaryId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("CloudinaryImage", imageSchema);
