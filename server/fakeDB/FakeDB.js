const rentals = require("./data/rentals-populate");
const users = require("./data/users-populate");
const Rental = require("../models/rental");
const User = require("../models/user");

class FakeDB {
  async clean() {
    return Promise.all([Rental.deleteMany({}), User.deleteMany({})]);
  }

  async addData() {
    return Promise.all([Rental.create(rentals), User.create(users)]);
  }

  async populate() {
    return Promise.all([this.clean(), this.addData()]);
  }
}

module.exports = FakeDB;
