import { sanityClient } from "lib/sanity"
import type { Post, PostSummary, Testimonial } from "types/cms"

const POSTS_TAG = "posts"
const TESTIMONIALS_TAG = "testimonials"

const POST_LIST_QUERY = `*[_type == "post" && defined(slug.current)] | order(publishedAt desc){
  _id,
  _updatedAt,
  title,
  "slug": slug.current,
  excerpt,
  publishedAt,
  coverImage,
  "category": category->{ _id, title, "slug": slug.current },
  "author": author->{ _id, name, "image": image }
}`

const POST_BY_SLUG_QUERY = `*[_type == "post" && slug.current == $slug][0]{
  _id,
  _updatedAt,
  title,
  "slug": slug.current,
  excerpt,
  publishedAt,
  coverImage,
  body,
  "category": category->{ _id, title, "slug": slug.current },
  "author": author->{ _id, name, image, bio }
}`

const FEATURED_TESTIMONIALS_QUERY = `*[_type == "testimonial" && featured == true] | order(publishedAt desc)[0...6]{
  _id,
  quote,
  attribution,
  context,
  rating
}`

const ALL_TESTIMONIALS_QUERY = `*[_type == "testimonial"] | order(publishedAt desc){
  _id,
  quote,
  attribution,
  context,
  rating
}`

export async function getAllPosts(): Promise<PostSummary[]> {
  return sanityClient.fetch(POST_LIST_QUERY, {}, { next: { tags: [POSTS_TAG] } })
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  return sanityClient.fetch(POST_BY_SLUG_QUERY, { slug }, { next: { tags: [POSTS_TAG, `post:${slug}`] } })
}

export async function getFeaturedTestimonials(): Promise<Testimonial[]> {
  return sanityClient.fetch(FEATURED_TESTIMONIALS_QUERY, {}, { next: { tags: [TESTIMONIALS_TAG] } })
}

export async function getAllTestimonials(): Promise<Testimonial[]> {
  return sanityClient.fetch(ALL_TESTIMONIALS_QUERY, {}, { next: { tags: [TESTIMONIALS_TAG] } })
}
