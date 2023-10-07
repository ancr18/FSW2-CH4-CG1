const Car = require("../models/carModel")
const moment = require("moment")
const imagekit = require("../lib/imagekit")

// view page - list cars
const pageCars = async (req, res) => {
  try {
    const { name, category } = req.query

    const condition = {}
    if (name)
      condition.name = {
        $regex: ".*" + name.toLowerCase() + ".*",
        $options: "i",
      }
    if (category)
      condition.category = {
        $regex: category,
        $options: "i",
      }

    const cars = await Car.find().where(condition)

    cars.forEach((car) => {
      car.updateDateTime = moment(car.updatedAt).format("DD MMM YYYY, HH:mm")
    })

    res.render("index1.ejs", {
      title: "List Cars",
      message: req.flash("message"),
      cars,
    })
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    })
  }
}

// view page - add car
const pageAddCar = (req, res) => {
  res.render("create", {
    title: "Create New Car",
  })
}

// view page edit
const pageEdit = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id)
    res.render("edit", {
      title: "Edit Car",
      car,
    })
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    })
  }
}

// action create new car
const createCar = async (req, res) => {
  const { name, price, category } = req.body
  const file = req.file

  try {
    const split = file.originalname.split(".")
    const extension = split[split.length - 1]

    const img = await imagekit.upload({
      file: file.buffer,
      fileName: `IMG-${Date.now()}.${extension}`,
    })

    await Car.create({ name, price, category, imageUrl: img.url })
    req.flash("message", "Ditambahkan")
    res.redirect("/cars")
  } catch (err) {
    console.log(err)
    res.status(400).json({
      status: "failed",
      message: err.message,
    })
  }
}

// action delete
const deleteCar = async (req, res) => {
  try {
    const id = req.params.id
    await Car.findByIdAndDelete(id)
    req.flash("message", "Dihapus")
    res.redirect("/cars")
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    })
  }
}

// action update
const updateCar = async (req, res) => {
  const { name, price, category } = req.body
  const file = req.file

  try {
    const split = file.originalname.split(".")
    const extension = split[split.length - 1]

    const img = await imagekit.upload({
      file: file.buffer,
      fileName: `IMG-${Date.now()}.${extension}`,
    })

    const id = req.params.id

    await Car.findByIdAndUpdate(
      id,
      { name, price, category, imageUrl: img.url },
      { new: true }
    )
    req.flash("message", "Diperbarui")
    res.redirect("/cars")
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    })
  }
}

module.exports = {
  pageCars,
  pageAddCar,
  createCar,
  pageEdit,
  deleteCar,
  updateCar,
}
