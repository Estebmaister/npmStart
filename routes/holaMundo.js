var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("holaMundo", {
    title: "Express",
    textoBienvenida: "tutorial de Express y Node.js",
  });
});

module.exports = router;
