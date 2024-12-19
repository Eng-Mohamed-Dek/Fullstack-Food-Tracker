// imports will be here
const express = require("express");
require("dotenv").config();
const FoodRouters = require("./routes/FoodRoutes");
const UserRouters = require("./routes/UserRoutes");
const mongoose = require("mongoose");
const cors = require('cors')

// express app
const app = express();

//GET, POST, DELETE

// middleware
app.use((req, res, next) => {
  console.log("request path " + req.path, "request method " + req.method);
  next();
})

// middleware for parsing JSON
app.use(express.json())
app.use(cors(
  {
    origin: [""],
    method: ["POST", "GET"],
    credentials: true
  }
))

// Routes
app.use("/api/foods", FoodRouters);
app.use("/api/user", UserRouters);

app.get('/test', (req, res) => {
  res.send("test successfully done")
})

// connect to database
mongoose
  .connect('mongodb+srv://madaaledesigner80:YHFC83kZO6PjU88L@foodtracker.ys80g.mongodb.net/?retryWrites=true&w=majority&appName=Foodtracker')
  .then(() => {
    console.log("Connected to database");
    // Listening Express
    app.listen(5000 || 3000, () => {
      console.log(`App listening on port http://localhost:5000`);
    });
})
  .catch((error) => {
    console.log("Error :", error);
})
