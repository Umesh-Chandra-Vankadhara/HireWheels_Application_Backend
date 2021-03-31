async function createBooking(req, res){
   const user=User.findById(req.params.userId)
   if(user.walletMoney < +req.params.amount)
   {
       return res.status(400).send('insufficient wallet balance')
   }

   try {
       const booking=new Booking(req.body)
       const savedBooking=await booking.save()
       const updatedUser=new User({...user,walletMoney:user.walletMoney - req.params.amount})
       const userResponse=await updatedUser.save()
       return res.send(savedBooking)
   } catch (error) {
       res.status(400).send(error.message);
   }
}

module.exports={createBooking}