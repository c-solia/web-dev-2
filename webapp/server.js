const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");

const app = express();

app.use(cors());

const hostname = '127.0.0.1';
const port = 3030;

//Parses URL encoded data
app.use(bodyParser.urlencoded({extended:true}));


//Serves static files
app.use(express.static(__dirname));

//Routing for index.html
app.get("/", (req,res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});


//Routing for search.html
app.get("/search", (req,res) => {
    res.sendFile(path.join(__dirname, "search.html"));
});


//Routing for fundraiser.html
app.get("/fundraiser", (req,res) => {
    res.sendFile(path.join(__dirname, "fundraiser.html"));
});


app.listen(port, hostname, ()=> {
    console.log(`Server running at http://${hostname}:${port}`)
});