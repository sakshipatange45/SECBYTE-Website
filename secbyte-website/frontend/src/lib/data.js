import {
  ShieldCheck,
  Globe,
  Laptop,
  Smartphone,
  Cloud,
  BrainCircuit,
  Megaphone,
  Palette,
} from "lucide-react";

import cybersecurityImg from "../assets/services/cybersec.jpg";
import webDevImg from "../assets/services/web.png";
import softwareDevImg from "../assets/services/sw.png";
import aiImg from "../assets/services/AI.png";

// Blog cover images
import zeroTrustImg from "../assets/Blogs/zero1.png";
import seoImg from "../assets/Blogs/seo.jpg";
import genaiImg from "../assets/Blogs/genai.png";

/* ===========================
   SERVICES
=========================== */

export const services = [
  {
    slug: "cybersecurity",
    title: "Cybersecurity",
    icon: ShieldCheck,
    image: cybersecurityImg,
    shortDescription:"We help you identify vulnerabilities before attackers do. Our cybersecurity practice covers everything from network penetration testing to secure code review, so your business stays protected against evolving threats.",
    overview:
      "In today's digital landscape, security should be a foundation, not an afterthought. Secbyte's cybersecurity experts conduct comprehensive assessments, penetration testing, and security audits to safeguard your systems, networks, and applications from evolving threats. We don't just identify vulnerabilities — we deliver actionable, practical solutions to address them, so you and your customers can operate with confidence.",
    
  },

  {
    slug: "web-development",
    title: "Web Development",
    icon: Globe,
    image: webDevImg,
    shortDescription: "We build modern, responsive, and SEO-friendly websites and enterprise web applications.",
    overview: "We build web solutions that aren't just visually appealing, but also focus equally on performance, security, and scalability. Using modern frameworks and clean architecture, we develop responsive websites and web applications that deliver a fast, smooth, and secure experience to your users. Optimized for search engines, our solutions also help boost your online visibility."
  },

  {
    slug: "software-development",
    title: "Software Development",
    icon: Laptop,
    image: softwareDevImg,
    shortDescription: "We create custom software solutions tailored to your business needs and workflows.",
    overview: "Every business has a unique workflow, which is why generic software is never enough. At Secbyte, we take the time to understand your specific requirements and design and develop custom software solutions — whether it's internal tools, automation systems, or enterprise-level applications. We focus on writing efficient, maintainable, and scalable code, ensuring your software can grow alongside your business."
  },

  {
    slug: "ai-generative-ai",
    title: "AI & Generative AI",
    icon: BrainCircuit,
    image: aiImg,
    overview: "Artificial Intelligence is no longer the future — it's the present competitive edge. At Secbyte, we help businesses harness the power of AI and Generative AI to automate processes, unlock insights, and create smarter products. From custom AI models and intelligent chatbots to Generative AI-powered tools like content generators, recommendation engines, and workflow automation, we design solutions tailored to your business needs. Our team combines deep technical expertise with a practical, business-first approach — ensuring the AI we build doesn't just impress, but genuinely drives efficiency and growth, while adhering to ethical AI practices and data privacy standards.",
    shortDescription: "We help businesses harness the power of AI and Generative AI to automate processes, unlock insights, and create smarter products."
  },
];

/* ===========================
   HIGHLIGHTS
=========================== */

export const highlights = [
  {
    label: "Years of Experience",
    value: "2+",
  },
  {
    label: "Projects Delivered",
    value: "150+",
  },
  {
    label: "Happy Clients",
    value: "90+",
  },
  {
    label: "Industries Served",
    value: "12+",
  },
];

/* ===========================
   WHY CHOOSE US
=========================== */

export const whyChooseUs = [
  "Certified Professionals",
  "Secure Development Practices",
  "Agile Development Methodology",
  "Transparent Communication",
  "24×7 Technical Support",
  "On-Time Project Delivery",
];

/* ===========================
   TESTIMONIALS
=========================== */

