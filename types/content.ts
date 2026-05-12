export type Modality = {
  readonly slug: string
  readonly name: string
  readonly trademark?: "tm" | "registered"
  readonly summary: string
  readonly description: string
}

export type Credential = {
  readonly title: string
  readonly detail?: string
}

export type PressFeature = {
  readonly outlet: string
  readonly title?: string
  readonly url?: string
}

export type Award = {
  readonly title: string
  readonly year: number
  readonly issuer?: string
}

export type FAQEntry = {
  readonly question: string
  readonly answer: string
}

export type Program = {
  readonly slug: string
  readonly title: string
  readonly description: string
  readonly xperiencifyUrl: string
  readonly durationWeeks?: number
  readonly priceTier?: "foundation" | "signature" | "intensive"
}

export type DoctorBio = {
  readonly name: string
  readonly tagline: string
  readonly missionStatement: string
  readonly portrait: {
    readonly src: string
    readonly alt: string
    readonly width: number
    readonly height: number
  }
  readonly paragraphs: ReadonlyArray<string>
}
