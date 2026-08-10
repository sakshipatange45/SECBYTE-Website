const multer = require("multer");
const path = require("path");
const fs = require("fs");

const resumeDir = path.join(__dirname, "..", "uploads", "resumes");
fs.mkdirSync(resumeDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, resumeDir),
  filename: (req, file, cb) => {
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${unique}${path.extname(file.originalname)}`);
  },
});

const fileFilter = (req, file, cb) => {
  const allowed = [".pdf", ".doc", ".docx"];
  if (allowed.includes(path.extname(file.originalname).toLowerCase())) cb(null, true);
  else cb(new Error("Only PDF/DOC/DOCX resumes are allowed"));
};

module.exports = multer({ storage, fileFilter, limits: { fileSize: 5 * 1024 * 1024 } });