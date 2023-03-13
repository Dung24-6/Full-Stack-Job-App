const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json("Route Application oke");
});

module.exports = router;
