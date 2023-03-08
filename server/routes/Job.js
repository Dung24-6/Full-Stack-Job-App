const express = require("express");
const router = express.Router();
const JobController = require("../controllers/JobController");

router.post("/createJob", JobController.createJob);

router.get("/searchJobByLocation", JobController.searchJobByLocations);

module.exports = router;
