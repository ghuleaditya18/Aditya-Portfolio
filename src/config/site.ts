export const siteConfig = {
  name: "Aditya Dattu Ghule",
  title: "Aditya Ghule | Python Full Stack Developer",
  description:
    "Personal portfolio of Aditya Dattu Ghule - Python Full Stack Developer specializing in Django, React.js, REST APIs, and MySQL.",
  url: "https://adityaghule.dev",
  ogImage: "/og.png",
  resumeUrl: "/resume/Aditya_Ghule_Resume.pdf",
  email: "ghuleaditya76@gmail.com",
  author: {
    name: "Aditya Dattu Ghule",
    role: "Python Full Stack Developer",
    github: "https://github.com/ghuleaditya18",
    linkedin: "https://www.linkedin.com/in/aditya-ghule018/",
    email: "ghuleaditya76@gmail.com",
  },
  navItems: [
    { label: "About", href: "/#about" },
    { label: "Experience", href: "/#experience" },
    { label: "Projects", href: "/#projects" },
    { label: "Skills", href: "/#skills" },
    { label: "Education", href: "/#education" },
    { label: "Certifications", href: "/#certifications" },
    { label: "Contact", href: "/#contact" },
  ],
  links: {
    github: "https://github.com/ghuleaditya18",
    linkedin: "https://www.linkedin.com/in/aditya-ghule018/",
    email: "mailto:ghuleaditya76@gmail.com",
    resume: "/resume/Aditya_Ghule_Resume.pdf",
  },
};

export type SiteConfig = typeof siteConfig;
