const express = require("express");
const app = express();

//------------Mongoose----------------------------------------
const mongoose = require("mongoose");
mongoose
    .connect(
        "mongodb+srv://solanum1:zcnVqF8tvNVeHFm@cluster0.kkjcm.mongodb.net/piiquante?retryWrites=true&w=majority",
        { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then(() => console.log("Connexion à MongoDB réussie !"))
    .catch((error) => {
        console.log("Connexion à MongoDB échouée !");
        console.log(error);
    });

//------------Middleware qui intercepte toutes les requêtes qui contiennent du json et met à disposition ce corps de la requête sur l'objet requête dans req.body
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

//--------------------------------------------------------------

module.exports = app;
