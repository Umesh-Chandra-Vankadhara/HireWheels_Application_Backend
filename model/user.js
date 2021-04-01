const mongoose = require("mongoose");

const User = mongoose.model('user',
  new mongoose.Schema({
    firstName: {
      type: String,
      required: true,
      minLength: 5,
      maxLength: 50,
    },
    lastName: {
      type: String,
      required: true,
      minLength: 5,
      maxLength: 50,
    },
    email: {
      type: String,
      required: true,
      minLength: 5,
      maxLength: 255,
      unique: true,
    },
    mobileNumber: {
      type: Number,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    walletMoney: {
      type: Number,
      default: 0,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  })
);
module.exports = { User };
