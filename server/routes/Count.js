const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");
const ApplicationController = require("../controllers/ApplicationController");
const JobController = require("../controllers/JobController");
const CompanyController = require("../controllers/CompanyController");
const checkAdmin = require("../middleware/checkAdmin");

router.get("/countUsers", UserController.countUsers);

router.get("/countApplication", ApplicationController.getCountApplications);

router.get("/countJob", JobController.getJobCount);

router.get("/countCompany", CompanyController.getCompanyCount);

module.exports = router;
