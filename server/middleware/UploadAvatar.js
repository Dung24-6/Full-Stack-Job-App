const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../client/public/uploads/avatars");
  },
  filename: function (req, file, cb) {
    const session = JSON.parse(req.cookies.session);
    const userId = session.user.userId;
    cb(null, "avatar_" + userId + path.extname(file.originalname));
  },
});

const fileFilter = function (req, file, cb) {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only images are allowed"));
  }
};

const uploadAvatar = multer({ storage: storage, fileFilter: fileFilter });

module.exports = uploadAvatar;
