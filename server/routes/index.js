const router = require("express").Router();
const userRouter = require("./User");
const companyRouter = require("./Company");

router.use("/users", userRouter);
router.use("/company", companyRouter);

module.exports = router;
