const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");
const checkAdmin = require("../middleware/checkAdmin");

router.get("/", UserController.getALLUsers);

router.get("/:userId", UserController.getById);

router.post("/register", UserController.registerUser);

router.delete("/:userId", UserController.deleteUser);

router.post("/login", UserController.loginUser);

router.post("/logout", UserController.logoutUser);

router.post("/privateLogin", UserController.privateLogin);

router.put("/updateUser", UserController.updateUser);

router.get("/countUsers", checkAdmin.checkAdmin, UserController.countUsers);

module.exports = router;
