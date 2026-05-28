import documindImage from "../assets/projects/documind.png";
import konnectImage from "../assets/projects/konnect.png";
import smartbillrImage from "../assets/projects/smartbillr.png";

export type Project = {
  title: string;
  subheading: string;
  techStack: string[];
  description: string[];
  liveLink: string;
  githubLink: string;
  image?: string;
};

export const projects: Project[] = [
  {
    title: "DocuMind AI",
    subheading:
      "Production-oriented AI-powered RAG knowledge base assistant with grounded citation responses.",
    techStack: [
      "React",
      "Django REST Framework",
      "FastAPI",
      "PostgreSQL",
      "pgvector",
      "Redis",
      "Gemini AI",
      "Tailwind CSS",
      "Cloudinary",
      "Neon",
      "Upstash",
    ],
    description: [
      "Built a scalable Retrieval-Augmented Generation (RAG) platform for document-based question answering with grounded responses",
      "Implemented document ingestion pipeline with PDF, DOCX, and TXT upload support using Django and FastAPI microservices",
      "Integrated pgvector with PostgreSQL for semantic search and embedding-based document retrieval",
      "Developed citation-aware AI responses that only answer from retrieved document chunks to reduce hallucinations",
      "Added authentication, upload tracking, chat history, caching, and production-ready cloud deployment architecture",
    ],
    liveLink: "https://documindai-omega.vercel.app/",
    githubLink: "https://github.com/Anos714/Assignment/tree/main",
    image: documindImage,
  },
  {
    title: "SmartBillr",
    subheading: "AI + manual invoice generator for freelancers and businesses.",
    techStack: [
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "Tailwind CSS",
      "Gemini AI",
    ],
    description: [
      "Built an AI-powered invoice generator that creates structured invoices from natural language prompts",
      "Added manual invoice creation for full control over clients, items, taxes, and totals",
      "Implemented business/client snapshot data to preserve invoice history integrity",
      "Supports payment details, invoice status tracking, notes, terms, and soft delete",
      "Designed for freelancers and small businesses to replace spreadsheet-based workflows",
    ],
    liveLink: "#",
    githubLink: "https://github.com/Anos714/SmartBillr",
    image: smartbillrImage,
  },
  {
    title: "Konnect",
    subheading:
      "Real-time chat and video communication app powered by Stream SDK.",
    techStack: [
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "Stream Chat SDK",
      "Stream Video SDK",
      "Tailwind CSS",
    ],
    description: [
      "Built a real-time communication platform with live messaging using Stream Chat SDK",
      "Integrated Stream Video SDK for one-to-one and group video calling",
      "Implemented modern chat features like channels, real-time updates, and message syncing",
      "Added authentication-based user sessions for secure and personalized communication",
      "Designed a responsive UI for smooth chat and video experience across devices",
    ],
    liveLink: "https://konnect-zeta.vercel.app/",
    githubLink: "https://github.com/Anos714/Konnect",
    image: konnectImage,
  },
  {
    title: "CodeVault",
    subheading:
      "Full-stack code snippet manager with a VS Code-like editor experience.",
    techStack: [
      "React",
      "Redux Toolkit",
      "Node.js",
      "Express",
      "MongoDB",
      "Monaco Editor",
      "Tailwind CSS",
    ],
    description: [
      "Built a full-stack snippet manager with Monaco Editor for a VS Code-like in-browser coding experience",
      "Implemented Redux Toolkit for efficient global state management and real-time snippet updates",
      "Developed RESTful APIs using Node.js, Express, and MongoDB for managing snippet CRUD operations",
      "Added syntax highlighting and multi-language support to improve code readability and reuse",
      "Designed a clean, developer-focused UI with fast interactions and responsive layout",
    ],
    liveLink: "https://codevault-olive.vercel.app/",
    githubLink: "https://github.com/Anos714/CodeVault",
  },
];
