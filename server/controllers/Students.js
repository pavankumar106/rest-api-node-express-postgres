const pool = require("../config/db");

exports.getStudents = async (req, res) => {
  try {
    // get students data
    const data = pool.query("SELECT * FROM students", (error, results) => {
      if (error) throw error;
      res.status(200).json({
        success: true,
        message: "Students data fetched true",
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
