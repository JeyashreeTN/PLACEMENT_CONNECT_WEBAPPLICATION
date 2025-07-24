// server.js (Final merged and corrected)

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const dialogflow = require("@google-cloud/dialogflow");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Dialogflow setup
const PROJECT_ID = 'my-application-2ea8d';
const SESSION_ID = '123456';
//const CREDENTIALS = JSON.parse(
  //fs.readFileSync(path.join(__dirname, 'dialogflow-key.json'))
//);

// MongoDB Connection
mongoose
  .connect("mongodb://localhost:27017/admin")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1);
  });

// Schemas and Models
const adminSchema = new mongoose.Schema({
  adminid: { type: String, required: true, unique: true },
  adminname: { type: String },
  apassword: { type: String, required: true },
  aemail: { type: String },
  amobile: { type: String },
});

const studentSchema = new mongoose.Schema({
  studentid: { type: String, required: true, unique: true },
  studentname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  mobile: { type: String, required: true },
  cgpa: { type: Number, required: true },
  skills: { type: [String], default: [] },
  academicYear: { type: String, required: true },
  address: { type: String, required: true },
  companyDetails: [
    {
      companyName: { type: String, required: true },
      position: { type: String, required: true },
      status: { type: String, required: true },
    },
  ],
});

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, default: "" },
  experience: { type: String, default: "0" },
  skills: { type: String, required: true },
  recruiterEmail: { type: String, required: true },
});

const Admin = mongoose.model("users", adminSchema);
const Student = mongoose.model("students", studentSchema);
const Job = mongoose.model("jobs", jobSchema);

// Admin routes
app.post("/admin/register", async (req, res) => {
  const { adminid, apassword, adminname, aemail, amobile } = req.body;
  if (!adminid || !apassword || !adminname || !aemail || !amobile)
    return res.status(400).json({ error: "All fields are required." });

  try {
    const exists = await Admin.findOne({ adminid });
    if (exists) return res.status(400).json({ error: "Admin already exists" });

    const admin = new Admin({ adminid, apassword, adminname, aemail, amobile });
    await admin.save();
    res.status(201).json({ message: "Admin registered successfully" });
  } catch (e) {
    res.status(500).json({ error: "Server error" });
  }
});

app.post("/admin/login", async (req, res) => {
  const { adminid, apassword } = req.body;
  const admin = await Admin.findOne({ adminid });
  if (!admin || admin.apassword !== apassword)
    return res.status(400).json({ error: "Invalid credentials" });
  res.json({ message: "Login successful", admin });
});

app.get("/admin/students", async (_, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (e) {
    res.status(500).json({ error: "Server error" });
  }
});

// Job routes
app.get("/admin/jobs", async (_, res) => {
  try {
    const jobs = await Job.find();
    res.json(jobs);
  } catch (e) {
    res.status(500).json({ error: "Failed to fetch jobs" });
  }
});

app.post("/admin/jobs", async (req, res) => {
  const { title, description, experience, skills, recruiterEmail } = req.body;
  if (!title || !skills || !recruiterEmail)
    return res.status(400).json({ error: "Missing required fields" });
  try {
    const job = new Job({ title, description, experience, skills, recruiterEmail });
    await job.save();
    res.status(201).json({ message: "Job added successfully" });
  } catch (e) {
    res.status(500).json({ error: "Failed to add job" });
  }
});

app.delete("/admin/jobs/:id", async (req, res) => {
  try {
    await Job.findByIdAndDelete(req.params.id);
    res.json({ message: "Job deleted successfully" });
  } catch (e) {
    res.status(500).json({ error: "Failed to delete job" });
  }
});

// Student routes
app.post("/student/register", async (req, res) => {
  const { studentid, spassword, studentname, semail, smobile, cgpa, skills, academicYear, address } = req.body;
  if (!studentid || !spassword || !studentname || !semail || !smobile || !cgpa || !academicYear || !address)
    return res.status(400).json({ error: "All fields are required." });

  try {
    const exists = await Student.findOne({ studentid });
    if (exists) return res.status(400).json({ error: "Student already exists" });

    const student = new Student({
      studentid,
      password: spassword,
      studentname,
      email: semail,
      mobile: smobile,
      cgpa:Number(cgpa),
      skills,
      academicYear,
      address,
    });
    await student.save();
    res.status(201).json({ message: "Student registered successfully" });
  } catch (e) {
    res.status(500).json({ error: "Server error" });
  }
});

app.post("/student/login", async (req, res) => {
  const { studentid, spassword } = req.body;
  const student = await Student.findOne({ studentid });
  if (!student || student.password !== spassword)
    return res.status(401).json({ error: "Invalid credentials" });
  res.json({ message: "Login successful", student });
});

// Dashboard + Company Details (get, post, update, delete)
app.get("/student/dashboard/:studentid", async (req, res) => {
  try {
    const student = await Student.findOne({ studentid: req.params.studentid });
    if (!student) return res.status(404).json({ error: "Student not found" });
    res.json(student);
  } catch (e) {
    res.status(500).json({ error: "Server error" });
  }
});

app.post("/student/:studentid/companyDetails", async (req, res) => {
  const { studentid } = req.params;
  const { companyName, position, status } = req.body;

  try {
    const student = await Student.findOne({ studentid });
    if (!student) return res.status(404).json({ error: "Student not found" });
    student.companyDetails.push({ companyName, position, status });
    await student.save();
    res.status(201).json({ message: "Company added" });
  } catch (e) {
    res.status(500).json({ error: "Server error" });
  }
});

app.put("/student/:studentid/company/:companyid", async (req, res) => {
  const { studentid, companyid } = req.params;
  const { companyName, position, status } = req.body;
  try {
    const student = await Student.findOneAndUpdate(
      { studentid, "companyDetails._id": companyid },
      {
        $set: {
          "companyDetails.$.companyName": companyName,
          "companyDetails.$.position": position,
          "companyDetails.$.status": status,
        },
      },
      { new: true }
    );
    if (!student) return res.status(404).json({ error: "Not found" });
    res.json({ message: "Updated", student });
  } catch (e) {
    res.status(500).json({ error: "Server error" });
  }
});

app.delete("/student/:studentid/company/:companyid", async (req, res) => {
  const { studentid, companyid } = req.params;
  try {
    const student = await Student.findOneAndUpdate(
      { studentid },
      { $pull: { companyDetails: { _id: companyid } } },
      { new: true }
    );
    if (!student) return res.status(404).json({ error: "Student not found" });
    res.json({ message: "Deleted", student });
  } catch (e) {
    res.status(500).json({ error: "Server error" });
  }
});

// Dialogflow Chatbot
async function sendToDialogflow(message) {
  const sessionClient = new dialogflow.SessionsClient({ credentials: CREDENTIALS });
  const sessionPath = sessionClient.projectAgentSessionPath(PROJECT_ID, SESSION_ID);
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: message,
        languageCode: "en",
      },
    },
  };
  const responses = await sessionClient.detectIntent(request);
  return responses[0].queryResult.fulfillmentText;
}

app.post("/chatbot", async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) return res.status(400).json({ error: "Message is required" });
    const reply = await sendToDialogflow(message);
    res.json({ response: reply });
  } catch (e) {
    res.status(500).json({ error: "Chatbot error" });
  }
});

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
