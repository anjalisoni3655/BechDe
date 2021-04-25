const express = require("express");
const cors = require("cors");

const SERVER_CONFIGS = require("./constants/server");

const configureServer = require("./server");
const configureRoutes = require("./routes");

const app = express();
app.use(cors());

//configureServer(app);
configureRoutes(app);

app.listen(SERVER_CONFIGS.PORT, (error) => {
  if (error) throw error;
  console.log("Server running on port: " + SERVER_CONFIGS.PORT);
});
