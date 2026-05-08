"use client"

import type { ComponentProps, ReactNode } from "react"

import { cn } from "../utils/cn"

export type CardProps = Omit<ComponentProps<"div">, "className" | "title"> & {
  title?: ReactNode
  description?: ReactNode
  children?: ReactNode
  className?: string
}

export function Card({
  title,
  description,
  className,
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "bg-default rounded-xl border border-default p-6",
        className,
      )}
      {...props}
    >
      {title && (
        <h3 className="mb-1 title-16-semibold text-default">{title}</h3>
      )}
      {description && (
        <p className="mb-4 body-12-medium text-subtle">{description}</p>
      )}
      {children && <div className="flex flex-col gap-4">{children}</div>}
    </div>
  )
}
