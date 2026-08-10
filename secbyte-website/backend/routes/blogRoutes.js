const express = require("express");
const Blog = require("../models/Blog");
const { protect } = require("../middleware/auth");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const posts = await Blog.find({ isPublished: true }).sort({ createdAt: -1 });
    res.json({ success: true, data: posts });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.get("/:slug", async (req, res) => {
  try {
    const post = await Blog.findOne({ slug: req.params.slug });
    if (!post) return res.status(404).json({ success: false, message: "Post not found" });
    res.json({ success: true, data: post });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.post("/", protect, async (req, res) => {
  try {
    const post = await Blog.create(req.body);
    res.status(201).json({ success: true, data: post });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

router.put("/:id", protect, async (req, res) => {
  try {
    const post = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!post) return res.status(404).json({ success: false, message: "Post not found" });
    res.json({ success: true, data: post });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

router.delete("/:id", protect, async (req, res) => {
  try {
    const post = await Blog.findByIdAndDelete(req.params.id);
    if (!post) return res.status(404).json({ success: false, message: "Post not found" });
    res.json({ success: true, data: {} });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;