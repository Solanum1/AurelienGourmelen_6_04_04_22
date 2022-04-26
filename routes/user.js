//--------------------------Déclarations et importations----------
//importation d'express
const express = require("express");

//permet de créer des routeurs séparés
const router = express.Router();

//Middleware qui contrôle la validité de l'adresse email à l'enregistrement
const email = require("../middleware/email");

//Middleware qui contrôle le mot de passe utilisateur à l'enregistrement
const password = require("../middleware/password");

//import du controller userCtrl
const userCtrl = require("../controllers/userCtrl");

//--------------------------Routes--------------------------------
//Route POST pour enregistrement d'un nouvel utilisateur
router.post("/signup", email, password, userCtrl.signup);

//Route POST pour la connexion d'un utilisateur
router.post("/login", userCtrl.login);

//--------------------------Exportation---------------------------
//On exporte le router de ce fichier
module.exports = router;
