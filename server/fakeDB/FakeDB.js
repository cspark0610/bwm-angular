const rentals = require("./data/rentals-populate");
const users = require("./data/users-populate");
const Rental = require("../models/rental");
const User = require("../models/user");

class FakeDB {
  async clean() {
    await Rental.deleteMany({});
    await User.deleteMany({});
  }

  async addData() {
    await Rental.create(rentals);
    await User.create(users);
  }

  async populate() {
    await this.clean();
    await this.addData();
  }
}

module.exports = FakeDB;
