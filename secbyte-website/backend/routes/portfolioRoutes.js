const express = require("express");
const Portfolio = require("../models/Portfolio");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const items = await Portfolio.find({ isPublished: true }).sort({ createdAt: -1 });
    res.json({ success: true, data: items });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.get("/:slug", async (req, res) => {
  try {
    const item = await Portfolio.findOne({ slug: req.params.slug });
    if (!item) {
      return res.status(404).json({ success: false, message: "Project not found" });
    }
    res.json({ success: true, data: item });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const item = await Portfolio.create(req.body);
    res.status(201).json({ success: true, data: item });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

module.exports = router;