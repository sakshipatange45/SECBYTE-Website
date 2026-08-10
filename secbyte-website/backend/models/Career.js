const mongoose = require("mongoose");

const careerSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    type: {
      type: String,
      enum: ["Full-Time", "Part-Time", "Internship", "Contract"],
      default: "Full-Time",
    },
    department: { type: String },
    location: { type: String },
    description: { type: String },
    isOpen: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Career", careerSchema);