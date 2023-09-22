const express = require('express');
const path = require('path');
const router = require('./routes/router')
var viewsPath = path.join(__dirname,"views")
const app = express();
const port = process.env.PORT || 3000;


// Definiere eine einfache Static asset
app.use(express.static(path.join(__dirname, "public"))); // <- this line will us public directory as your static assets
app.use(express.static(path.join(__dirname, "views"))); 
app.use(router);


// Starte den Express-Server
app.listen(port, (err) => {
    if (err) {
        console.log(`Tut meir leid, aber die Anwendung konnte nicht verbunden werden!`)
    } else {
    console.log(`Die Anwendung läuft auf http://localhost:${port}`);
    }
});
