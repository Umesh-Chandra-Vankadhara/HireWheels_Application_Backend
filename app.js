const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const cors=require('cors')
const url =
  `mongodb://umeshchandra:${config.get("mongoPass")}@cluster0-shard-00-00.41mlf.mongodb.net:27017,cluster0-shard-00-01.41mlf.mongodb.net:27017,cluster0-shard-00-02.41mlf.mongodb.net:27017/hirewheels?authSource=admin&replicaSet=atlas-10fd6h-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true`;

const { TOKEN ,AUTHORIZATION} = require("./constants.js");
const router = require("./routes/index.js");

const app = express();

//middleware
app.use(express.json());
app.use(cors())
const corsOptions={
  exposedHeaders:[TOKEN,AUTHORIZATION]
}
app.use(cors(corsOptions))
app.use(router);


mongoose
  .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to Database");
  })
  .catch((error) => console.log(error));

app.listen(config.get("port"), () => {
  console.log(`server has started at port ${config.get("port")}`);
})
