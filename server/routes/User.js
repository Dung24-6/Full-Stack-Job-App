const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");
const uploadAvatar = require("../middleware/UploadAvatar");
const uploadCV = require("../middleware/UploadCV");

router.get("/", UserController.getALLUsers);

router.get("/:userId", UserController.getById);

router.post("/register", UserController.registerUser);

router.delete("/:userId", UserController.deleteUser);

router.post("/login", UserController.loginUser);

router.post("/logout", UserController.logoutUser);

router.post("/privateLogin", UserController.privateLogin);

module.exports = router;
