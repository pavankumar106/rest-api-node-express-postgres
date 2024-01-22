const express = require("express");
const router = express.Router();
const { getStudents } = require("../controllers/Students");

router.route("/").get(getStudents);

module.exports = router;
