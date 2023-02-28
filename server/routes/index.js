const router = require("express").Router();
const userRouter = require("./User");
const companyRouter = require("./Company");
const jobRouter = require("./Job");

router.use("/users", userRouter);
router.use("/company", companyRouter);
router.use("/job", jobRouter);

module.exports = router;
