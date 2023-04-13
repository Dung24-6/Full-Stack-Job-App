const express = require("express");
const router = express.Router();
const ReportController = require("../controllers/ReportController");

router.get("/", (req, res) => {
  res.send("Hello World!");
});

router.post("/reviews/:reviewId", ReportController.reportReview);

router.get("/reviews/:reviewId", ReportController.getReportsByReviewId);

router.delete("/:reportId", ReportController.deleteReport);

router.get("/", ReportController.getAllReport);

router.get("/:reportId", ReportController.getReportByID);

module.exports = router;
