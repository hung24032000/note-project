const express = require("express");
const router = express.Router();
const UserModel = require("../app/models/UserModel");
const authController = require("../app/controller/AuthController");
const verifyToken = require("../../middleware/auth");

router.get("/", verifyToken, authController.index);

router.post("/register", authController.store);
router.post("/login", authController.login);

module.exports = router;
