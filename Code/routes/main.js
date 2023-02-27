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
    var testStr = "Testing 123";
      res.render("index",{
        phoneNum: testStr
      }); 
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

router.get("/article",(req,res,next)=>{
    res.render("article");
});

router.post("/adopt",(req,res,next)=>{
  res.send("adopt");
});

module.exports = router;
