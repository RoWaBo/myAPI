require("dotenv").config();
const express = require('express');
const formidable = require('express-formidable');
const cors = require("cors")
const animals = require('./routes/animals');
const foods = require('./routes/foods');
const accessories = require('./routes/accessories');

// SET UP EXPRESS APP
const app = express();

// IMPORT DB COLLECTION 
require("./database")

app.use("/", express.static('docs'))

// ALLOW REQUEST FROM OTHER ORIGINS WITH CORS (cross-origin resource sharing)
app.use(cors())

// PASS HTTP FORM DATA
app.use(formidable())

// SET UP APP ROUTES
app.use("/api/v1", animals)
app.use("/api/v1", foods)
app.use("/api/v1", accessories)

app.listen(process.env.PORT || 4000, () => {
    console.log(`Express listens on ${process.env.PORT}`)
})