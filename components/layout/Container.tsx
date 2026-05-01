import { cva, type VariantProps } from "class-variance-authority"
import { twMerge } from "tailwind-merge"

const container = cva("mx-auto w-full px-6", {
  variants: {
    width: {
      page: "max-w-7xl",
      content: "max-w-6xl",
      prose: "max-w-2xl",
    },
  },
  defaultVariants: {
    width: "page",
  },
})

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof container> {
  children: React.ReactNode
}

export function Container({ children, className, width, ...props }: ContainerProps) {
  return (
    <div className={twMerge(container({ width, className }))} {...props}>
      {children}
    </div>
  )
}
