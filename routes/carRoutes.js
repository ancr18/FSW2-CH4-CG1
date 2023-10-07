const express = require("express")
const carController = require("../controllers/carController")

const upload = require("../middlewares/uploader")
const router = express.Router()

// routes view pages
router.route("/dashboard").get(carController.pageCars)
router.route("/dashboard/create").get(carController.pageAddCar)
router.route("/dashboard/edit/:id").get(carController.pageEdit)

// routes actions
router.route("/cars/add").post(upload.single("image"), carController.createCar)
router.route("/cars/delete/:id").get(carController.deleteCar)
router
  .route("/cars/update/:id")
  .post(upload.single("image"), carController.updateCar)
module.exports = router
