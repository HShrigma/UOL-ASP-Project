const express = require("express");
const router = express.Router();
const assert = require("assert");
const { randomInt } = require("crypto");
const { urlencoded } = require("express");
const { check, validationResult } = require('express-validator');
const e = require("express");
const { exists } = require("fs");
let objId = 0;

router.get("/",(req,res,next) =>{
      res.render("index"); 
});  
 
router.get("/about",( req,res,next) =>{
       res.render("about"); 
});   
    
router.get("/donate",(req,res,next) =>{
    res.render("donation"); 
});    

router.get("/adopt",(req,res,next) =>{
    res.render("adopt"); 
});
module.exports = router;
