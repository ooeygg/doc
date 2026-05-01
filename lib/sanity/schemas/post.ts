/**
 * Sanity schema definitions are consumed by the Studio (hosted at sanity.io/manage).
 * Typed as a plain object to avoid pulling the `sanity` package into the Next.js bundle.
 */
export const post = {
  name: "post",
  title: "Post",
  type: "document",
  fields: [
    { name: "title", type: "string", validation: (r: { required: () => unknown }) => r.required() },
    {
      name: "slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (r: { required: () => unknown }) => r.required(),
    },
    { name: "excerpt", type: "text", rows: 3 },
    { name: "publishedAt", type: "datetime" },
    { name: "coverImage", type: "image", options: { hotspot: true } },
    { name: "category", type: "reference", to: [{ type: "category" }] },
    { name: "author", type: "reference", to: [{ type: "author" }] },
    {
      name: "body",
      type: "array",
      of: [
        { type: "block" },
        { type: "image", options: { hotspot: true } },
        {
          name: "callout",
          type: "object",
          fields: [
            { name: "tone", type: "string", options: { list: ["note", "warning", "quote"] } },
            { name: "body", type: "text" },
          ],
        },
        {
          name: "quote",
          type: "object",
          fields: [
            { name: "quote", type: "text", validation: (r: { required: () => unknown }) => r.required() },
            { name: "attribution", type: "string" },
          ],
        },
        {
          name: "ctaBlock",
          type: "object",
          fields: [
            { name: "label", type: "string", validation: (r: { required: () => unknown }) => r.required() },
            { name: "href", type: "url", validation: (r: { required: () => unknown }) => r.required() },
          ],
        },
      ],
    },
  ],
} as const
