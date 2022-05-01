//----------------Importations--------------------------------
const Sauce = require("../models/Sauce");

//----------------Logique métier des likes -------------------

exports.likeSauce = async (req, res, next) => {
    try {
        const sauce = await Sauce.findOne({ _id: req.params.id });
        //L'utilisateur ajoute un like | like = 1
        //Contrôle que l'userId n'est pas déjà présent dans le tableau des utilisateurs qui ont aimé
        if (
            !sauce.usersLiked.includes(req.body.userId) &&
            req.body.like === 1
        ) {
            try {
                await Sauce.updateOne(
                    { _id: req.params.id },
                    {
                        $inc: { likes: 1 },
                        $push: { usersLiked: req.body.userId },
                    }
                );
                return res
                    .status(201)
                    .json({ message: "+1 like sur la sauce" });
            } catch (error) {
                return res.status(401).json({
                    error: error.message,
                });
            }
        }

        //L'utilisateur annule son like | like = 0
        //Contrôle que l'userId est dans le tableau des utilisateurs qui ont aimé
        if (sauce.usersLiked.includes(req.body.userId) && req.body.like === 0) {
            Sauce.updateOne(
                { _id: req.params.id },
                {
                    $inc: { likes: -1 },
                    $pull: { usersLiked: req.body.userId },
                }
            )
                .then(() => {
                    res.status(201).json({ message: "Vote annulé" });
                })
                .catch((error) =>
                    res.status(400).json({
                        error: error.message,
                    })
                );
        }
        //L'utilisateur ajoute un dislike | dislike = 1
        //Contrôle que l'userId n'est pas déjà présent dans le tableau des utilisateurs qui ont disliké
        if (
            !sauce.usersDisliked.includes(req.body.userId) &&
            req.body.like === -1
        ) {
            Sauce.updateOne(
                { _id: req.params.id },
                {
                    $inc: { dislikes: 1 },
                    $push: { usersDisliked: req.body.userId },
                }
            )
                .then(() => {
                    res.status(201).json({
                        message: "+1 dislike sur la sauce",
                    });
                })
                .catch((error) =>
                    res.status(400).json({
                        error: error.message,
                    })
                );
        }
        //L'utilisateur annule son dislike | dislike = 0
        //Contrôle que l'userId est dans le tableau des utilisateurs qui ont disliké
        if (
            sauce.usersDisliked.includes(req.body.userId) &&
            req.body.like === 0
        ) {
            Sauce.updateOne(
                { _id: req.params.id },
                {
                    $inc: { dislikes: -1 },
                    $pull: { usersDisliked: req.body.userId },
                }
            )
                .then(() => {
                    res.status(201).json({ message: "Vote annulé" });
                })
                .catch((error) =>
                    res.status(400).json({
                        error: error.message,
                    })
                );
        }
    } catch (error) {
        return res.status(404).json({
            error: error,
            message: "Action impossible",
        });
    }
};
