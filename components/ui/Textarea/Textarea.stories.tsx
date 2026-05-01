import type { Meta, StoryObj } from "@storybook/react"
import { Textarea } from "./Textarea"

const meta: Meta<typeof Textarea> = {
  title: "UI/Textarea",
  component: Textarea,
  args: { label: "Your message", placeholder: "Tell us what brings you here…" },
}

type Story = StoryObj<typeof Textarea>

export const Default: Story = {}
export const WithError: Story = { args: { error: "A few sentences help us reply well." } }

export default meta
