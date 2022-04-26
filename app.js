//----------------------------Importations---------------------

//importation d'express
const express = require("express");

//appel de la méthode express()
const app = express();

require("dotenv").config();

const mongoose = require("mongoose");

//permet d'accéder au path du serveur
const path = require("path");

//----------------------------Importation des routes------------

//Import de la route user
const userRoutes = require("./routes/user");
//Import de la route sauce
const sauceRoutes = require("./routes/sauce");

//----------------------------Connection à MongoDB---------------

const uriConnect = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}.kkjcm.mongodb.net/${process.env.DB_DATABASE}?retryWrites=true&w=majority`;

mongoose
    .connect(uriConnect, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connexion à MongoDB réussie !"))
    .catch((error) => {
        console.log("Connexion à MongoDB échouée !");
        console.log(error);
    });

app.use(express.json());

//--------------------------------------------------------------
//------------Middleware CORS : Cross Origin Resource Sharing---
app.use((req, res, next) => {
    //Header qui permet d'accéder à l'API depuis n'importe quelle origine '*'
    res.setHeader("Access-Control-Allow-Origin", "*");
    //Permet d'ajouter les headers mentionnés aux requêtes envoyées vers l'API
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    );
    //Permet d'envoyer des requêtes avec les méthodes mentionnées
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    );
    next();
});

//----------------------------Enregistrement des routes------------

//Gestionnaire de routage
app.use("/images", express.static(path.join(__dirname, "images")));

app.use("/api/auth", userRoutes);
app.use("/api/sauces", sauceRoutes);

//-----------------------------Exports------------------------------

//Export de l'application express app afin que l'on puisse y accéder depuis les autres fichiers
module.exports = app;
