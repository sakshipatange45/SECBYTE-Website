const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    company: { type: String },
    serviceInterested: { type: String },
    budget: { type: String },
    message: { type: String, required: true },
    source: { type: String, default: "contact-form" },
    status: {
      type: String,
      enum: ["New", "Contacted", "Qualified", "Closed"],
      default: "New",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Contact", contactSchema);