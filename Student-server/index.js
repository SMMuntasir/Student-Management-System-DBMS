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

app.get("/assignments/:SID", async (req, res) => {
  const { SID } = req.params;

  try {
    const query = `
      SELECT assignment_name, due_date
      FROM assignment
      WHERE student_id = ? OR student_id = '1'
    `;

    const [assignments] = await pool.execute(query, [SID]);

    if (assignments.length === 0) {
      return res.status(404).json({ message: "No assignments found" });
    }

    res.status(200).json(assignments);
  } catch (error) {
    console.error("Error fetching assignments:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Fetch all messages
app.get("/messages", async (req, res) => {
  try {
    const query = `
      SELECT 
        m.message_id, 
        m.message_content, 
        m.timestamp, 
        s.SID AS student_id, 
        s.name AS student_name -- Assuming there's a 'name' column in the 'student' table
      FROM message m
      JOIN student s ON m.student_id = s.SID
      ORDER BY m.timestamp DESC
    `;

    const [messages] = await pool.execute(query);

    if (messages.length === 0) {
      return res.status(404).json({ message: "No messages found" });
    }

    res.status(200).json(messages);
  } catch (error) {
    console.error("Error fetching all messages:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Route to send a message
app.post("/messages", async (req, res) => {
  const { student_id, message_content } = req.body;

  if (!student_id || !message_content) {
    return res.status(400).json({ message: "Student ID and message content are required" });
  }

  try {
    const query = `
      INSERT INTO message (student_id, message_content)
      VALUES (?, ?)
    `;
    const [result] = await pool.execute(query, [student_id, message_content]);

    res.status(201).json({
      message: "Message sent successfully",
      data: { message_id: result.insertId, student_id, message_content },
    });
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
