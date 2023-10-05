const mongoose = require("mongoose")

const carSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
    },
    category: {
      type: String,
      required: [true, "Size is required"],
    },
    // image: {
    //   type: String,
    //   required: [true, "Image is required"],
    // },
  },
  {
    timestamps: true,
  }
)

const Car = mongoose.model("Car", carSchema)

module.exports = Car
