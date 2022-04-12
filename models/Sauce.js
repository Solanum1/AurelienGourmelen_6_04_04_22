//Import de mongoose
const mongoose = require("mongoose");

//Création du schéma de données sauceSchema
const sauceSchema = mongoose.Schema({
    userId: { type: String, required: true },
    name: { type: String, required: true },
    manufacturer: { type: String, required: true },
    description: { type: String, required: true },
    mainPepper: { type: String, required: true },
    imageUrl: { type: String, required: true },
    heat: { type: Number, default: 5 },
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 },
    userLikes: { type: [String], default: [] },
    userDislikes: { type: [String], default: [] },
});

//Export du schéma en tant que modèle Mongoose appelé "Sauce"
//Utilisation de la méthode model qui transforme ce modèle en modèle utilisable
module.exports = mongoose.model("Sauce", sauceSchema);
