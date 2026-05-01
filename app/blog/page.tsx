import { Badge } from "components/ui/Badge/Badge"
import { Section } from "components/ui/Section/Section"
import { urlFor } from "lib/sanity/image"
import { getAllPosts } from "lib/sanity/queries"
import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Blog",
  description: "Essays and reflections on energy psychiatry, integration, and the work of healing.",
}

export const revalidate = 3600

export default async function Page() {
  const posts = await getAllPosts().catch(() => [])

  return (
    <Section eyebrow="Writing" heading="Notes from practice" surface="bone">
      {posts.length === 0 ? (
        <p className="font-body opacity-70">New essays coming soon.</p>
      ) : (
        <ul className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <li key={post._id}>
              <Link href={`/blog/${post.slug}`} className="group block focus-visible:outline-none">
                {post.coverImage ? (
                  <div className="bg-surface-alt relative mb-4 aspect-4/3 w-full overflow-hidden rounded-2xl">
                    <Image
                      src={urlFor(post.coverImage).width(800).height(600).url()}
                      alt={post.coverImage.alt ?? post.title}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                ) : null}
                {post.category ? (
                  <Badge variant="category" className="mb-3">
                    {post.category.title}
                  </Badge>
                ) : null}
                <h2 className="font-display text-2xl leading-snug">{post.title}</h2>
                {post.excerpt ? (
                  <p className="font-body mt-2 text-sm opacity-70">{post.excerpt}</p>
                ) : null}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </Section>
  )
}
