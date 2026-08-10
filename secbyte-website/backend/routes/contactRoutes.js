const express = require("express");
const Contact = require("../models/Contact");
const { protect } = require("../middleware/auth");

const router = express.Router();

// POST - submit the public contact form (public, no login needed)
router.post("/", async (req, res) => {
  try {
    const { fullName, email, message } = req.body;
    if (!fullName || !email || !message) {
      return res.status(400).json({ success: false, message: "Full name, email and message are required" });
    }
    const contact = await Contact.create(req.body);
    res.status(201).json({ success: true, data: contact });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// GET - list all contact submissions (admin only)
router.get("/", protect, async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json({ success: true, data: contacts });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;