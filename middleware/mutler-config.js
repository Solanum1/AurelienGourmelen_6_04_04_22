//Déclaration de multer - package qui permet de gérer les fichiers entrants dans les requêtes HTTP
const multer = require("multer");

//Dictionnaire
const MIME_TYPES = {
    "image/jpg": "jpg",
    "image/jpeg": "jpg",
    "image/png": "png",
    "image/gif": "gif",
};
// Création de la constante storage, à passer à multer pour lui indiquer où enregistrer les fichiers entrants
const storage = multer.diskStorage({
    //Fonction destination : indique à multer d'enregistrer les fichiers dans le dossier images (second argument de la callback)
    destination: (req, file, callback) => {
        callback(null, "images");
    },
    //Fonction filename : génère un nouveau nom de fichier
    filename: (req, file, callback) => {
        //indique à multer d'utiliser le nom d'origine et de remplacer les espaces par des underscores
        const name = file.originalname.split(" ").join("_");
        //utilisation des mine_types du dictionnaire pour générer l'extension du fichier
        const extension = MIME_TYPES[file.mimetype];
        //ajoute un timestamp
        callback(null, name + Date.now() + "." + extension);
    },
});
//Export de l'élément multer configuré
//Méthode single créé un middleware qui capture les fichiers d'un certain type, et les enregistre au système de fichiers du serveur à l'aide du storage configuré
mudule.exports = multer({ storage }).single("image");
