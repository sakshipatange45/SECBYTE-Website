const asyncHandler = require("express-async-handler");
const { ChatbotKB, ChatSession } = require("../models/ChatbotKB");
const Contact = require("../models/Contact");

/**
 * Knowledge Base madhun keyword match search karto.
 * Example: KB entry keywords: ["internship", "intern"]
 * User message: "do you offer internships?" -> match sapadel
 */
const findKBMatch = async (message) => {
  const entries = await ChatbotKB.find({ isActive: true });
  const lower = message.toLowerCase();
  return entries.find((e) => e.keywords.some((k) => lower.includes(k.toLowerCase())));
};

const getReply = async (message) => {
  const match = await findKBMatch(message);
  if (match) return match.answer;
  return "I'm not fully sure about that yet. You can ask about our services, careers, or say 'talk to a human' to reach our team.";
};

// @desc  Send a message to the chatbot
// @route POST /api/chatbot/message
const sendMessage = asyncHandler(async (req, res) => {
  const { visitorId, message } = req.body;
  if (!visitorId || !message) {
    res.status(400);
    throw new Error("visitorId and message are required");
  }

  let session = await ChatSession.findOne({ visitorId, resolved: false });
  if (!session) {
    session = await ChatSession.create({ visitorId, messages: [] });
  }

  session.messages.push({ sender: "user", text: message });
  const reply = await getReply(message);
  session.messages.push({ sender: "bot", text: reply });
  await session.save();

  res.json({ success: true, reply, sessionId: session._id });
});

// @desc  Capture a lead collected by the chatbot
// @route POST /api/chatbot/lead
const captureLead = asyncHandler(async (req, res) => {
  const { visitorId, name, email, phone, company, interestedService, budget, timeline } = req.body;

  await Contact.create({
    fullName: name,
    email,
    phone,
    company,
    serviceInterested: interestedService,
    budget,
    message: `Lead captured via chatbot. Timeline: ${timeline || "N/A"}`,
    source: "chatbot",
  });

  await ChatSession.findOneAndUpdate(
    { visitorId, resolved: false },
    { lead: { name, email, phone, company, interestedService, budget, timeline } }
  );

  res.status(201).json({ success: true, message: "Lead captured" });
});

// @desc  Escalate the chat to a human agent
// @route POST /api/chatbot/escalate
const escalate = asyncHandler(async (req, res) => {
  const { visitorId, reason } = req.body;
  const session = await ChatSession.findOneAndUpdate(
    { visitorId, resolved: false },
    { escalated: true },
    { new: true }
  );
  res.json({ success: true, message: "A support representative will be with you shortly", data: session, reason });
});

module.exports = { sendMessage, captureLead, escalate };