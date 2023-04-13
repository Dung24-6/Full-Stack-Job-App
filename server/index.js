const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const app = express();
let cors = require("cors");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongodb-session")(session);
const router = require("./routes/index");
require("dotenv").config();
app.use(cookieParser());
const corsOptions = {
  origin:[ "http://localhost:3000", "http://localhost:5173"],

  credentials: true
};

app.use(cors(corsOptions));
mongoose.connect(process.env.DATABASE_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Database 😍"));

const store = new MongoStore({
  uri: process.env.DATABASE_URI,
  collection: "session",
});
app.use(
  session({
    secret: "key",
    saveUninitialized: false,
    resave: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 7, httpOnly: true },
    store: store,
  })
);

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/cookies", (req, res) => {
  // Access cookies using req.cookies
  console.log(req.cookies.session);
  res.send(req.cookies.session);
});
app.use("/", router);

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`);
});
