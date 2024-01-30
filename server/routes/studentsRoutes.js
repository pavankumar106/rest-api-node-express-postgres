const express = require("express");
const router = express.Router();
const {
  getStudents,
  getStudentById,
  addStudent,
  deleteStudent,
} = require("../controllers/Students");

router.route("/").get(getStudents);
router.route("/:id").get(getStudentById);
router.route("/").post(addStudent);
router.route("/:id").delete(deleteStudent);

module.exports = router;
