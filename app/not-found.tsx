import Link from "next/link"

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center px-4 text-center">
      <h1 className="mb-4 text-5xl font-extrabold">404</h1>
      <p className="mb-6 text-gray-500 dark:text-gray-400">This page could not be found.</p>
      <Link href="/" className="text-blue-500 underline">
        Back home
      </Link>
    </section>
  )
}
