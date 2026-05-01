export const category = {
  name: "category",
  title: "Category",
  type: "document",
  fields: [
    { name: "title", type: "string", validation: (r: { required: () => unknown }) => r.required() },
    {
      name: "slug",
      type: "slug",
      options: { source: "title", maxLength: 64 },
      validation: (r: { required: () => unknown }) => r.required(),
    },
  ],
} as const
