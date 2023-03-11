//initialise express
const express = require('express');
const app = express();
//localhost testing port, can be removed if we decide to host
const port = 3000;
//initialising body parser and having app use it
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));
//initialising validator for POST requests
const { body, validationResult } = require("express-validator");

//set directory of routes
const mainRoutes = require('./routes/main');
const animalRoutes = require('./routes/animal');
const searchRoutes = require('./routes/search');

// DB Connection
const sqlite3 = require('sqlite3').verbose();
global.db = new sqlite3.Database('DB/pets.db',function(err){
  if(err){
    console.error(err);
    process.exit(1); //Bail out we can't connect to the DB
  }else{
    console.log("Database connected");
    global.db.run("PRAGMA foreign_keys=ON"); //This tells SQLite to pay attention to foreign key constraints
  }
});

//view engine Setup
app.set("views",__dirname + "/views");
app.set('view engine', 'ejs');
const urlEncodedParser = bodyParser.urlencoded({extended:false});
app.engine("html", require("ejs").renderFile);
app.use(express.static(__dirname + '/views'));

// adds the routes to the app under the path /route
app.use('/', mainRoutes);
app.use('/animal', animalRoutes);
app.use('/search', searchRoutes);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})
