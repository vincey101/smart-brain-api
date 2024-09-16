const express = require("express");
const bodyParser = require("body-parser");
var bcrypt = require("bcryptjs");
var cors = require("cors");
const knex = require("knex");
require('dotenv').config();

// const { response } = require("express");

const register = require("./controllers/register");
const signin = require("./controllers/signin");
const profile = require("./controllers/profile");
const image = require("./controllers/image");

// const db = knex({
//   client: "pg",
//   connection: {
//     host: '127.0.0.1',
//     user: 'vincey',
//     password: '',
//     database: 'vincey'

//   },
// });

const db = knex({
  client: "pg",
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  },
});

const app = express();

app.use(bodyParser.json());
app.use(cors());


app.post("/signin", (req, res) => { signin.handleSignin(req, res, db, bcrypt) })
app.post("/register", (req, res) => { register.handleRegister(req, res, db, bcrypt) })
app.get("/profile/:id", (req, res) => { profile.handleProfileGet(req, res, db) });
app.put("/image", (req, res) => { image.handleImage(req, res, db) });
app.post("/imageurl", (req, res) => { image.handleApiCall(req, res) });


app.listen(process.env.PORT || 4001, () => {
  console.log(`app is running on port ${process.env.PORT}`);
});

// Breitling001. -- test gorilla