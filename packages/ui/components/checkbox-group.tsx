"use client"

import { CheckboxGroup as BaseCheckboxGroup } from "@base-ui/react/checkbox-group"
import type { ComponentProps, ReactNode } from "react"

import { cn } from "../utils/cn"

export type CheckboxGroupProps = Omit<
  ComponentProps<typeof BaseCheckboxGroup>,
  "className"
> & {
  title?: ReactNode
  columns?: number
  parentCheckbox?: ReactNode
  allValues?: string[]
  className?: string
}

export function CheckboxGroup({
  title,
  columns,
  parentCheckbox,
  allValues,
  className,
  children,
  ...props
}: CheckboxGroupProps) {
  return (
    <BaseCheckboxGroup className={cn("flex flex-col", className)} {...props}>
      {title && (
        <span className="mb-2 body-14-semibold text-default">{title}</span>
      )}
      {parentCheckbox && <div className="mb-2">{parentCheckbox}</div>}
      <div
        className={cn(
          parentCheckbox && "pl-3",
          columns ? "grid gap-x-6 gap-y-1.5" : "flex flex-col gap-1.5",
        )}
        style={
          columns
            ? { gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }
            : undefined
        }
      >
        {children}
      </div>
    </BaseCheckboxGroup>
  )
}
