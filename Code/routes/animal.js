const express = require("express");
const router = express.Router();
const assert = require("assert");
const { randomInt } = require("crypto");
const { urlencoded } = require("express");
const { check, validationResult } = require('express-validator');
const e = require("express");
const { exists } = require("fs");
let objId = 0;

router.get("/dogs",(req,res,next) =>{
    res.render("dogs"); 
});  

router.get("/cats",( req,res,next) =>{
     res.render("cats"); 
});   
  
router.get("/other",(req,res,next) =>{
  res.render("other"); 
});    


router.get("/",(req,res,next) =>{
  res.send("Animal specific page");
});


module.exports = router;
