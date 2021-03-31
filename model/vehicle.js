const {
  CAR,
  BIKE,
  PETROL,
  CNG,
  DIESEL,
  SEDAN,
  HATCHBACK,
  SUV
  DIRTBIKE,
  SPORTSBIKE,
} = require("../constants");

const mongoose = require(mongoose);

const Vehicle = mongoose.model('vehicle',
  new Schema({
    vehicleModel: {
      type: String,
      required: true,
    },
    vehicleNumber: {
      type: String,
      required: true,
      unique: true,
    },
    vehicleOwner: {
      type: String,
      required: true,
    },
    vehicleType: {
      type: String,
      enum: [CAR, BIKE],
    },
    fuelType: {
      type: String,
      enum: [PETROL, CNG, DIESEL],
    },
    vehicleColor:{
        type:String,
        required:true
    },
    imageURL:{
        type:String,
        required:true
    },
    vehicleSubcategory: {
      validate: {
        validator: function (value) {
          if (this.vehicleType === CAR) {
            return [SEDAN, HATCHBACK, SUV].includes(value);
          } else if (this.vehicleType === BIKE) {
            return [DIRTBIKE, SPORTSBIKE].includes(value);
          }
        },
      },
    },
    location: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "location",
    },
    pricePerHour:{
        type:Number,
        required:true
    }
  })
);

module.exports = { Vehicle };
