const express = require("express");
const router = express.Router();
const JobController = require("../controllers/JobController");

router.post("/createJob", JobController.createJob);

module.exports = router;
