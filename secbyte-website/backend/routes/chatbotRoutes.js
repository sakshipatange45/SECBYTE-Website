const express = require("express");
const { sendMessage, captureLead, escalate } = require("../controllers/chatbotController");

const router = express.Router();

router.post("/message", sendMessage);
router.post("/lead", captureLead);
router.post("/escalate", escalate);

module.exports = router;