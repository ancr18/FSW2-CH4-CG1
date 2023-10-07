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
    imageUrl: {
      type: String,
      required: [true, "Image is required"],
      default:
        "https://tse2.mm.bing.net/th?id=OIP.U2iQ7wNK6ZzTW_traW_-PQHaHa&pid=Api&P=0&h=180",
    },
  },
  {
    timestamps: true,
  }
)

const Car = mongoose.model("Car", carSchema)

module.exports = Car
