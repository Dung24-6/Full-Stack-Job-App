const express = require("express");
const router = express.Router();
const ApplicationController = require("../controllers/ApplicationController");

router.get("/", (req, res) => {
  res.json("Route Application oke");
});

router.post("/", ApplicationController.applyJob);

module.exports = router;
