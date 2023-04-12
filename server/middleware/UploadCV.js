const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../client/public/uploads/cv");
  },
  filename: function (req, file, cb) {
    const session = JSON.parse(req.cookies.session);
    const userId = session.user.userId;
    cb(null, "cv_" + userId + ".pdf");
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
