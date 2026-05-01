export const author = {
  name: "author",
  title: "Author",
  type: "document",
  fields: [
    { name: "name", type: "string", validation: (r: { required: () => unknown }) => r.required() },
    { name: "image", type: "image", options: { hotspot: true } },
    { name: "bio", type: "array", of: [{ type: "block" }] },
  ],
} as const
