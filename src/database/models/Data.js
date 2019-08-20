const mongoose = require('mongoose')

const DataSchema = new mongoose.Schema({
  buoy: String,
  location: String,
  type: String,
  value: Number,
  timeStamp: Number,
})

module.exports = mongoose.model('Data', DataSchema)