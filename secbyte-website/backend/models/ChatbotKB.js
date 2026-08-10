const mongoose = require("mongoose");

const chatbotKBSchema = new mongoose.Schema(
  {
    question: { type: String, required: true },
    answer: { type: String, required: true },
    keywords: [{ type: String }],
    category: { type: String, default: "General" },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const chatSessionSchema = new mongoose.Schema(
  {
    visitorId: { type: String, required: true },
    messages: [
      {
        sender: { type: String, enum: ["user", "bot", "agent"] },
        text: String,
        timestamp: { type: Date, default: Date.now },
      },
    ],
    lead: {
      name: String,
      email: String,
      phone: String,
      company: String,
      interestedService: String,
      budget: String,
      timeline: String,
    },
    escalated: { type: Boolean, default: false },
    resolved: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = {
  ChatbotKB: mongoose.model("ChatbotKB", chatbotKBSchema),
  ChatSession: mongoose.model("ChatSession", chatSessionSchema),
};