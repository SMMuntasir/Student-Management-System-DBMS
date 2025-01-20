// > Md.Nazim Uddin:
const express = require("express");
const cors = require("cors");
const { client } = require('pg')
const mysql = require("mysql2/promise"); // Using promise-based MySQL client
const app = express();
const port = process.env.PORT || 5000;
require("dotenv").config();

// Middleware
app.use(cors());
app.use(express.json());

// MySQL Database Connection
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: '',
  database:  "studentmanage",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Test database connection
(async () => {
  try {
    const connection = await pool.getConnection();
    console.log("Connected to MySQL database!");
    connection.release();
  } catch (error) {
    console.error("Error connecting to MySQL:", error);
  }
})();

// Routes
app.get("/", (req, res) => {
  res.send("MySQL");
});

app.get("/students", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM student");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error fetching students" });
  }
});

app.get("/performance/:SID", async (req, res) => {
  const { SID } = req.params;

  try {
    const [performanceData] = await pool.execute(
      `SELECT * FROM performance WHERE SID = ?`,
      [SID]
    );

    if (performanceData.length === 0) {
      return res.status(404).json({ message: "Performance data not found" });
    }

    res.status(200).json(performanceData[0]); // Send the first (and only) performance record
  } catch (error) {
    console.error("Error fetching performance data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post('/assignments', async (req, res) => {
  const { assignment_name, due_date, student_id } = req.body;

  try {
    // Check if the student exists in the 'student' table
    const [rows] = await pool.execute('SELECT * FROM student WHERE SID = ?', [student_id]);

    if (rows.length === 0) {
      return res.status(400).json({ message: "Student ID does not exist!" });
    }

    const query = `
      INSERT INTO assignment (assignment_name, due_date, student_id)
      VALUES (?, ?, ?)
    `;

    const [result] = await pool.execute(query, [assignment_name, due_date, student_id]);

    res.status(201).json({
      message: 'Assignment added successfully',
      data: result, // This will contain the insertion result
    });
  } catch (error) {
    console.error('Error adding assignment:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});




// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
