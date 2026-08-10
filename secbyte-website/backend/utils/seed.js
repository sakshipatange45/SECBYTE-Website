require("dotenv").config();
const connectDB = require("../config/db");
const { ChatbotKB } = require("../models/ChatbotKB");
const Service = require("../models/Service");
const Portfolio = require("../models/Portfolio");
const Blog = require("../models/Blog");
const Career = require("../models/Career");
const Testimonial = require("../models/Testimonial");
const Faq = require("../models/Faq");
const User = require("../models/User");

const run = async () => {
  await connectDB();

  const adminEmail = "admin@secbyte.com";
  const existingAdmin = await User.findOne({ email: adminEmail });
  if (!existingAdmin) {
    await User.create({ name: "Secbyte Admin", email: adminEmail, password: "ChangeMe123!", role: "admin" });
    console.log(`Admin user created -> email: ${adminEmail}  password: ChangeMe123!`);
  } else {
    console.log("Admin user already exists, skipping.");
  }

  const kbCount = await ChatbotKB.countDocuments();
  if (kbCount === 0) {
    await ChatbotKB.insertMany([
      { question: "What services do you provide?", answer: "We offer cybersecurity, web & software development, mobile apps, cloud solutions, AI, digital marketing, and UI/UX design.", keywords: ["service", "services", "offer", "what do you do"], category: "General" },
      { question: "How much does a website cost?", answer: "It depends on scope. Share your requirements on the Contact page for a tailored estimate.", keywords: ["cost", "price", "pricing", "budget", "how much"], category: "Pricing" },
      { question: "Do you offer internships?", answer: "Yes! Check our Careers page for current internship openings.", keywords: ["intern", "internship", "internships"], category: "Careers" },
      { question: "How can I contact your team?", answer: "You can use the Contact form, this chat, or email us directly.", keywords: ["contact", "reach", "email", "phone", "talk to a human", "human"], category: "General" },
      { question: "Hello", answer: "Hi there! How can I help you today — services, pricing, or careers?", keywords: ["hi", "hii", "hiii", "hello", "hey"], category: "General" },
    ]);
    console.log("Chatbot knowledge base seeded.");
  } else {
    console.log("Chatbot KB already seeded, skipping.");
  }

  const serviceCount = await Service.countDocuments();
  if (serviceCount === 0) {
    await Service.insertMany([
      { title: "Cybersecurity", slug: "cybersecurity", shortDescription: "Proactive assessments, penetration testing, and 24x7 monitoring.", overview: "End-to-end security services covering audits, penetration testing, and continuous monitoring.", benefits: ["Reduced breach risk", "Compliance readiness", "Continuous monitoring"], technologiesUsed: ["SIEM", "OWASP ZAP", "Nessus"], order: 1 },
      { title: "Web Development", slug: "web-development", shortDescription: "Fast, scalable, and SEO-friendly websites and web apps.", overview: "We design and build modern web experiences using React, Node.js, and MongoDB.", benefits: ["Improved performance", "Better SEO", "Scalable architecture"], technologiesUsed: ["React", "Node.js", "MongoDB"], order: 2 },
      { title: "Software Development", slug: "software-development", shortDescription: "Custom software built around your workflows.", overview: "Tailored software solutions designed around how your team actually works.", benefits: ["Fits your workflow", "Reduces manual work", "Built to scale"], technologiesUsed: ["Node.js", "React", "PostgreSQL"], order: 3 },
      { title: "Mobile App Development", slug: "mobile-app-development", shortDescription: "Native and cross-platform apps for iOS and Android.", overview: "Cross-platform mobile apps that feel native on both iOS and Android.", benefits: ["Single codebase", "Faster time to market", "Native performance"], technologiesUsed: ["React Native", "Flutter"], order: 4 },
      { title: "Cloud Solutions", slug: "cloud-solutions", shortDescription: "Migration, architecture, and managed cloud infrastructure.", overview: "We help you migrate to and manage cloud infrastructure securely and cost-effectively.", benefits: ["Lower infra cost", "Better uptime", "Auto-scaling"], technologiesUsed: ["AWS", "Azure", "Docker"], order: 5 },
      { title: "AI & Generative AI", slug: "ai-generative-ai", shortDescription: "Copilots, chatbots, and generative AI built into your product.", overview: "From proof-of-concept to production, we build practical AI features into your product.", benefits: ["Faster workflows", "24x7 automated support", "Data-driven insights"], technologiesUsed: ["OpenAI", "LangChain"], order: 6 },
      { title: "Digital Marketing", slug: "digital-marketing", shortDescription: "SEO, paid media, and content that compounds.", overview: "Growth marketing that focuses on compounding, long-term traffic and leads.", benefits: ["Higher organic traffic", "Better conversion rates", "Clear reporting"], technologiesUsed: ["Google Analytics", "SEMrush"], order: 7 },
      { title: "UI/UX Design", slug: "ui-ux-design", shortDescription: "Interfaces people trust and enjoy using.", overview: "User-centered design that balances aesthetics with usability and conversion.", benefits: ["Higher engagement", "Lower drop-off", "Consistent design system"], technologiesUsed: ["Figma", "Framer"], order: 8 },
    ]);
    console.log("Services seeded.");
  } else {
    console.log("Services already seeded, skipping.");
  }

  const portfolioCount = await Portfolio.countDocuments();
  if (portfolioCount === 0) {
    await Portfolio.insertMany([
      { projectName: "Nimbus Retail Replatform", slug: "nimbus-retail-replatform", client: "Nimbus Retail", industry: "E-commerce", description: "Full storefront rebuild on React with a hardened checkout and PCI-aware infrastructure.", technologiesUsed: ["React", "Node.js", "MongoDB", "AWS"] },
      { projectName: "Lumen Health Patient Copilot", slug: "lumen-health-copilot", client: "Lumen Health", industry: "Healthcare", description: "An AI assistant that triages patient FAQs and books appointments, integrated with their EHR.", technologiesUsed: ["React", "Node.js", "OpenAI", "Azure"] },
      { projectName: "Gridline Logistics Cloud Migration", slug: "gridline-cloud-migration", client: "Gridline Logistics", industry: "Logistics", description: "Lift-and-shift plus re-architecture of a fleet-tracking platform onto managed cloud services.", technologiesUsed: ["AWS", "Docker", "Terraform"] },
    ]);
    console.log("Portfolio seeded.");
  } else {
    console.log("Portfolio already seeded, skipping.");
  }

  const blogCount = await Blog.countDocuments();
  if (blogCount === 0) {
    await Blog.insertMany([
      { title: "Zero Trust, Explained Without the Buzzwords", slug: "zero-trust-basics", excerpt: "What zero trust actually changes in your architecture.", content: "Full article content goes here.", category: "Cybersecurity" },
      { title: "The SEO Checklist We Use on Every Build", slug: "react-seo-checklist", excerpt: "Metadata and structure choices that actually move rankings.", content: "Full article content goes here.", category: "Web Development" },
      { title: "When a Chatbot Is (and Isn't) the Right Move", slug: "when-to-use-a-chatbot", excerpt: "A practical framework for deciding if AI support pays off.", content: "Full article content goes here.", category: "AI" },
    ]);
    console.log("Blog posts seeded.");
  } else {
    console.log("Blog posts already seeded, skipping.");
  }

  const careerCount = await Career.countDocuments();
  if (careerCount === 0) {
    await Career.insertMany([
      { title: "Senior Full-Stack Engineer", slug: "senior-fullstack-engineer", type: "Full-Time", department: "Engineering", location: "Remote / Pune, IN", description: "Build and ship features across our React/Node stack." },
      { title: "Security Analyst", slug: "security-analyst", type: "Full-Time", department: "Cybersecurity", location: "Pune, IN", description: "Run security assessments and monitor client infrastructure." },
      { title: "Frontend Engineering Intern", slug: "frontend-intern", type: "Internship", department: "Engineering", location: "Remote", description: "Work alongside our frontend team on real client projects." },
    ]);
    console.log("Careers seeded.");
  } else {
    console.log("Careers already seeded, skipping.");
  }

  const testimonialCount = await Testimonial.countDocuments();
  if (testimonialCount === 0) {
    await Testimonial.insertMany([
      { clientName: "Anita Rao", clientTitle: "CTO", clientCompany: "Nimbus Retail", rating: 5, message: "Secbyte rebuilt our checkout flow and closed three security gaps in the same engagement." },
      { clientName: "Daniel Cho", clientTitle: "Founder", clientCompany: "Lumen Health", rating: 5, message: "Clear communication every step. Their AI chatbot now handles most of our first-line patient questions." },
      { clientName: "Priya Menon", clientTitle: "Head of IT", clientCompany: "Gridline Logistics", rating: 4, message: "Solid cloud migration work — minimal downtime and good documentation." },
    ]);
    console.log("Testimonials seeded.");
  } else {
    console.log("Testimonials already seeded, skipping.");
  }

  const faqCount = await Faq.countDocuments();
  if (faqCount === 0) {
    await Faq.insertMany([
      { question: "What services do you provide?", answer: "Cybersecurity, web & software development, mobile apps, cloud, AI, digital marketing, and UI/UX design.", order: 1 },
      { question: "How much does a website cost?", answer: "It depends on scope — share your requirements on the Contact page for a tailored estimate.", order: 2 },
      { question: "Do you offer internships?", answer: "Yes — check the Careers page for current openings.", order: 3 },
      { question: "How can I contact your team?", answer: "Use the Contact form, the chat widget, or email us directly.", order: 4 },
      { question: "What technologies do you use?", answer: "React, Node.js, MongoDB, and cloud platforms including AWS and Azure, chosen per project.", order: 5 },
    ]);
    console.log("FAQs seeded.");
  } else {
    console.log("FAQs already seeded, skipping.");
  }

  console.log("Seeding complete.");
  process.exit(0);
};

run().catch((err) => {
  console.error(err);
  process.exit(1);
});