const express = require('express');
const router = express.Router();
const path = require('path');
var viewsPath = path.join(__dirname,"views")
const urlPosts = 'https://jsonplaceholder.typicode.com/posts'
const pool = require('../db')
const urlUsers = 'https://jsonplaceholder.typicode.com/users'
// const url
async function getData(url) {
    const kwargs = [{'name':1}, {'username':2}, {'body':3}]
    var insertArgs = "";
    var entryName = Object.entries(kwargs).map(function(entry) {return Object.entries(entry[1])[0][0];})
    var values = Object.entries(kwargs).map(function(entry) {return Object.entries(entry[1])[0][1];})
    console.log(values+"\n"+entryName)
    for (let i = 0; i < kwargs.length ; i++){
        const variable = Object.entries(kwargs[i])[0][0];
        console.log(kwargs[i])
        
        
        if (i+1 === kwargs.length) {
            insertArgs += "$"+(i+1);
        } else {
            insertArgs += "$"+(i+1)+", ";
        }
    }
    const response = await fetch(url);
    const jsonResponse = await response.json();
    console.log(insertArgs);
    return jsonResponse
  } 
  
async function postData(table, ...dataEntries) {
    var insertNumbers = "";
    var insertNames = "";
    var valueName = Object.entries(dataEntries).map(function(entry) {return (Object.entries(entry[1])[0][0])});
    var values = Object.entries(dataEntries).map(function(entry) {return (Object.entries(entry[1])[0][1])});;
    for (let i = 0; i < dataEntries.lenght ; i++){
        if (i === dataEntries.length) {
            insertNumbers += "$"+(i+1)
            insertNames += valueName[i]
        } else {
            insertNumbers += "$"+(i+1)+", ";
            insertNames += valueName[i]+", ";
        }
    }
    const newEntry = await pool.query(`insert into ${table} (${insertNames}) values (${insertNumbers})`, values);
    return newEntry;
}
router.get("/posts", async (req, res) => {
    console.log('promise all json');
    try{ 
        const dataJson = getData(urlPosts)
        res.send(dataJson)
    } catch (err) {console.error(err.message)};
});

router.get("/users", async (req, res) => {
    console.log('promise all json');
    try{ 
        const dataJson = getData(urlPosts)
        res.send(dataJson)
    } catch (err) {console.error(err.message)};
});

router.get("/posts/:id", async (req, res) => {
    console.log('promise specific json');
    const id = req.params.id
    console.log("Post id " + id + " suchen...")
    try{ 
        const dataJson = getData(urlPosts)
        res.send(dataJson.filter(function(entry) {return entry.userId === parseInt(id)}))
    } catch (err) {console.error(err.message)};

});

// router.post("/users", async (req, res) => {
//     console.log('promise specific json');
//     const data = req.body;
//     try {
//         const newPost = await pool.query("insert into users (name, username, email, address, street, suite, city, zipcode, geo, phone, website, company) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)", [data.name, data.username, data.email, data.address, data.street, data.suit, data.city, data.zipcode, data.geo, data.phone, data.website, data.company] );
//         ", [data.]); 
//         res.status(200);
//         res.send("<h3>User successfully added!</h3>");
//     } catch (err) {
//         console.error(err.message)
//     } 

// });
// insert into users (name, username, )
// router.post("/posts", async (req, res) => {
//     console.log('promise specific json');
//     const data = req.body;
//     try {
//         const newPost = await pool.query("INSERT INTO posts (userId, title, body) VALUES ($1, $2, $3)", [data.]); 
//         res.status(200);
//         res.send("<h3>User successfully added!</h3>");
//     } 
 

// });

// app.post("/leben", async (req, res) => {
//     try {
//         const data = req.body;
//         const newFood = await(pool.query("INSERT INTO leben (name, kcal) VALUES ($1, $2) RETURNING *", [data.name, data.kcal]));
//         res.json(newFood.rows);
//     } catch (err) {
//         console.log(err.message);
//     }
// })
router.get("/index"), (req, res) => {
    
}

module.exports = router;