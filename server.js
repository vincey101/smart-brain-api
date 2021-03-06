const express = require("express");
const bodyParser = require("body-parser");
var bcrypt = require("bcryptjs");
var cors = require("cors");
const knex = require("knex");
// const { response } = require("express");

const register = require("./controllers/register");
const signin = require("./controllers/signin");
const profile = require("./controllers/profile");
const image = require("./controllers/image");

const db = knex({
  client: "pg",
  connection: {
    host: "postgresql-animated-25665",
    user: "postgres",
    password: "breitling",
    database: "smart-brain",
  },
});

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send('it is working');
});
app.post("/signin", (req, res) => { signin.handleSignin(req, res, db, bcrypt) })
app.post("/register", (req, res) => { register.handleRegister(req, res, db) })
app.get("/profile/:id", (req, res) => { profile.handleProfileGet(req, res, db) });
app.put("/image", (req, res) => { image.handleImage(req, res, db) });
app.post("/imageurl", (req, res) => { image.handleApiCall(req, res) });


app.listen(process.env.PORT || 4000, () => {
  console.log(`app is running on port ${process.env.PORT}`);
});