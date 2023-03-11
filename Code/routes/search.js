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
    //sort_by - order of array
    let typeArr = [];
    let search_pref = req.query.search_for;
    let search_value = req.query.search_value;
    let sort_pref = req.query.search_pref;
    let samples = Number(req.query.samples) * 10;

    if(req.query.samples_set != null){
        samples = Number(req.query.samples_set) * 10;
    }
    if (req.query.sort_by != null) {
        sort_pref = req.query.sort_by;
    }
    if (req.query.search_value_get != null) {
        search_value = req.query.search_value_get;
    }
    if (req.query.search_for_pref != null) {
        search_pref = req.query.search_for_pref;
    }
    switch (search_pref) {
        case "all":
            typeArr = [1, 2, 3, 4, 5];
            break;
        case "dogs":
            typeArr = [3];
            break;
        case "cats":
            typeArr = [2];
            break;
        case "other":
            typeArr = [1, 4, 5];
            break;
        default:
            console.error("Search.js: search type " + req.query.search_for + " does not exist!");
            break;
    }
    //query for pet type
    let typeQuery = "(pets.type_id = ";
    for (let i = 0; i < typeArr.length; i++) {
        if (i < typeArr.length - 1) {
            typeQuery = typeQuery.concat(typeArr[i].toString(), " OR pets.type_id = ");
        }
        else {
            typeQuery = typeQuery.concat(typeArr[i].toString(), ") ");
        }
    }
    let orderQuery = "";
    switch (sort_pref) {
        case "alpha-dsc":
            orderQuery = "pets.name DESC ";
            break;
        case "id-asc":
            orderQuery = "pets.id ASC ";
            break;
        case "id-dsc":
            orderQuery = "pets.id DESC ";
            break;
        default:
            orderQuery = "pets.name ASC ";
            break;
    }

    global.db.all("SELECT DISTINCT pets.id as id, pet_types.name as type, pets.name as name, genders.name as gender, pets.birth, pets.picture," +
        "pets.price, pets.weight, pets.description " + "FROM pets, pet_types, genders " +
        "WHERE ((pets.name LIKE '%" + req.query.search_value + "%') OR (pets.description LIKE '%" + req.query.search_value + "%')) AND " +
        typeQuery +
        "ORDER BY " + orderQuery +
        "LIMIT " + samples, function (err, rows) {
            if (err) {
                console.log("ERROR IMPORTING PETS");
                next(err);
            }
            else {
                let petlist = [];
                let prevId = 0;
                for (let index = 0; index < rows.length; index++) {
                    if (prevId != rows[index].id) {
                        petlist.push(rows[index]);
                        prevId = rows[index].id;
                    }
                }
                res.render("search", {
                    petlist: petlist,
                    showType: false,
                    samples: samples / 10,
                    search_for: search_pref,
                    search_pref: sort_pref,
                    search_value: search_value
                });
            }
        });
});
module.exports = router;
