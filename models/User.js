//import mongoose
const mongoose = require("mongoose");

//import du package mongoose unique validator pour améliorer les messages d'erreurs lors de l'enregistrement de données uniques
const uniqueValidator = require("mongoose-unique-validator");

//création du Schéma de données avec la fonction Schema de mongoose
const userSchema = mongoose.Schema({
    //On stocke l'adresse mail de l'utilisateur et le mot de passe
    //utilisation du mot clé unique pour s'assurer que deux utilisateurs ne puissent pas utiliser la même adresse mail
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

userSchema.plugin(uniqueValidator);

//Export du schéma sous forme de modèle
module.exports = mongoose.model("User", userSchema);
