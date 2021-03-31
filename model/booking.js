const mongoose = require("mongoose");

const Booking = mongoose.model(
  "booking",
  new mongoose.Schema({
    pickUpDate: {
      type: Date,
      required: true,
    },
    dropOffDate: {
      type: Date,
      required:true
    },
    bookingDate: {
      type: Date,
      required: true,
    },
    pickUpLocation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "location",
    },
    vehicleNumber: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "vehicle",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    bookingAmount: {
      type: Number,
      required: true,
    },
  })
);

module.exports = { Booking };
