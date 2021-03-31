const bcrypt=require('bcrypt');

async function generateHash(pwd){
  const hashPassword=await bcrypt.genSalt(10);
  const securedPassword=await bcrypt.hash(pwd,hashPassword)
  return securedPassword;
}

module.exports =generateHash