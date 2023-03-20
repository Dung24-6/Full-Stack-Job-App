const express = require("express");
const router = express.Router();
const UploadController = require("../controllers/UploadController");
const uploadAvatar = require("../middleware/UploadAvatar");
const uploadCV = require("../middleware/UploadCV");
const uploadLogo = require("../middleware/UploadLogo");

router.post(
  "/uploadAvatar",
  uploadAvatar.single("avatar"),
  UploadController.uploadAvatar
);

router.post("/uploadCV", uploadCV.single("cv"), UploadController.uploadCV);

router.post(
  "/uploadLogo",
  uploadLogo.single("logo"),
  UploadController.uploadLogo
);

module.exports = router;
