const mongoose = require("mongoose");

const testimonialSchema = new mongoose.Schema(
  {
    clientName: { type: String, required: true },
    clientTitle: { type: String },
    clientCompany: { type: String },
    rating: { type: Number, min: 1, max: 5, default: 5 },
    message: { type: String, required: true },
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Testimonial", testimonialSchema);