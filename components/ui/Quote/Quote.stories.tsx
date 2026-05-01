import type { Meta, StoryObj } from "@storybook/react"
import { Quote } from "./Quote"

const meta: Meta<typeof Quote> = {
  title: "UI/Quote",
  component: Quote,
  args: {
    quote: "I came in skeptical and left with the first real shift in years.",
    attribution: "Anonymous client",
    context: "Two-session intensive",
  },
}

type Story = StoryObj<typeof Quote>

export const Default: Story = {}

export default meta
