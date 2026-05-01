import type { DoctorBio } from "types/content"

export const doctor: DoctorBio = {
  name: "Dr. Cynthia Higgins, MD",
  tagline: "Psychiatrist · Energy-Medicine Practitioner · Author",
  portrait: {
    src: "/assets/images/dr-higgins-portrait.jpg",
    alt: "Portrait of Dr. Cynthia Higgins",
    width: 800,
    height: 1000,
  },
  paragraphs: [
    "Dr. Cynthia Higgins is a board-certified psychiatrist with 27 years of clinical practice and 24 years of training in contemplative and energetic disciplines. She holds a Bachelor's in Molecular Biology and earned her MD at the USF Morsani College of Medicine.",
    "Her work bridges what most clinicians treat as separate worlds — quantum physics, biology, psychology, and spirituality — into a single practice that meets people where they actually live. Clients come to her after the standard tools have taken them as far as they can go.",
    "Recognized as Energy Psychiatrist of the Year in 2019 and named Empowered Woman of the Year in 2022, Dr. Higgins has been featured on CUTV News, Inner View, and MysticMag, and continues to teach the Whole Life Integration™ framework to clinicians and individuals worldwide.",
  ],
} as const
