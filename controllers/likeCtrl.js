//----------------Importations--------------------------------
const Sauce = require("../models/Sauce");

//----------------Logique métier des likes -------------------

exports.likeSauce = (req, res, next) => {
    switch (req.body.like) {
        case 1:
            Sauce.updateOne(
                { _id: req.params.id },
                {
                    $inc: { likes: +1 },
                    $push: { usersLiked: req.body.userId },
                }
            )
                .then(() =>
                    res.status(201).json({ message: "+1 like sur la sauce" })
                )
                .catch((error) =>
                    res.status(400).json({ error: error.message })
                );
            break;

        //L'utilisateur ajoute un dislike | like = -1 | dislike = +1
        case -1:
            Sauce.updateOne(
                { _id: req.params.id },
                {
                    $inc: { dislikes: +1 },
                    $push: { usersDisliked: req.body.userId },
                }
            )
                .then(() =>
                    res.status(201).json({
                        message: "+1 dislike sur la sauce",
                    })
                )
                .catch((error) =>
                    res.status(400).json({ error: error.message })
                );
            break;
        case 0:
            Sauce.findOne({ _id: req.params.id })
                .then((sauce) => {
                    //L'utilisateur annule son like | like = 0
                    if (sauce.usersLiked.includes(req.body.userId)) {
                        Sauce.updateOne(
                            { _id: req.params.id },
                            {
                                $inc: { likes: -1 },
                                $pull: { usersLiked: req.body.userId },
                            }
                        )
                            .then(() =>
                                res
                                    .status(201)
                                    .json({ message: "0 like sur la sauce" })
                            )
                            .catch((error) =>
                                res.status(400).json({ error: error.message })
                            );
                        //L'utilisateur annule son dislike | dislike = 0
                    } else if (sauce.usersDisliked.includes(req.body.userId)) {
                        Sauce.updateOne(
                            { _id: req.params.id },
                            {
                                $inc: { dislikes: -1 },
                                $pull: { usersDisliked: req.body.userId },
                            }
                        )
                            .then(() =>
                                res
                                    .status(201)
                                    .json({ message: "0 dislike sur la sauce" })
                            )
                            .catch((error) =>
                                res.status(400).json({ error: error.message })
                            );
                    } else {
                        res.status(403).json({ message: "requête impossible" });
                    }
                })
                .catch((error) =>
                    res.status(404).json({ error: error.message })
                );
            break;
    }
};
