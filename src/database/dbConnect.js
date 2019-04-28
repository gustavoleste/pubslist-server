const mongoose = require("mongoose");

const connect = async database => {
  try {
    await mongoose.connect(`${process.env.MONGODB_ADDRESS}${database}`, {
      useNewUrlParser: true
    });
  } catch (err) {
    throw err;
  }
};

module.exports = connect;
