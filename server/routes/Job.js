const express = require("express");
const router = express.Router();
const JobController = require("../controllers/JobController");

router.post("/createJob", JobController.createJob);

router.get("/searchJobByLocation", JobController.searchJobByLocations);

router.get("/searchJob", JobController.searchJob);

router.get("/searchJobById/:jobId", JobController.searchJobById);

router.get("/searchJobByCompany/:companyId", JobController.searchJobByCompany);


module.exports = router;
