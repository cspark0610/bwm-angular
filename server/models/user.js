const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;

const emailPattern =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    maxlength: [64, "Invalid length! Maximum is 64 characters"],
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
    match: [emailPattern],
  },
  password: {
    type: String,
    required: "Password is required",
    minlength: [6, "Invalid length! Minimum is 6 characters"],
    maxlength: [32, "Invalid length! Maximum is 32 characters"],
  },
});

userSchema.pre("save", function (next) {
  const user = this;
  // this: mongoose document created

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(user.password, salt, (err, hash) => {
      user.password = hash;
      next();
    });
  });
});

// method accesible in user instance
userSchema.methods.hasSamePassword = function (providedPassword) {
  // this: user instance found in db
  return bcrypt.compareSync(providedPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
