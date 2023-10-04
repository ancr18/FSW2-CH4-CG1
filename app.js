// THIRD PARTY MODULS
const express = require("express")
const flash = require("connect-flash")
const session = require("express-session")
const morgan = require("morgan")

const app = express()

// MIDDLEWARE
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan("dev"))
app.use(express.static(`${__dirname}/public`))
app.use(
  session({
    secret: "geeksforgeeks",
    saveUninitialized: true,
    resave: true,
  })
)
app.use(flash())

// SETTING CONF EJS
app.set("views", __dirname + "views")
app.set("view engine", "ejs")

// OUR MIDDLEWARE
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString()
  console.log(req.requestTime)
  next()
})

module.exports = app
