import type { ComponentProps } from "react"

import { cn } from "../utils/cn"

type PanelProps = ComponentProps<"section">

export const Panel = ({ className, children, ...props }: PanelProps) => {
  return (
    <section
      className={cn(
        "flex flex-col gap-4 rounded-xl bg-elevation-surface-raised-default p-6 shadow-raised",
        className,
      )}
      {...props}
    >
      {children}
    </section>
  )
}
