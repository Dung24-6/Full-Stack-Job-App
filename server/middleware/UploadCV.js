const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/cv");
  },
  filename: function (req, file, cb) {
    cb(null, "cv_" + req.session.user.userId + path.extname(file.originalname));
  },
});

const fileFilter = function (req, file, cb) {
  let ext = path.extname(file.originalname);
  if (ext == ".pdf") {
    cb(null, true);
  } else {
    cb(new Error("Only cv are allowed"));
  }
};

const uploadCV = multer({ storage: storage, fileFilter: fileFilter });

module.exports = uploadCV;
