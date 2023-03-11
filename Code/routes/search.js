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
    res.render("search");
});
module.exports = router;
