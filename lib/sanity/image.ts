import imageUrlBuilder, { type SanityImageSource } from "@sanity/image-url"
import { sanityClient } from "lib/sanity"

const builder = imageUrlBuilder(
  sanityClient ?? { projectId: "placeholder", dataset: "production" }
)

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}
