const router = require("express").Router();
const userRouter = require("./User");
const companyRouter = require("./Company");
const jobRouter = require("./Job");
const applicationRouter = require("./Application");
const uploadRouter = require("./Upload");
const reviewRouter = require("./Review");
const reportRouter = require("./Report");
const countRouter = require("./Count");

router.use("/users", userRouter);
router.use("/company", companyRouter);
router.use("/job", jobRouter);
router.use("/application", applicationRouter);
router.use("/upload", uploadRouter);
router.use("/review",reviewRouter);
router.use("/report", reportRouter);
router.use("/count", countRouter);
module.exports = router;
