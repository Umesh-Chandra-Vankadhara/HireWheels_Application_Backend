const Vehicle = require("../model/vehicle");
const Booking = require("../model/booking");

async function fetchVehicles(req,res) {
  try {
    const [
      categoryName,
      requestedPickUpDate,
      requestedDropDate,
      locationId,
    ] = req.query;

    const bookedVehicles = await Booking.find({
      pickUpDate: { $gt: requestedPickUpDate, $lt: requestedDropDate },
    }).select("_id");
    const availableVehicles = await Vehicle.find({
      vehicleSubcategory: categoryName,
      location: locationId,
      _id: { $nin: bookedVehicles },
    });

    res.send(availableVehicles);
  } catch (error) {
    res.send(error);
  }
}


async function addVehicle(req,res){
    try{
        const vehicle=new Vehicle(req.body)
        const savedVehicle=await vehicle.save()
        res.send(savedVehicle)
    }
    catch(ex){
        res.status(400).send(ex.message)
    }
}

module.exports = { fetchVehicles,addVehicle };
