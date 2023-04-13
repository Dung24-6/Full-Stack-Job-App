function checkAdmin(req, res, next) {
  const session = JSON.parse(req.cookies.session);
  const userRole = session.user.role;
  if (userRole === "admin") {
    // Nếu role của người dùng là admin, cho phép tiếp tục thực hiện request
    next();
  } else {
    // Nếu role của người dùng không phải là admin, chuyển hướng đến trang báo lỗi hoặc đăng nhập
    res.status(403).send("Access denied");
  }
}

module.exports = { checkAdmin };
