require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");
const chatbotRoutes = require("./routes/chatbotRoutes");
const serviceRoutes = require("./routes/serviceRoutes");
const portfolioRoutes = require("./routes/portfolioRoutes");
const blogRoutes = require("./routes/blogRoutes");
const careerRoutes = require("./routes/careerRoutes");
const contactRoutes = require("./routes/contactRoutes");
const testimonialRoutes = require("./routes/testimonialRoutes");
const faqRoutes = require("./routes/faqRoutes");
const authRoutes = require("./routes/authRoutes");

connectDB();

const app = express();
app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:5173" }));
app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/api/health", (req, res) => {
  res.json({ success: true, message: "Secbyte API is running" });
});

app.use("/api/auth", authRoutes);
app.use("/api/chatbot", chatbotRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/portfolio", portfolioRoutes);
app.use("/api/blog", blogRoutes);
app.use("/api/careers", careerRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/testimonials", testimonialRoutes);
app.use("/api/faqs", faqRoutes);

app.use((err, req, res, next) => {
  const statusCode = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode).json({ success: false, message: err.message || "Server error" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Secbyte API listening on port ${PORT}`));