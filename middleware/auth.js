const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

//export du middleware
module.exports = (req, res, next) => {
    //instruction try catch regroupe des instructions à exécuter et définit une réponse si l'une de ces instructions provoque une exception
    try {
        //On récupère le token dans le header authorization, second élément du tableau (le premier est bearer), on split autour de l'espace
        const token = req.headers.authorization.split(" ")[1];
        //On vérifie le token avec la fonction verify de jwt, on vérifie le token et la clé secrète
        const decodedToken = jwt.verify(token, `${process.env.KEY_TOKEN}`);
        //On récupère le userId du token
        const userId = decodedToken.userId;
        //On attribue l'userId à l'objet requête | raccourci JS dans un objet, qui permet d'attribuer la valeur d'une variable à une clé du même nom
        // req.auth = { userId };
        //Si on a un userId dans le corps de la requête et que celui-ci est différent du userId alors on renvoie une erreur
        if (req.body.userId && req.body.userId !== userId) {
            throw "User ID non valable !";
        } else {
            next();
        }
    } catch (error) {
        res.status(401).json({ error: error | "Requête non authentifiée" });
    }
};
