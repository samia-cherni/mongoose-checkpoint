const url=process.env.MONGO_URI;
console.log('connecting to',url)
const mongoose = require("mongoose");
const Connect = async() => {
  try {
    await mongoose
    .connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log('success! connected to MongoDB ATLAS')
  } catch (error) {
    console.log('error connecting to MongoDB ATLAS:', error.message)
  }
}
module.exports = Connect;