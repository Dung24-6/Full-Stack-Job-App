const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");

router.get("/", UserController.getALLUsers);

router.get("/:userId", UserController.getById);

router.post("/register", UserController.registerUser);

router.delete("/:userId", UserController.deleteUser);

router.post("/login", UserController.loginUser);

router.post("/logout", UserController.logoutUser);

router.post("/privateLogin", UserController.privateLogin);

module.exports = router;
