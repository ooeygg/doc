import type { Meta, StoryObj } from "@storybook/react"
import { Badge } from "./Badge"

const meta: Meta<typeof Badge> = {
  title: "UI/Badge",
  component: Badge,
  args: { children: "Energy Psychiatrist of the Year · 2019", variant: "accolade" },
  argTypes: {
    variant: { options: ["accolade", "press", "category"], control: { type: "select" } },
  },
}

type Story = StoryObj<typeof Badge>

export const Accolade: Story = { args: { variant: "accolade" } }
export const Press: Story = { args: { variant: "press", children: "MysticMag" } }
export const Category: Story = { args: { variant: "category", children: "Energy medicine" } }

export default meta
