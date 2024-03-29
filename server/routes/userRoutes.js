const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { authenticateToken } = require("../auth.js");

//here I seperate each route for /users endpoint
router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.get("/userHomePage", authenticateToken, userController.homePageUser);
router.post("/expired", authenticateToken, userController.findExpiredDateUsers);

module.exports = router;