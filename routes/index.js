const express=require('express');
const { createBooking } = require('../controllers/bookingController');
const { signUp, signIn } = require('../controllers/userController');
const { fetchVehicles, addVehicle } = require('../controllers/vehicleController');
const admin = require('../middleware/admin');
const router=express.Router()
const auth=require('../middleware/auth')



//user auth API
router.post('/hirewheels/v1/users/access-token',signIn)
router.post('/hirewheels/v1/users', signUp);


//vehicle API
router.get('/hirewheels/v1/vehicles',auth,fetchVehicles)
router.post('/hirewheels/v1/vehicles',admin,addVehicle)

//booking 
router.post('/hirewheels/v1/bookings',auth,createBooking) 



module.exports=router

















