"use client"

import { Radio as BaseRadio } from "@base-ui/react/radio"
import { RadioGroup as BaseRadioGroup } from "@base-ui/react/radio-group"
import type { ReactNode } from "react"

import { cn } from "../utils/cn"

type RadioGroupProps = {
  children: ReactNode
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  disabled?: boolean
  className?: string
}

export function RadioGroup({ children, className, ...props }: RadioGroupProps) {
  return (
    <BaseRadioGroup
      {...props}
      className={cn("flex flex-col gap-1.5", className)}
    >
      {children}
    </BaseRadioGroup>
  )
}

type RadioItemProps = {
  value: string
  size?: "md" | "sm"
  disabled?: boolean
  className?: string
}

const radioSizeClasses = {
  md: "size-5 rounded-full data-[checked]:border-[6px]",
  sm: "size-[18px] rounded-full data-[checked]:border-[5px]",
} as const

export function RadioItem({
  value,
  size = "md",
  disabled,
  className,
}: RadioItemProps) {
  return (
    <BaseRadio.Root
      value={value}
      disabled={disabled}
      className={cn(
        "hover:bg-input-hovered focus-visible:outline-(--border-color-focused)",
        "data-checked:border-selected data-checked:hover:border-bold",
        "data-disabled:border-disabled data-disabled:bg-input-disabled data-disabled:hover:bg-input-disabled",
        "data-disabled:data-checked:border-disabled data-disabled:data-checked:hover:border-disabled",
        "inline-flex shrink-0 cursor-pointer items-center justify-center border border-input bg-input-default transition-colors duration-150 ease-out focus-visible:outline-2 focus-visible:outline-offset-2",
        "data-disabled:cursor-not-allowed",
        radioSizeClasses[size],
        className,
      )}
    />
  )
}

type RadioProps = {
  label: ReactNode
  value: string
  size?: "md" | "sm"
  disabled?: boolean
  className?: string
}

const gapClasses = {
  md: "gap-1",
  sm: "gap-1",
} as const

export function Radio({
  label,
  value,
  size = "md",
  disabled = false,
  className,
}: RadioProps) {
  return (
    <label
      className={cn(
        "inline-flex cursor-pointer items-center select-none",
        gapClasses[size],
        disabled && "cursor-not-allowed",
        className,
      )}
    >
      <span className="flex items-center justify-center p-1">
        <RadioItem value={value} size={size} disabled={disabled} />
      </span>
      <span
        className={cn(
          "body-14-regular text-default",
          disabled && "text-disabled",
        )}
      >
        {label}
      </span>
    </label>
  )
}
