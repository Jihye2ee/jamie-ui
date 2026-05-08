"use client"

import type { InputHTMLAttributes, ReactNode, Ref } from "react"

import { cn } from "../utils/cn"
import { useFieldContext } from "./field"

type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "size"> & {
  ref?: Ref<HTMLInputElement>
  size?: "md" | "sm"
  error?: boolean
  startIcon?: ReactNode
  endIcon?: ReactNode
}

const paddingMap = {
  md: { start: "pl-10", end: "pr-10", default: "pl-3", defaultEnd: "pr-3" },
  sm: { start: "pl-9", end: "pr-9", default: "pl-3", defaultEnd: "pr-3" },
} as const

export function Input({
  size = "md",
  error: errorProp = false,
  disabled: disabledProp = false,
  startIcon,
  endIcon,
  className,
  id: idProp,
  ref,
  ...props
}: InputProps) {
  const fieldContext = useFieldContext()
  const error = errorProp || (fieldContext?.error ?? false)
  const disabled = disabledProp || (fieldContext?.disabled ?? false)
  const id = idProp ?? fieldContext?.controlId
  const describedBy =
    props["aria-describedby"] ??
    (fieldContext
      ? [fieldContext.descriptionId, fieldContext.errorId]
          .filter(Boolean)
          .join(" ") || undefined
      : undefined)
  const sizeClasses = {
    md: "h-[42px] rounded-lg body-14-regular",
    sm: "h-8 rounded-md body-14-regular",
  }[size]

  const pad = paddingMap[size]
  const paddingLeft = startIcon ? pad.start : pad.default
  const paddingRight = endIcon ? pad.end : pad.defaultEnd

  const borderClasses = error
    ? "border border-error ring-1 ring-[var(--border-color-error)]"
    : "border border-input focus:border-focused focus:ring-1 focus:ring-[var(--border-color-focused)]"

  const iconSizeClasses = {
    md: "size-5",
    sm: "size-4",
  }[size]

  return (
    <div className={cn("relative inline-flex", className)}>
      {startIcon && (
        <span
          className={cn(
            "pointer-events-none absolute top-1/2 left-3 flex -translate-y-1/2 items-center justify-center text-subtle",
            iconSizeClasses,
          )}
        >
          {startIcon}
        </span>
      )}
      <input
        ref={ref}
        id={id}
        disabled={disabled}
        aria-invalid={error || undefined}
        aria-describedby={describedBy}
        className={cn(
          "w-full",
          sizeClasses,
          paddingLeft,
          paddingRight,
          borderClasses,
          "bg-input-default text-default transition-colors outline-none placeholder:text-placeholder hover:bg-input-hovered disabled:cursor-not-allowed disabled:border-disabled disabled:bg-input-disabled disabled:text-disabled disabled:placeholder:text-disabled",
        )}
        {...props}
      />
      {endIcon && (
        <span
          className={cn(
            "pointer-events-none absolute top-1/2 right-3 flex -translate-y-1/2 items-center justify-center text-subtle",
            iconSizeClasses,
          )}
        >
          {endIcon}
        </span>
      )}
    </div>
  )
}
