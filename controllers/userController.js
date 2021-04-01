const bcrypt = require("bcrypt");
const config = require("config");
const jwt = require("jsonwebtoken");
const generateHash = require("../routes/hash");
const _ = require("lodash");
const { bonusAmount, AUTH_TOKEN } = require("../constants");
const { User } = require("../model/user");

async function signUp(req, res) {
  let user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(400).send("Email Already Exists");
  }
  let userMobile = await User.findOne({ mobileNumber: req.body.mobileNumber });
  if (userMobile) {
    return res.status(400).send("Mobile Number Already Exists");
  }

  try {
    const user = new User({
      ...req.body,
      password: await generateHash(req.body.password),
      walletMoney: bonusAmount,
    });
    
    const addedUser = await user.save();
    res
      .status(200)
      .send(
        _.pick(addedUser, [
          "firstName",
          "lastName",
          "email",
          "mobileNumber",
          "walletMoney",
          "isAdmin",
        ])
      );
  } catch (error) {
    res.send(error);
  }
}

async function signIn(req, res) {
  const authCredentials = req.header["Authorization"];
  const decodedString = atob(authCredentials);
  const email = decodedString.split(":")[0];
  const password = decodedString.split(":")[1];
  let user = await User.findOne({ email });
  if (!user) {
    return res.status(401).send("Unauthorized User");
  }

  const verifiedPassword = await bcrypt.compare(password, user.password);

  if (!verifiedPassword) {
    return res.status(401).send("Unauthorized User");
  }
  const token = jwt.sign(
    {
      _id: user.id,
      name: `${user.firstName} ${user.lastName}`,
      mobileNumber: user.mobileNumber,
      isAdmin: user.isAdmin,
    },
    config.get("secretKey")
  );
  res.header(AUTH_TOKEN, token).send({
    firstName: user.firstName,
    walletMoney: user.walletMoney,
    email: user.email,
    isAuthenticated: true,
  });
}

module.exports = { signUp, signIn };
