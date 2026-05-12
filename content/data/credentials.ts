import type { Award, Credential, PressFeature } from "types/content"

export const credentials: ReadonlyArray<Credential> = [
  { title: "Bachelor's in Molecular Biology" },
  { title: "MD", detail: "USF Morsani College of Medicine" },
  { title: " psychiatrist", detail: "27 years of clinical practice" },
  { title: "Spiritual training", detail: "24 years of contemplative and energetic study" },
] as const

export const awards: ReadonlyArray<Award> = [
  { title: "Energy Psychiatrist of the Year", year: 2019 },
  { title: "Empowered Woman of the Year", year: 2022 },
] as const

export const press: ReadonlyArray<PressFeature> = [
  { outlet: "CUTV News" },
  { outlet: "Inner View" },
  { outlet: "MysticMag" },
] as const
