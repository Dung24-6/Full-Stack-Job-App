const express = require("express");
const router = express.Router();
const CompanyController = require("../controllers/CompanyController");

router.get("/", CompanyController.getALLCompany);

router.get("/:companyId", CompanyController.getById);

router.post("/register", CompanyController.registerCompany);

router.delete("/:companyId", CompanyController.deleteCompany);

router.post("/login", CompanyController.loginCompany);

router.post("/logout", CompanyController.logoutCompany);

module.exports = router;
