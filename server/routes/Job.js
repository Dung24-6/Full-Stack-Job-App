const express = require("express");
const router = express.Router();
const JobController = require("../controllers/JobController");

router.post("/createJob", JobController.createJob);

router.get("/searchJobByLocation", JobController.searchJobByLocations);

router.get("/searchJob", JobController.searchJob);


module.exports = router;
