const express = require("express")
const router = express.Router();
const UserController = require("../controllers/userControllers")

router.post("/register", UserController.register)
router.post("/login", UserController.login)
router.post("/logout", UserController.logout)

module.exports = router