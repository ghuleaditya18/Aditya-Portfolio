import type { Project } from "@/types";

export const projectsData: Project[] = [
  {
    title: "AyurSutra",
    slug: "ayursutra",
    description:
      "Ayurvedic treatment and healthcare management application providing patient management, appointment workflows, and secure JWT authentication.",
    category: "Full Stack",
    isFeatured: true,
    featuredLayout: "hero",
    thumbnail: "/images/projects/ayursutra/admin-dashboard.png",
    coreTechnologies: [
      "Python",
      "Django",
      "Django REST Framework",
      "React",
      "Simple JWT",
      "MySQL",
    ],
    technologies: [
      "React",
      "Vite",
      "Axios",
      "Tailwind CSS",
      "Django",
      "Django REST Framework",
      "Simple JWT",
      "MySQL",
      "CORS",
      "WhiteNoise",
      "Gunicorn",
    ],
    features: [
      "User authentication and authorization using Simple JWT",
      "RESTful API integration between Django backend and React frontend",
      "Patient and treatment data management",
      "Responsive user interface styled with Tailwind CSS",
    ],
    githubUrl: "https://github.com/ghuleaditya18/AyurSutra",
    caseStudy: {
      overview:
        "AyurSutra is a full-stack Ayurvedic healthcare management application developed to organize patient records, therapy schedules, and clinical workflows.",
      problem:
        "Ayurvedic healthcare administration involves managing multi-step therapy plans, practitioner schedules, and patient treatment histories across recurring appointments.",
      solution:
        "Engineered a full-stack web application featuring a decoupled Django REST Framework API backend and a responsive React frontend with Simple JWT authentication and MySQL storage.",
      myContribution: [
        "Built Django REST Framework API endpoints for patient records and therapy management.",
        "Implemented token-based authentication and authorization using Simple JWT.",
        "Developed modular React components for interactive patient management interfaces.",
        "Designed and normalized relational database schemas in MySQL.",
      ],
      architecture: [
        "Frontend: React single-page application built with Vite and Tailwind CSS",
        "Backend: Django REST Framework API serving JSON endpoints",
        "Authentication: Simple JWT token authentication",
        "Database: MySQL relational database for persistent record management",
      ],
      keyFeatures: [
        {
          title: "JWT Authentication & Authorization",
          description: "Token-based user authentication securing backend API endpoints and frontend route access.",
        },
        {
          title: "Patient & Therapy Management",
          description: "Structured workflows for registering patient records and organizing treatment schedules.",
        },
        {
          title: "RESTful API Integration",
          description: "Decoupled architecture connecting a Django REST API to a dynamic React frontend via Axios.",
        },
      ],
      whatILearned: [
        "Decoupled full-stack development patterns combining Django REST Framework and React",
        "JWT authentication implementation and token handling in REST APIs",
        "Relational database design and query execution in MySQL",
      ],
      screenshots: [
        {
          url: "/images/projects/ayursutra/admin-dashboard.png",
          caption: "Admin Dashboard — Patient overview, appointment statistics, and quick navigation",
          alt: "AyurSutra Admin Dashboard overview",
          aspectRatio: "wide",
        },
        {
          url: "/images/projects/ayursutra/patient-dashboard.png",
          caption: "Patient Dashboard — Health profile and upcoming therapy schedules",
          alt: "AyurSutra Patient Dashboard",
          aspectRatio: "wide",
        },
        {
          url: "/images/projects/ayursutra/therapist-dashboard.png",
          caption: "Therapist Dashboard — Daily treatment assignments and patient session records",
          alt: "AyurSutra Therapist Dashboard",
          aspectRatio: "wide",
        },
        {
          url: "/images/projects/ayursutra/booking-of-therapy.png",
          caption: "Therapy Booking — Appointment scheduling interface and therapist selection",
          alt: "AyurSutra Therapy Booking interface",
          aspectRatio: "wide",
        },
        {
          url: "/images/projects/ayursutra/therapies.png",
          caption: "Therapies List — Ayurvedic treatment catalog and session details",
          alt: "AyurSutra Ayurvedic Therapies catalog",
          aspectRatio: "wide",
        },
      ],
    },
  },
  {
    title: "Pharma Complaint QMS",
    slug: "pharma-complaint-qms",
    description:
      "Quality Management System for pharmaceutical complaint handling, featuring AI-assisted document processing and automated workflow graphs.",
    category: "AI & Full Stack",
    isFeatured: true,
    featuredLayout: "standard",
    thumbnail: "/images/projects/pharma-complaint-qms/01-complaint-intake.png",
    coreTechnologies: [
      "FastAPI",
      "Python",
      "React",
      "Groq",
      "LangChain",
      "LangGraph",
      "SQLAlchemy",
    ],
    technologies: [
      "React",
      "Vite",
      "Redux Toolkit",
      "Tailwind CSS",
      "Axios",
      "FastAPI",
      "SQLAlchemy",
      "Pydantic",
      "Groq",
      "LangChain",
      "LangGraph",
      "PyMySQL",
      "PyPDF",
    ],
    features: [
      "AI-driven complaint analysis powered by Groq, LangChain, and LangGraph",
      "REST APIs built with FastAPI and Pydantic",
      "State management using Redux Toolkit",
      "SQLite for development with MySQL support via PyMySQL",
    ],
    githubUrl: "https://github.com/ghuleaditya18/pharma-complaint-qms",
    caseStudy: {
      overview:
        "Pharma Complaint QMS is a Quality Management System tailored for pharmaceutical complaint intake, featuring AI document parsing and multi-step workflow graphs.",
      problem:
        "Processing pharmaceutical complaint files involves parsing unstructured PDF reports, validating narrative compliance details, and categorizing issue types.",
      solution:
        "Built a FastAPI application integrating LLM workflow graphs via LangChain and LangGraph with Groq API execution. Automated text extraction from pharmaceutical PDF documents using PyPDF and structured data validation with Pydantic.",
      myContribution: [
        "Implemented FastAPI REST endpoints with Pydantic request and response schemas.",
        "Integrated Groq, LangChain, and LangGraph agents to automate complaint processing workflows.",
        "Extracted text data from PDF complaint files using PyPDF for structured backend ingestion.",
        "Configured SQLAlchemy ORM with SQLite for development and PyMySQL for MySQL integration.",
      ],
      architecture: [
        "Frontend: React with Redux Toolkit for application state management",
        "Backend: FastAPI asynchronous service endpoints validated with Pydantic",
        "AI Orchestration: LangChain and LangGraph workflows using Groq API",
        "Document Processing: PyPDF for text extraction from PDF reports",
        "Database Layer: SQLite for development with MySQL support via PyMySQL",
      ],
      keyFeatures: [
        {
          title: "AI Workflow Integration",
          description: "Graph-based complaint processing workflows created with Groq, LangChain, and LangGraph.",
        },
        {
          title: "Automated Document Processing",
          description: "Parsing text from pharmaceutical PDF reports using PyPDF and Pydantic validation.",
        },
        {
          title: "FastAPI REST Service",
          description: "API endpoints built with FastAPI and SQLAlchemy ORM.",
        },
      ],
      whatILearned: [
        "Building multi-step AI workflow graphs with LangGraph and LangChain",
        "Designing asynchronous Python REST APIs using FastAPI and Pydantic",
        "Extracting and processing document data from PDF files using PyPDF",
      ],
      screenshots: [
        {
          url: "/images/projects/pharma-complaint-qms/01-complaint-intake.png",
          caption: "Complaint Intake — Complaint submission form and report list",
          alt: "Pharma Complaint QMS intake portal",
          aspectRatio: "wide",
        },
        {
          url: "/images/projects/pharma-complaint-qms/02-ai-copilot-extraction.png",
          caption: "AI Copilot Extraction — Extracted complaint fields and document summary view",
          alt: "Pharma Complaint QMS AI extraction modal",
          aspectRatio: "portrait",
        },
        {
          url: "/images/projects/pharma-complaint-qms/03-structured-complaint.png",
          caption: "Structured Complaint View — Categorized complaint data and details",
          alt: "Pharma Complaint QMS structured complaint details",
          aspectRatio: "portrait",
        },
        {
          url: "/images/projects/pharma-complaint-qms/04-ai-risk-assessment.png",
          caption: "AI Risk Assessment — Risk severity classification and assessment overview",
          alt: "Pharma Complaint QMS risk assessment view",
          aspectRatio: "portrait",
        },
        {
          url: "/images/projects/pharma-complaint-qms/05-qms-commit-confirmation.png",
          caption: "QMS Confirmation — Complaint confirmation screen and status display",
          alt: "Pharma Complaint QMS status confirmation",
          aspectRatio: "standard",
        },
      ],
    },
  },
  {
    title: "Digital Examination Portal",
    slug: "digital-examination-portal",
    description:
      "Web-based examination management platform enabling digital test administration, student evaluations, and secure result recording.",
    category: "Full Stack",
    isFeatured: false,
    featuredLayout: "standard",
    thumbnail: "/images/projects/digital-examination-portal/student-dashboard.png",
    coreTechnologies: [
      "Python",
      "Django",
      "MySQL",
      "HTML5",
      "CSS3",
      "Bootstrap",
      "JavaScript",
    ],
    technologies: [
      "Python",
      "Django",
      "MySQL",
      "HTML5",
      "CSS3",
      "Bootstrap",
      "JavaScript",
      "Git",
      "GitHub",
    ],
    features: [
      "Online test creation and administration workflows",
      "Role-based access control for students and administrators",
      "Relational database storage powered by MySQL",
      "Clean UI designed with Bootstrap and custom CSS",
    ],
    githubUrl: "https://github.com/ghuleaditya18/DigitalExaminationPortal",
    caseStudy: {
      overview:
        "Digital Examination Portal is a Django web application built to facilitate online test creation, role-based student access, and automated test evaluation.",
      problem:
        "Educational testing requires secure online administration, question paper management, and structured recording of student test results.",
      solution:
        "Developed a Django web application with role-based access for administrators and students, MySQL database models for questions and scores, and dynamic test interfaces.",
      myContribution: [
        "Developed Django models and views for subject and question management.",
        "Implemented role-based permissions separating administrator actions from student test access.",
        "Built automated answer evaluation logic and result recording in MySQL.",
        "Designed responsive user interfaces using Bootstrap, CSS3, and JavaScript.",
      ],
      architecture: [
        "Framework: Django web framework with server-side views and templates",
        "Database: MySQL database for user profiles, question banks, and scores",
        "Frontend: HTML5, CSS3, Bootstrap, and JavaScript",
        "Access Control: Django built-in authentication and permission handling",
      ],
      keyFeatures: [
        {
          title: "Online Exam Administration",
          description: "Admin interfaces for managing subject question banks and configuring online tests.",
        },
        {
          title: "Student Evaluation Engine",
          description: "Automated calculation and database recording of student examination results.",
        },
        {
          title: "Role-Based Access Control",
          description: "Permission gating distinguishing administrator control panels from student exam portals.",
        },
      ],
      whatILearned: [
        "Django framework architecture, view logic, and template rendering",
        "Implementing authentication and role permissions in Python web applications",
        "Database model design for examination workflows in MySQL",
      ],
      screenshots: [
        {
          url: "/images/projects/digital-examination-portal/student-dashboard.png",
          caption: "Student Dashboard — Enrolled subjects, active examinations, and score summary",
          alt: "Digital Examination Portal Student Dashboard",
          aspectRatio: "wide",
        },
        {
          url: "/images/projects/digital-examination-portal/exam-page.png",
          caption: "Online Examination Page — Timed test interface with multiple-choice questions",
          alt: "Digital Examination Portal Online Exam interface",
          aspectRatio: "wide",
        },
        {
          url: "/images/projects/digital-examination-portal/students-results.png",
          caption: "Student Results — Examination performance and score summary",
          alt: "Digital Examination Portal Results screen",
          aspectRatio: "wide",
        },
        {
          url: "/images/projects/digital-examination-portal/teacher-dashboard.png",
          caption: "Teacher Dashboard — Exam administration and subject management",
          alt: "Digital Examination Portal Teacher Dashboard",
          aspectRatio: "wide",
        },
        {
          url: "/images/projects/digital-examination-portal/question-creation.png",
          caption: "Question Creation — Question paper configuration and options entry",
          alt: "Digital Examination Portal Question Creation view",
          aspectRatio: "wide",
        },
      ],
    },
  },
];
