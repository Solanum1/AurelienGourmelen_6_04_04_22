//Importation de password-validator
const passwordValidator = require("password-validator");

//Création du schéma
const passwordSchema = new passwordValidator();

//Conditions de validation pour le mot de passe
passwordSchema
    .is()
    .min(8) // Minimum 8 caractères
    .is()
    .max(30) // Maximum 30 caractères
    .has()
    .uppercase(2) // Doit avoir deux majuscules
    .has()
    .lowercase() // Doit avoir des minuscules
    .has()
    .digits(2) // Doit avoir au minimum 2 chiffres
    .has()
    .not()
    .spaces() // Pas d'espaces
    .is()
    .not()
    .oneOf(["Passw0rd", "Password123", "123456", "Azerty123"]); // Blacklist ces mots de passe

module.exports = (req, res, next) => {
    if (!passwordSchema.validate(req.body.password)) {
        return res.status(403).json({
            message:
                "Votre mot de passe n'est pas assez sécurisé : pour qu'il soit valide il doit contenir entre 8 et 30 caractères, au moins 2 chiffres, 2 majuscules et des minuscules",
        });
    } else {
        next();
    }
};
