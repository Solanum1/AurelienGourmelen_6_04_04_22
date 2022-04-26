//--------------------------Importations--------------------------

//Application express et création d'un routeur
const express = require("express");
const router = express.Router();

//importation du middleware authorize pour la validation des tokens
const auth = require("../middleware/auth");

//importation du middleware multer pour la gestion les fichiers entrants
const multer = require("../middleware/mutler-config");

//importation du controller sauce
const sauceCtrl = require("../controllers/sauceCtrl");

//importation du controlleur like
const likeCtrl = require("../controllers/likeCtrl");

//--------------------------Routers-------------------------------

router.post("/", auth, multer, sauceCtrl.createSauce);
router.put("/:id", auth, multer, sauceCtrl.updateSauce);
router.get("/", auth, sauceCtrl.getAllSauces);
router.get("/:id", auth, sauceCtrl.getSingleSauce);
router.delete("/:id", auth, sauceCtrl.deleteSauce);
router.post("/:id/like", auth, likeCtrl.likeSauce);

//--------------------------Exportation---------------------------

//On exporte le router de ce fichier
module.exports = router;
