const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: mongoose.SchemaTypes.String,
      required: true,
      lowercase: true
    },
    email: {
      type: mongoose.SchemaTypes.String,
      required: true,
      lowercase: true
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
      required: true,
      lowercase: true
    },
    address: {
      type: mongoose.SchemaTypes.String,
      required: true,
      lowercase: true
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
    review: {
      type: mongoose.SchemaTypes.String,
      required: true
    },
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      ref: "User"
    },
    pub: {
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
