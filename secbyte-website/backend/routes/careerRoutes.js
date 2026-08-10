const express = require("express");
const Career = require("../models/Career");
const Application = require("../models/Application");
const upload = require("../middleware/upload");
const { protect } = require("../middleware/auth");

const router = express.Router();

// GET all open careers (public)
router.get("/", async (req, res) => {
  try {
    const careers = await Career.find({ isOpen: true }).sort({ createdAt: -1 });
    res.json({ success: true, data: careers });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET one career by slug (public)
router.get("/:slug", async (req, res) => {
  try {
    const career = await Career.findOne({ slug: req.params.slug });
    if (!career) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }
    res.json({ success: true, data: career });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET applications for a job (admin only)
router.get("/:slug/applications", protect, async (req, res) => {
  try {
    const career = await Career.findOne({ slug: req.params.slug });
    if (!career) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }
    const applications = await Application.find({ career: career._id }).sort({ createdAt: -1 });
    res.json({ success: true, data: applications });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET all applications across all jobs (admin only)
router.get("/applications/all", protect, async (req, res) => {
  try {
    const applications = await Application.find().populate("career", "title slug").sort({ createdAt: -1 });
    res.json({ success: true, data: applications });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST apply to a job - stays public, job seekers should not need to log in
router.post("/:slug/apply", upload.single("resume"), async (req, res) => {
  try {
    const career = await Career.findOne({ slug: req.params.slug });
    if (!career) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }
    if (!req.file) {
      return res.status(400).json({ success: false, message: "Resume file is required" });
    }

    const { fullName, email, phone, coverLetter } = req.body;
    const application = await Application.create({
      career: career._id,
      fullName,
      email,
      phone,
      coverLetter,
      resumeUrl: `/uploads/resumes/${req.file.filename}`,
    });

    res.status(201).json({ success: true, data: application });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// POST create a new career listing (admin only)
router.post("/", protect, async (req, res) => {
  try {
    const career = await Career.create(req.body);
    res.status(201).json({ success: true, data: career });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

module.exports = router;