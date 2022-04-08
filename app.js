const express = require("express");
const app = express();

require("dotenv").config();

const mongoose = require("mongoose");

//Routes
const userRoutes = require("./routes/user");

//Mongoose
const uriConnect = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}.kkjcm.mongodb.net/${process.env.DB_DATABASE}?retryWrites=true&w=majority`;

mongoose
    .connect(uriConnect, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connexion à MongoDB réussie !"))
    .catch((error) => {
        console.log("Connexion à MongoDB échouée !");
        console.log(error);
    });
//`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}.kkjcm.mongodb.net/${process.env.DB_DATABASE}?retryWrites=true&w=majority`

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

app.use((req, res, next) => {
    res.json({ message: "requête bien reçue" });
    next();
});
//--------------------------------------------------------------

app.use("/api/auth", userRoutes);

//--------------------------------------------------------------

module.exports = app;
