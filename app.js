// THIRD PARTY MODULS
const express = require("express")
const flash = require("connect-flash")
const session = require("express-session")
const morgan = require("morgan")
const cookieParser = require("cookie-parser")

// LOCAL MODULS
const carRoutes = require("./routes/carRoutes")

const app = express()

// MIDDLEWARE
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan("dev"))
app.use(express.static(`${__dirname}/public`))
app.use(cookieParser("secret"))
app.use(
  session({
    secret: "geeksforgeeks",
    saveUninitialized: true,
    resave: true,
  })
)
app.use(flash())

// SETTING CONF EJS
app.set("views", __dirname + "/views")
app.set("view engine", "ejs")

// OUR MIDDLEWARE
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString()
  console.log(req.requestTime)
  next()
})

// routes
app.use("/", carRoutes)

module.exports = app
