const mongoose = require("mongoose");
const config = require("../config/dev");
const FakeDB = require("./FakeDb");

mongoose.connect(
  config.mongoURI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  async () => {
    const fakeDB = new FakeDB();
    console.log("starting to populating DB");
    await fakeDB.populate();
    await mongoose.connection.close();
    console.log("DB has been populated");
  }
);
