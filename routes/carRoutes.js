const express = require("express")
const carController = require("../controllers/carController")

const router = express.Router()

// routes view pages
router.route("/").get(carController.pageCars)
router.route("/create").get(carController.pageAddCar)
router.route("/edit/:id").get(carController.pageEdit)

// routes actions
router.route("/create/add").post(carController.createCar)
router.route("/delete/:id").get(carController.deleteCar)
module.exports = router
