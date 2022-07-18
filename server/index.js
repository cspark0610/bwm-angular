const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 4001;
// require rentals routes
const rentalRoutes = require("./routes/rentals");
// mongo Connection config
const mongoose = require("mongoose");
const config = require("./config/dev");

// connect to mongo
mongoose.connect(
  config.mongoURI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Connected to MongoDB");
  }
);
// json middleware
app.use(bodyParser.json());

// Api Routes
app.use("/api/v1/rentals", rentalRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
