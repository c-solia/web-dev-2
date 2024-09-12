var express = require('express');
var bodyparser = require("body-parser");
const cors = require("cors");

var app = express();

var fundraiserAPI = require("./controllerAPI/api-controller");

const port = 3060;

app.use(cors());

app.use(bodyparser.urlencoded({extended:false}));

app.use("/", fundraiserAPI);

app.listen(port);

console.log(`Server up and running on port ${port}`);