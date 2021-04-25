const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const expressValidator = require("express-validator");
const session = require("express-session");
const app = express();
const config = require("./config/database");
const port = process.env.PORT || 5000;
const uri =
  "mongodb://anjalisoni:Rahul%403655@olx-shard-00-00.m5jtx.mongodb.net:27017,olx-shard-00-01.m5jtx.mongodb.net:27017,olx-shard-00-02.m5jtx.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-14fgss-shard-0&authSource=admin&retryWrites=true&w=majority";
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => console.log(err));

/* // connnect Mongodb
mongoose.connect(config.database, { useNewUrlParser: true });
let db = mongoose.connection;
// Check connections
db.once("open", function () {
  console.log("Connected to MongoDB");
});
// Check for error
db.on("error", function (err) {
  console.log(err);
}); */

// Cors middleware
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
// middlewares
app.use(express.json({ extended: false }));
// BodyParser Middleware
app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Set Static Folder
app.use(express.static(path.join(__dirname, "public")));

// Express Session
app.use(
  session({
    secret: "secret",
    saveUninitialized: true,
    resave: true,
  })
);

// Express Validator
app.use(
  expressValidator({
    errorFormatter: function (param, msg, value) {
      var namespace = param.split("."),
        root = namespace.shift(),
        formParam = root;

      while (namespace.length) {
        formParam += "[" + namespace.shift() + "]";
      }
      return {
        param: formParam,
        msg: msg,
        value: value,
      };
    },
  })
);

// Route file

let user = require("./routes/user");
let ad = require("./routes/ad");
app.use("/user", user);
app.use("/item", ad);
// route included
app.use("/payment", require("./routes/payment"));

app.listen(port, () => console.log(`The Server is running on port ${port}`));
