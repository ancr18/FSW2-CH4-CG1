const Car = require("../models/carModel")
const moment = require("moment")

// view page - list cars
const pageCars = async (req, res) => {
  try {
    const { price, name, category } = req.query

    const condition = {}
    if (name)
      condition.name = {
        $regex: ".*" + name.toLowerCase() + ".*",
      }
    if (category) condition.category = { $regex: req.query.category }

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

// action create new car
const createCar = async (req, res) => {
  try {
    await Car.create(req.body)
    req.flash("message", "Ditambahkan")
    res.redirect("/")
  } catch (err) {
    console.log(err)
    res.status(400).json({
      status: "failed",
      message: err.message,
    })
  }
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

// action delete
const deleteCar = async (req, res) => {
  try {
    const id = req.params.id
    await Car.findByIdAndDelete(id)
    req.flash("message", "Dihapus")
    res.redirect("/")
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    })
  }
}

// action update

module.exports = {
  pageCars,
  pageAddCar,
  createCar,
  pageEdit,
  deleteCar,
}
