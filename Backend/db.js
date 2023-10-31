const mongoose = require("mongoose");
const mongooseURI = "mongodb://0.0.0.0:27017/inotebook"

const connectToMongo = async ()=>{
   await mongoose.connect(mongooseURI); 
   console.log("Connected To Mongo Successfully");
}

module.exports = connectToMongo;