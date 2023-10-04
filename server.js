// THIRD PARTY MODULES
const mongoose = require("mongoose")
const dotenv = require("dotenv")

// LOCAL MODULS
const app = require("./app")

// CONFIG
dotenv.config()
const port = process.env.PORT || 3000
const database = process.env.DATABASE_URI

mongoose
  .connect(database, {
    useNewUrlParser: true,
  })
  .then(() => console.log("Successfully connected DB"))
  .catch((err) => console.log("X Failed connected DB X"))

app.listen(port, () => {
  console.log(`App running on port http:localhost:${port}`)
})
