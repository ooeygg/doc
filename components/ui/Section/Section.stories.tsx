import type { Meta, StoryObj } from "@storybook/react"
import { Section } from "./Section"

const meta: Meta<typeof Section> = {
  title: "UI/Section",
  component: Section,
  args: {
    eyebrow: "Approach",
    heading: "Where science meets soul",
    children: "Body content goes here.",
    surface: "bone",
  },
  argTypes: {
    surface: { options: ["bone", "mist", "ink"], control: { type: "select" } },
  },
}

type Story = StoryObj<typeof Section>

export const Bone: Story = { args: { surface: "bone" } }
export const Mist: Story = { args: { surface: "mist" } }
export const Ink: Story = { args: { surface: "ink" } }

export default meta
