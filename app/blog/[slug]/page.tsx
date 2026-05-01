type PageProps = {
  params: Promise<{ slug: string }>
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params
  return (
    <article className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-4xl font-bold">{slug}</h1>
    </article>
  )
}
