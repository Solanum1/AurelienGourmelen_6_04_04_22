const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

module.exports = (req, res, next) => {
    //instruction try catch regroupe des instructions à exécuter et définit une réponse si l'une de ces instructions provoque une exception
    try {
        //On récupère le token, second élément du tableau
        const token = req.headers.authorization.split(" ")[1];
        //On vérifie le token
        const decodedToken = jwt.verify(token, `${process.env.KEY_TOKEN}`);
        const userId = decodedToken.userId;
        req.auth = { userId };
        if (req.body.userId && req.body.userId !== userId) {
            throw "User ID non valable !";
        } else {
            next();
        }
    } catch (error) {
        res.status(401).json({ error: error | "Requête non authentifiée" });
    }
};
