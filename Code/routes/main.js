const express = require("express");
const router = express.Router();
const assert = require("assert");
const { randomInt } = require("crypto");
const { urlencoded } = require("express");
const { check, validationResult } = require('express-validator');
const e = require("express");
const { exists } = require("fs");
const pets = require("../controllers/pets");
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
  var tier = req.query.tier;
  res.render("donation", {tier: tier}); 
});    
router.post("/donate",(req,res,next) =>{
  res.render("donation", {tier: req.body.tier}); 
});
router.get("/adopt",(req,res,next) =>{
    let petId = req.query.pet_id ? req.query.pet_id : 1;
    pets.getPet(petId)
        .then((petObject) => {
            res.render("adopt", {pet: petObject});
        });
});

router.post("/adopt",(req,res,next)=>{
  res.render("adopt");
});

module.exports = router;
