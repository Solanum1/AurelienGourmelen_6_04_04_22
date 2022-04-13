//----------------Importations--------------------------------
const Sauce = require("../models/Sauce");

//----------------Logique métier des likes -------------------

exports.likeSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then((sauce) => {
            //L'utilisateur ajoute un like | like = +1
            if (
                !sauce.usersLiked.includes(req.body.userId) &&
                req.body.like == 1
            ) {
                Sauce.updateOne(
                    { _id: req.params.id },
                    {
                        $inc: { likes: 1 },
                        $push: { usersLiked: req.body.userId },
                    }
                )
                    .then(() =>
                        res
                            .status(201)
                            .json({ message: "+1 like sur la sauce" })
                    )
                    .catch((error) =>
                        res.status(400).json({ error: error.message })
                    );
            }

            //L'utilisateur annule son like | like = 0
            if (
                !sauce.usersLiked.includes(req.body.userId) &&
                req.body.like == 0
            ) {
                Sauce.updateOne(
                    { _id: req.params.id },
                    {
                        $inc: { likes: -1 },
                        $pull: { usersLiked: req.body.userId },
                    }
                )
                    .then(() =>
                        res.status(201).json({ message: "0 like sur la sauce" })
                    )
                    .catch((error) =>
                        res.status(400).json({ error: error.message })
                    );
            }

            //L'utilisateur ajoute un dislike | like = -1 | dislike = +1
            if (
                !sauce.usersDisliked.includes(req.body.userId) &&
                req.body.like == -1
            ) {
                Sauce.updateOne(
                    { _id: req.params.id },
                    {
                        $inc: { dislikes: 1 },
                        $push: { usersDisliked: req.body.userId },
                    }
                )
                    .then(() =>
                        res
                            .status(201)
                            .json({ message: "+1 dislike sur la sauce" })
                    )
                    .catch((error) =>
                        res.status(400).json({ error: error.message })
                    );
            }
            //L'utilisateur annule son dislike | dislike = 0
            if (
                !sauce.usersDisliked.includes(req.body.userId) &&
                req.body.like == 0
            ) {
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
            }
        })
        .catch((error) => res.status(404).json({ error: error.message }));
};
