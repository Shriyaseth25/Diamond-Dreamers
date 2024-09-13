var express = require("express");
var app = express();

app.use("/", express.static("./code"))

app.listen(8080)
