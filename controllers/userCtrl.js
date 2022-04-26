//----------------Importations--------------------------------
//Import de bcrypt pour le cryptage de mots de passe
const bcrypt = require("bcrypt");

//Jsonwebtoken
const jwt = require("jsonwebtoken");

//Import modèle utilisateur
const User = require("../models/User");

//----------------Logique métier des utilisateurs--------------
//Enregistrer un nouvel utilisateur
exports.signup = (req, res, next) => {
    //fonction pour hacher un mot de passe
    bcrypt
        //mot de passe passé dans le corps de la requête sur le front | salt = 10 : combien de fois on exécute l'algorythme de hachage
        .hash(req.body.password, 10)
        //on récupère le hash du mdp que l'on va enregistrer dans la bdd
        .then((hash) => {
            //création de l'utilisateur avec le modèle mongoose
            const user = new User({
                //adresse email fournie dans le corps de la requête
                email: req.body.email,
                //le hash du mdp
                password: hash,
            });
            //méthode save pour enregistrer dans la bdd
            user.save()
                .then(() =>
                    res.status(201).json({ message: "Utilisateur créé" })
                )
                .catch((error) => {
                    res.status(400).json({ error: error.message });
                });
        })
        .catch((error) => {
            res.status(500).json({ error: error.message });
            console.log(error.message);
        });
};

//Connecter un utilisateur
exports.login = (req, res, next) => {
    //Méthode findOne pour trouver un seul utilisateur de la bdd | objet filtre : est-ce que l'adresse mail correspond à l'adresse mail envoyée dans la requete
    User.findOne({ email: req.body.email })
        .then((user) => {
            //Si on ne trouve pas de user
            if (!user) {
                return res
                    .status(401)
                    .json({ error: "Utilisateur non trouvé !" });
            }
            //on utilise la fonction compare de bcrypt pour comparer le mot de passe envoyé par l'utilisateur qui se connecte avec le hash qui est enregistré pour le user déclaré dans la promesse
            bcrypt
                .compare(req.body.password, user.password)
                .then((valid) => {
                    //Si comparaison n'est pas valable
                    if (!valid) {
                        return res
                            .status(401)
                            .json({ error: "Mot de passe incorrect !" });
                    }
                    //Si comparaison est bonne, identifiants valables, on lui renvoie sont userId et un token d'authentification
                    res.status(200).json({
                        userId: user._id,
                        //fonction sign de jwt encode un nouveau token
                        //En arguments on a les données que l'on veut encoder : le payload
                        //ID de l'utilisateur, clé secrète pour l'encodage, durée de validité du token définie ici à 24 heures
                        token: jwt.sign(
                            { userId: user._id },
                            `${process.env.KEY_TOKEN}`,
                            { expiresIn: "24h" }
                        ),
                    });
                })
                .catch((error) => {
                    res.status(501).json({ error: error.message });
                });
        })
        .catch((error) => {
            res.status(500).json({ error: error.message });
        });
};
