const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 4001;
// require routes
const rentalRoutes = require("./routes/rentals");
const userRoutes = require("./routes/users");
// mongo Connection config
const mongoose = require("mongoose");
const config = require("./config/dev");
const { onlyAuthUser } = require("./middlewares/auth");
const { provideErrorHandler } = require("./middlewares/handle-errors");

// connect to mongo
mongoose.connect(
  config.mongoURI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Connected to MongoDB");
  }
);

// middlewares
app.use(bodyParser.json());
app.use(provideErrorHandler);

///// protected routes /////

app.get("/api/v1/secret", onlyAuthUser, (req, res) => {
  const user = res.locals.user;
  return res.json({ message: `Super secret message to: ${user.username}` });
});

// Api Routes
app.use("/api/v1/rentals", rentalRoutes);
app.use("/api/v1/users", userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
