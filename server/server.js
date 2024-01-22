const express = require("express");
const dotenv = require("dotenv");
const studentsRoutes = require("./routes/studentsRoutes");

const app = express();
dotenv.config();
app.use(express.json());

// default route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Hello from API",
  });
});

app.use("/api/v1/students", studentsRoutes);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log("Server is running on port", port);
});
