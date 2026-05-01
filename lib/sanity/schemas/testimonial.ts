export const testimonial = {
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    { name: "quote", type: "text", rows: 4, validation: (r: { required: () => unknown }) => r.required() },
    { name: "attribution", type: "string", validation: (r: { required: () => unknown }) => r.required() },
    { name: "context", type: "string" },
    {
      name: "rating",
      type: "number",
      validation: (r: { min: (n: number) => { max: (n: number) => unknown } }) => r.min(1).max(5),
    },
    { name: "featured", type: "boolean", initialValue: false },
    { name: "publishedAt", type: "datetime" },
  ],
} as const
