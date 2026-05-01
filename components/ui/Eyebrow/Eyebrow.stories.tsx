import type { Meta, StoryObj } from "@storybook/react"
import { Eyebrow } from "./Eyebrow"

const meta: Meta<typeof Eyebrow> = {
  title: "UI/Eyebrow",
  component: Eyebrow,
  args: { children: "Approach", tone: "gold" },
  argTypes: {
    tone: { options: ["gold", "ink", "mist", "bone"], control: { type: "select" } },
  },
}

type Story = StoryObj<typeof Eyebrow>

export const Gold: Story = { args: { tone: "gold" } }
export const Ink: Story = { args: { tone: "ink" } }

export default meta
