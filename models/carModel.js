const mongoose = require("mongoose")

const carSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  rentPerDay: {
    type: Number,
    required: [true, "Price is required"],
  },
  size: {
    type: String,
    required: [true, "Size is required"],
  },
  image: {
    type: String,
    required: [true, "Image is required"],
  },
})

const Car = mongoose.model("Car", carSchema)

module.exports = Car
