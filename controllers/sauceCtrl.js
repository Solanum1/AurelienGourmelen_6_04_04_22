//----------------Importations--------------------------------
const Sauce = require("../models/Sauce");
const fs = require("fs");

//----------------Logique métier des sauces-------------------

//Récupérer et lire toutes les sauces - méthode find
exports.getAllSauces = (req, res, next) => {
    Sauce.find()
        .then((sauces) => res.status(200).json(sauces))
        .catch((error) => res.status(400).json({ error }));
};

//Récupérer et lire une sauce spécifique - méthode findOne
exports.getSingleSauce = (req, res, next) => {
    //Accès à la sauce avec req.params.id car paramètre de route dynamique
    Sauce.findOne({ _id: req.params.id })
        .then((sauce) => res.status(200).json(sauce))
        .catch((error) => res.status(404).json({ error }));
};

//Créer une nouvelle sauce - méthode save
exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    const sauce = new Sauce({
        ...sauceObject,
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
            req.file.filename
        }`,
    });
    sauce
        .save()
        .then(() =>
            res
                .status(201)
                .json({ message: "Sauce enregistrée dans la base de données" })
        )
        .catch((error) => res.status(400).json({ error: error.message }));
};

//Modifier une sauce - méthode updateOne
exports.updateSauce = (req, res, next) => {
    const sauceObject = req.file
        ? {
              ...JSON.parse(req.body.sauce),
              imageUrl: `${req.protocol}://${req.get("host")}/images/${
                  req.file.filename
              }`,
          }
        : { ...req.body };
    Sauce.updateOne(
        { _id: req.params.id },
        { ...sauceObject, _id: req.params.id }
    )
        .then(() => res.status(200).json({ message: "Sauce modifiée" }))
        .catch((error) => res.status(400).json({ error }));
};

//Supprimer une sauce - méthode deleteOne
exports.deleteSauce = (req, res, next) => {
    //On trouve l'objet dans la base de données
    Sauce.findOne({ _id: req.params.id })
        .then((sauce) => {
            //On extrait le nom du fichier à supprimer
            const filename = sauce.imageUrl.split("/images/")[1];
            //On supprime le fichier
            fs.unlink(`images/${filename}`, () => {
                //Suppression de l'objet dans la base de données
                Sauce.deleteOne({ _id: req.params.id })
                    .then(() =>
                        res.status(200).json({ message: "Sauce supprimée" })
                    )
                    .catch((error) => res.status(400).json({ error }));
            });
        })
        .catch((error) => res.status(500).json({ error }));
};
