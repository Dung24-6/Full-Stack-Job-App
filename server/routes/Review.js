const express = require("express");
const router = express.Router();
const ReviewController = require("../controllers/ReviewController");

router.get("/reviews/:companyId", ReviewController.getReviewsByCompanyId);

router.post("/reviews", ReviewController.createReview);

router.delete("/reviews/:reviewId", ReviewController.deleteReview);



module.exports = router;