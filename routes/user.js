//--------------------------Importations--------------------------

const express = require("express");
const router = express.Router();

const userCtrl = require("../controllers/user");

//--------------------------Router-------------------------------

router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);

//--------------------------Exportation--------------------------
module.exports = router;