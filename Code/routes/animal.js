const express = require("express");
const router = express.Router();
const assert = require("assert");
const { randomInt } = require("crypto");
const { urlencoded } = require("express");
const { check, validationResult } = require('express-validator');
const e = require("express");
const { exists } = require("fs");
let objId = 0;
const pets = require("../controllers/pets");

router.get("/dogs",(req,res,next) =>{
    let start = req.query.start ? req.query.start : 0;
    let count = req.query.count ? req.query.count : 15;
    pets.getPetsOfType(['Dog'], start, count)
        .then((petlist) => {
            res.render("cats", {petlist: petlist, showType: false});
        });
});  

router.get("/cats",( req,res,next) =>{
    let start = req.query.start ? req.query.start : 0;
    let count = req.query.count ? req.query.count : 15;
    pets.getPetsOfType(['Cat'], start, count)
        .then((petlist) => {
            res.render("cats", {petlist: petlist, showType: false});
        });
});   
  
router.get("/other",(req,res,next) =>{
    let start = req.query.start ? req.query.start : 0;
    let count = req.query.count ? req.query.count : 15;
    pets.getPetsOfType(['Bird', 'Rabbit', 'Turtle'], start, count)
        .then((petlist) => {
            res.render("cats", {petlist: petlist, showType: true});
        });
});    
module.exports = router;