export const testimonials = [
  {
    clientName: "Anita Rao",
    clientTitle: "CTO",
    clientCompany: "Nimbus Retail",
    rating: 5,
    message:
      "Secbyte rebuilt our checkout platform while eliminating critical security vulnerabilities.",
  },

  {
    clientName: "Daniel Cho",
    clientTitle: "Founder",
    clientCompany: "Lumen Health",
    rating: 5,
    message:
      "Excellent communication and an AI chatbot that now automates most of our customer queries.",
  },

  {
    clientName: "Priya Menon",
    clientTitle: "Head of IT",
    clientCompany: "Gridline Logistics",
    rating: 4,
    message:
      "Outstanding cloud migration with minimal downtime and excellent documentation.",
  },
];

/* ===========================
   BLOGS
=========================== */

export const blogPosts = [
  {
    slug: "zero-trust-basics",
    title: "Zero Trust Explained Without the Buzzwords",
    excerpt:
      "Understand how Zero Trust security improves modern enterprise infrastructure.",
    category: "Cybersecurity",
    coverImage: zeroTrustImg,
  },

  {
    slug: "react-seo-checklist",
    title: "React SEO Checklist Every Developer Should Follow",
    excerpt:
      "Improve search rankings with practical React SEO techniques.",
    category: "Web Development",
    coverImage: seoImg,
  },

  {
    slug: "when-to-use-a-chatbot",
    title: "When Should Your Business Use an AI Chatbot?",
    excerpt:
      "Learn where AI chatbots deliver the highest business value.",
    category: "Artificial Intelligence",
    coverImage: genaiImg,
  },
];

/* ===========================
   PORTFOLIO
=========================== */

export const portfolio = [
  {
    slug: "nimbus-retail-replatform",
    projectName: "Nimbus Retail Replatform",
    client: "Nimbus Retail",
    industry: "E-Commerce",
    description:
      "Enterprise storefront redevelopment with a highly secure checkout system.",
    technologiesUsed: ["React", "Node.js", "MongoDB", "AWS"],
  },

  {
    slug: "lumen-health-copilot",
    projectName: "Lumen Health AI Copilot",
    client: "Lumen Health",
    industry: "Healthcare",
    description:
      "AI-powered assistant for appointment booking and patient support.",
    technologiesUsed: ["React", "Node.js", "OpenAI"],
  },

  {
    slug: "gridline-cloud-migration",
    projectName: "Gridline Cloud Migration",
    client: "Gridline Logistics",
    industry: "Logistics",
    description:
      "Cloud migration and infrastructure modernization using AWS.",
    technologiesUsed: ["AWS", "Docker", "Terraform"],
  },
];

/* ===========================
   CAREERS
=========================== */

export const careers = [
  {
    slug: "senior-fullstack-engineer",
    title: "Senior Full Stack Engineer",
    type: "Full Time",
    department: "Engineering",
    location: "Remote / Pune",
  },

  {
    slug: "security-analyst",
    title: "Security Analyst",
    type: "Full Time",
    department: "Cybersecurity",
    location: "Pune",
  },

  {
    slug: "frontend-intern",
    title: "Frontend Developer Intern",
    type: "Internship",
    department: "Engineering",
    location: "Remote",
  },
];

/* ===========================
   FAQ
=========================== */

export const faqs = [
  {
    question: "What services do you provide?",
    answer:
      "We provide Cybersecurity, Web Development, Software Development, Mobile Apps, Cloud Solutions, AI, Digital Marketing and UI/UX Design.",
  },

  {
    question: "How much does a website cost?",
    answer:
      "Pricing depends on project requirements. Contact us for a customized quotation.",
  },

  {
    question: "Do you offer internships?",
    answer:
      "Yes. Please visit our Careers page for the latest internship opportunities.",
  },

  {
    question: "How can I contact your team?",
    answer:
      "You can contact us through the Contact page, email or our AI chatbot.",
  },

  {
    question: "Which technologies do you use?",
    answer:
      "You can contact us through the Contact page, email or our AI chatbot.",
  },
];