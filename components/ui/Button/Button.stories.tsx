import type { Meta, StoryObj } from "@storybook/react"
import { Button } from "./Button"

const meta: Meta<typeof Button> = {
  title: "UI/Button",
  component: Button,
  args: {
    intent: "primary",
    underline: false,
    children: "Book a consult",
    size: "lg",
    href: "#",
  },
  argTypes: {
    intent: {
      options: ["primary", "secondary", "ghost", "gold"],
      control: { type: "select" },
    },
    size: {
      options: ["sm", "lg"],
      control: { type: "select" },
    },
  },
}

type Story = StoryObj<typeof Button>

export const Primary: Story = {
  args: { intent: "primary" },
}

export const Secondary: Story = {
  args: { intent: "secondary", children: "Learn more" },
}

export const Ghost: Story = {
  args: { intent: "ghost", children: "Read article" },
}

export const Gold: Story = {
  args: { intent: "gold", children: "Start your journey" },
}

export default meta
