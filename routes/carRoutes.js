const express = require("express")
const carController = require("../controllers/carController")

const upload = require("../middlewares/uploader")
const router = express.Router()

// routes view pages
router.route("/").get(carController.pageCars)
router.route("/create").get(carController.pageAddCar)
router.route("/edit/:id").get(carController.pageEdit)

// routes actions
router
  .route("/create/add")
  .post(upload.single("image"), carController.createCar)
router.route("/delete/:id").get(carController.deleteCar)
router
  .route("/update/:id")
  .post(upload.single("image"), carController.updateCar)
module.exports = router
