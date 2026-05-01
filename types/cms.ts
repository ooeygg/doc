export type PortableTextBlock = {
  _type: string
  _key?: string
  children?: ReadonlyArray<{ _type: string; _key?: string; text?: string; marks?: string[] }>
  markDefs?: ReadonlyArray<{ _type: string; _key: string; [key: string]: unknown }>
  style?: string
  level?: number
  listItem?: string
  [key: string]: unknown
}

export type SanityImage = {
  asset: { _ref: string; _type: "reference" }
  alt?: string
  hotspot?: { x: number; y: number }
}

export type Author = {
  _id: string
  name: string
  image?: SanityImage
  bio?: PortableTextBlock[]
}

export type Category = {
  _id: string
  title: string
  slug: string
}

export type PostSummary = {
  _id: string
  _updatedAt: string
  title: string
  slug: string
  excerpt?: string
  publishedAt?: string
  coverImage?: SanityImage
  category?: Pick<Category, "_id" | "title" | "slug">
  author?: Pick<Author, "_id" | "name" | "image">
}

export type Post = PostSummary & {
  body?: PortableTextBlock[]
}

export type Testimonial = {
  _id: string
  quote: string
  attribution: string
  context?: string
  rating?: number
}
