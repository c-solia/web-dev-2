var dbcon = require("../database");
var express = require("express");
var router = express.Router();

var connection = dbcon.getConnection();

connection.connect();

//Get request 1
router.get("/",(req,res) =>{
    connection.query(`SELECT FUNDRAISER.FUNDRAISER_ID, FUNDRAISER.ORGANIZER, FUNDRAISER.CAPTION, FUNDRAISER.TARGET_FUNDING, FUNDRAISER.CURRENT_FUNDING, FUNDRAISER.CITY, FUNDRAISER.ACTIVE, FUNDRAISER.IMG_URL, CATEGORY.NAME AS CATEGORY_NAME 
        FROM FUNDRAISER INNER JOIN CATEGORY ON FUNDRAISER.CATEGORY_ID = CATEGORY.CATEGORY_ID WHERE FUNDRAISER.ACTIVE = TRUE`,(err,records, fields) =>{
    if(err){
        console.log("Error while retrieving active fundraisers");
    }
    else{
        res.send(records);
    }
    })
})

//GET request 2
router.get("/category",(req,res) =>{
    connection.query(`SELECT NAME FROM CATEGORY;`,(err,records, fields) =>{
        if(err){
            console.log("Error while retrieving categories");
        }
        else{
            res.send(records);
        }
    })
})

//Get request 3
router.get("/search",(req,res) =>{

    const category = req.query.category;
    const city = req.query.city;
    const organiser = req.query.organiser;

    let query = `SELECT FUNDRAISER.FUNDRAISER_ID, FUNDRAISER.ORGANIZER, FUNDRAISER.CAPTION, FUNDRAISER.TARGET_FUNDING, FUNDRAISER.CURRENT_FUNDING, FUNDRAISER.CITY, FUNDRAISER.ACTIVE, FUNDRAISER.IMG_URL, CATEGORY.NAME AS CATEGORY_NAME 
        FROM FUNDRAISER INNER JOIN CATEGORY ON FUNDRAISER.CATEGORY_ID = CATEGORY.CATEGORY_ID WHERE FUNDRAISER.ACTIVE = TRUE`

        if (category != '') {
            query += ` AND CATEGORY.NAME = '${category}'`;
        }
        if (city != '') {
            query += ` AND FUNDRAISER.CITY = '${city}'`;
        }
        if (organiser != '') {
            query += ` AND FUNDRAISER.ORGANIZER = '${organiser}'`;
        }

    connection.query(query,(err,records, fields) =>{
    if(err){
        console.log("Error while retrieving fundraisers", err);
        console.log("cat = " + category + ", city = "+ city + "  , org = "+ organiser);
        console.log(req.query);
    }
    else {
        res.send(records);
    }
    })
})

//Get request 4
router.get("/fundraiser/:id",(req,res) =>{
    connection.query(`SELECT FUNDRAISER.FUNDRAISER_ID, FUNDRAISER.ORGANIZER, FUNDRAISER.CAPTION, FUNDRAISER.TARGET_FUNDING, FUNDRAISER.CURRENT_FUNDING, FUNDRAISER.CITY, FUNDRAISER.ACTIVE, FUNDRAISER.IMG_URL, CATEGORY.NAME AS CATEGORY_NAME 
        FROM FUNDRAISER INNER JOIN CATEGORY ON FUNDRAISER.CATEGORY_ID = CATEGORY.CATEGORY_ID WHERE FUNDRAISER.FUNDRAISER_ID =` + req.params.id,(err,records, fields) =>{
    if(err){
        console.log("Error while retrieving active fundraisers");
    }
    else{
        res.send(records);
    }
    })
})

//Exports the module - must go at end of file
module.exports = router;