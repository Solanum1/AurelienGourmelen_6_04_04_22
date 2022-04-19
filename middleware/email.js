//Contrôle du format de l'adresse email lors de l'inscription
module.exports = (req, res, next) => {
    const email = new RegExp(
        "^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9._-]+[.][a-z]{2,8}$",
        "g"
    );
    //Méthode test pour comparer la RegExp et l'email saisi dans la requête
    const testEmail = email.test(req.body.email);
    if (!testEmail) {
        return res.status(400).json({
            message:
                "Merci de renseigner une adresse email valide, par exemple : adresse@gmail.com",
        });
    } else {
        next();
    }
};
