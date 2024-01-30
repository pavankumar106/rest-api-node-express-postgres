const pool = require("../config/db");

exports.getStudents = async (req, res) => {
  try {
    // get students data
    const data = pool.query("SELECT * FROM students", (error, results) => {
      if (error) throw error;
      return res.status(200).json({
        success: true,
        message: "Students data fetched success",
        data: results.rows,
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

exports.getStudentById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    pool.query(
      "SELECT * FROM students WHERE id = $1",
      [id],
      (error, results) => {
        if (error) throw error;
        return res.status(200).json({
          success: true,
          message: "Student data fetched success",
          data: results.rows,
        });
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

exports.addStudent = async (req, res) => {
  try {
    // get data
    const { name, email, age, dob } = req.body;
    // validate
    if (!name || !email || !age || !dob) {
      return res.status(401).json({
        success: false,
        message: "All fields are required",
      });
    }
    // check if user exists with given email
    pool.query(
      "SELECT * FROM students WHERE email = $1",
      [email],
      (error, results) => {
        if (results.rows.length) {
          return res.status(401).json({
            success: false,
            message: "User already exists with this email",
          });
        }

        // add students to db
        pool.query(
          "INSERT INTO students (name, email,age, dob) VALUES($1,$2,$3,$4)",
          [name, email, age, dob],
          (error, results) => {
            if (error) {
              console.log(error);
              return res
                .status(500)
                .json({ success: false, message: "Error while adding to db" });
            }
            // else return success
            return res.status(201).json({
              success: true,
              message: "Student added",
              data: results.rows,
            });
          }
        );
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

exports.deleteStudent = async (req, res) => {
  try {
    // get id
    const id = parseInt(req.params.id);
    // write query
    pool.query(
      "SELECT * FROM students WHERE id = $1",
      [id],
      (error, results) => {
        if (!results.rows.length) {
          return res
            .status(404)
            .json({ success: false, message: "Student not found" });
        }

        // delete student
        pool.query(
          "DELETE FROM students WHERE id = $1",
          [id],
          (error, results) => {
            if (error) {
              return res
                .status(404)
                .json({ success: false, message: "Could not delete student" });
            }
            // return success
            return res.status(200).json({
              success: true,
              message: "Student deleted",
            });
          }
        );
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
