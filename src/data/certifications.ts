import type { Certification, Publication } from "@/types";

export const certificationsData: Certification[] = [
  {
    id: "python-fullstack-cert",
    title: "Python Full Stack Certification",
    issuer: "The Kiran Academy",
    image: "/images/certification/python-full-stack-certification.jpg",
  },
  {
    id: "tcs-ion-career-edge",
    title: "TCS iON Career Edge",
    issuer: "Tata Consultancy Services",
    image: "/images/certification/tcs-ion-career-edge.jpg",
  },
];

export const publicationData: Publication[] = [
  {
    id: "efarming-research-paper",
    title: "Developing a Website on E-Farming System",
    type: "Published Research Paper",
    documentUrl: "/documents/developing-website-on-e-farming-system.pdf",
  },
];
