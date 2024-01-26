// Les routes pour les utilisateurs
const express = require("express");
const router = express.Router();
const userCtrl = require("./UserControllers");

router.get("/users", userCtrl.getAllUsers);
// router.get("/verify", userCtrl.verifyToken);

module.exports = router;
