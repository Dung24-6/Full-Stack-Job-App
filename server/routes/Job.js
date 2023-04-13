const express = require("express");
const router = express.Router();
const JobController = require("../controllers/JobController");
const checkAdmin = require("../middleware/checkAdmin");
router.post("/createJob", JobController.createJob);

router.get("/searchJobByLocation", JobController.searchJobByLocations);

router.get("/searchJob", JobController.searchJob);

router.get("/searchJobById/:jobId", JobController.searchJobById);

router.get("/searchJobByCompany/:companyId", JobController.searchJobByCompany);

router.get("/searchAllJob", JobController.searchAllJob);

router.delete("/:jobId", JobController.deleteJob);

router.get("/getJobCount", checkAdmin.checkAdmin, JobController.getJobCount);

module.exports = router;
