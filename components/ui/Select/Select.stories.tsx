import type { Meta, StoryObj } from "@storybook/react"
import { Select } from "./Select"

const meta: Meta<typeof Select> = {
  title: "UI/Select",
  component: Select,
  args: {
    label: "What's this about?",
    options: [
      { value: "consult", label: "Booking a consult" },
      { value: "programs", label: "Programs & group work" },
      { value: "media", label: "Media or speaking" },
      { value: "other", label: "Something else" },
    ],
  },
}

type Story = StoryObj<typeof Select>

export const Default: Story = {}

export default meta
