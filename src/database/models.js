const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: mongoose.SchemaTypes.String,
      required: true
    },
    email: {
      type: mongoose.SchemaTypes.String,
      required: true
    },
    password: {
      type: mongoose.SchemaTypes.String,
      required: true
    }
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

const pubSchema = new Schema(
  {
    name: {
      type: mongoose.SchemaTypes.String,
      required: true
    },
    address: {
      type: mongoose.SchemaTypes.String,
      required: true
    },
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      ref: "User"
    }
  },
  { timestamps: true }
);

const Pub = mongoose.model("Pub", pubSchema);

const reviewSchema = new Schema(
  {
    comment: {
      type: mongoose.SchemaTypes.String,
      required: true
    },
    userID: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      ref: "User"
    },
    pubID: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      ref: "Pub"
    }
  },
  { timestamps: true }
);

const Review = mongoose.model("Review", reviewSchema);

module.exports = {
  User,
  Pub,
  Review
};
