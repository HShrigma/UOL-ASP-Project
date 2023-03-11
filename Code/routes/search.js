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

router.get("/", (req, res, next) => {
    //search_value - user text
    //search_for - animal types
    //search_pref - order of array
    let typeArr = [];
    switch (req.query.search_for) {
        case 'all':
            typeArr['Bird', 'Cat', 'Dog', 'Rabbit', 'Turtle'];
            break;
        case 'dogs':
            typeArr = ['Dog'];
            break;
        case 'cats':
            typeArr = ['Dog'];
            break;
        case 'other':
            typeArr['Bird', 'Rabbit', 'Turtle'];
            break;
        default:
            console.error("Search.js: search type does not exist!");
            break;
    }
    //*10 fixes error where every pet is repeated x10
        let samples = Number(req.query.samples)*10;
        console.log("samples " + samples);
      global.db.all("SELECT DISTINCT pets.id as id, pet_types.name as type, pets.name as name, genders.name as gender, pets.birth, pets.picture," +
      "pets.price, pets.weight, pets.description " + "FROM pets, pet_types, genders " + 
      "WHERE (pets.name LIKE '%"+req.query.search_value+"%') OR (pets.description LIKE '%"+req.query.search_value+"%') " +
      "LIMIT " + samples , function (err, rows) {
        if (err) {
            console.log("ERROR IMPORTING DRAFT");
            next(err);
        }
        else {
            let petlist = [];
            let prevId = 0;
            for (let index = 0; index < rows.length; index++) {
                if(prevId != rows[index].id){
                    petlist.push(rows[index]);
                    prevId=rows[index].id;
                }  
            }
            console.log(rows.length);
            res.render("search", {petlist: petlist, showType: false});
        }
    });
});
module.exports = router;
