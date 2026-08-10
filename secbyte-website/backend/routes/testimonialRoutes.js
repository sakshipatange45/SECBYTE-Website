const express = require("express");
const Testimonial = require("../models/Testimonial");
const { protect } = require("../middleware/auth");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const items = await Testimonial.find({ isPublished: true }).sort({ createdAt: -1 });
    res.json({ success: true, data: items });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.post("/", protect, async (req, res) => {
  try {
    const item = await Testimonial.create(req.body);
    res.status(201).json({ success: true, data: item });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

module.exports = router;