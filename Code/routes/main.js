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
//Pet preview (see animals page ul) -> last 3 pets by id obj
res.render("index"); 
});  
 
router.get("/about",( req,res,next) =>{
       res.render("about"); 
});   
    
router.get("/donate",(req,res,next) =>{
  var tier = req.query.tier;
  res.render("donation", {tier: tier}); 
});    
router.post("/donate",(req,res,next) =>{
<<<<<<< HEAD
  res.render("donation", {tier: req.query.tier}); 
=======
  res.render("donation", {tier: req.body.tier}); 
>>>>>>> 97fd8da8fe88ef5f63fe0dd9e33f00a76dfd9609
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
