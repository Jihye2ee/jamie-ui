"use client"

import { Separator as BaseSeparator } from "@base-ui/react/separator"
import type { ComponentProps } from "react"

import { cn } from "../utils/cn"

export type SeparatorProps = Omit<
  ComponentProps<typeof BaseSeparator>,
  "className"
> & {
  className?: string
}

export function Separator({ className, ...props }: SeparatorProps) {
  return (
    <BaseSeparator
      className={cn("my-2 border-t border-default", className)}
      {...props}
    />
  )
}
