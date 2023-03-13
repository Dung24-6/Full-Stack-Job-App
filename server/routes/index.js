const router = require("express").Router();
const userRouter = require("./User");
const companyRouter = require("./Company");
const jobRouter = require("./Job");
const applicationRouter = require("./Application");

router.use("/users", userRouter);
router.use("/company", companyRouter);
router.use("/job", jobRouter);
router.use("/application", applicationRouter);

module.exports = router;
