import { Button } from "components/ui/Button/Button"
import { Card } from "components/ui/Card/Card"
import { Section } from "components/ui/Section/Section"
import { urlFor } from "lib/sanity/image"
import { getPostBySlug } from "lib/sanity/queries"
import type { Metadata } from "next"
import { PortableText } from "next-sanity"
import Image from "next/image"
import { notFound } from "next/navigation"

type PageProps = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug).catch(() => null)
  if (!post) return {}
  const ogImage = `/api/og/blog/${post.slug}`
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      images: [{ url: ogImage, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt ?? undefined,
      images: [ogImage],
    },
  }
}

export const revalidate = 3600

export default async function Page({ params }: PageProps) {
  const { slug } = await params
  const post = await getPostBySlug(slug).catch(() => null)
  if (!post) notFound()

  return (
    <article>
      <Section surface="bone">
        <div className="mx-auto max-w-3xl">
          <h1 className="font-display text-4xl leading-tight tracking-tight md:text-6xl">{post.title}</h1>
          {post.excerpt ? (
            <p className="font-body mt-6 text-lg leading-relaxed opacity-80">{post.excerpt}</p>
          ) : null}
          {post.coverImage ? (
            <div className="bg-surface-alt relative mt-10 aspect-video w-full overflow-hidden rounded-3xl">
              <Image
                src={urlFor(post.coverImage).width(1600).height(900).url()}
                alt={post.coverImage.alt ?? post.title}
                fill
                priority
                sizes="(min-width: 1024px) 800px, 100vw"
                className="object-cover"
              />
            </div>
          ) : null}
          {post.body ? (
            <div className="prose-style font-body mt-12 max-w-2xl text-lg leading-relaxed [&_h2]:font-display [&_h2]:mt-12 [&_h2]:text-3xl [&_h3]:font-display [&_h3]:mt-8 [&_h3]:text-2xl [&_p]:mt-6 [&_a]:underline [&_a]:underline-offset-4 [&_a]:decoration-gold">
              <PortableText value={post.body} />
            </div>
          ) : null}
          <Card surface="ink" className="mt-16 flex flex-col gap-3">
            <p className="font-display text-bone text-2xl">Work with Dr. Higgins</p>
            <p className="font-body text-bone/70 text-sm">
              If this resonates, the next step is a conversation. Book a consult to see whether the work fits.
            </p>
            <div className="mt-2">
              <Button href="/book" intent="gold" size="sm">
                Book a consult
              </Button>
            </div>
          </Card>
        </div>
      </Section>
    </article>
  )
}
