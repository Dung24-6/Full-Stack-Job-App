const express = require("express");
const router = express.Router();
const ApplicationController = require("../controllers/ApplicationController");

router.get("/", (req, res) => {
  res.json("Route Application oke");
});

router.post("/", ApplicationController.applyJob);

router.get("/user", ApplicationController.getApplyJobByUserId);

router.get("/company", ApplicationController.getApplyJobByCompany);

router.delete("/:applicationId", ApplicationController.deleteApplyJob);

router.get("/:applicationId", ApplicationController.getApplyJobByApplyId);

module.exports = router;
