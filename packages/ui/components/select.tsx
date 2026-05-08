"use client"

import { Select as BaseSelect } from "@base-ui/react/select"
import { CaretDownIcon, CheckIcon } from "@phosphor-icons/react"
import type { ComponentProps, ReactNode } from "react"

import { cn } from "../utils/cn"

type SelectProps = Omit<
  ComponentProps<typeof BaseSelect.Root>,
  "onValueChange"
> & {
  children: ReactNode
  onValueChange?: (value: string) => void
}

export function SelectRoot({ children, onValueChange, ...props }: SelectProps) {
  return (
    <BaseSelect.Root
      {...props}
      onValueChange={
        onValueChange ? (value) => onValueChange(String(value)) : undefined
      }
    >
      {children}
    </BaseSelect.Root>
  )
}

type SelectTriggerProps = {
  placeholder?: string
  size?: "md" | "sm"
  error?: boolean
  disabled?: boolean
  className?: string
}

const triggerSizeClasses = {
  md: "h-10 rounded-lg px-3 body-14-regular",
  sm: "h-8 rounded-md px-2.5 body-14-regular",
} as const

export function SelectTrigger({
  placeholder = "Placeholder",
  size = "md",
  error = false,
  disabled,
  className,
}: SelectTriggerProps) {
  return (
    <BaseSelect.Trigger
      disabled={disabled}
      className={cn(
        "inline-flex w-full items-center justify-between gap-1 border bg-input-default text-default transition-colors outline-none hover:bg-input-hovered focus:border-focused focus:ring-1 focus:ring-(--border-color-focused) data-disabled:cursor-not-allowed data-disabled:border-input data-disabled:bg-input-disabled data-disabled:text-disabled data-disabled:hover:bg-input-disabled data-popup-open:border-focused data-popup-open:ring-1 data-popup-open:ring-(--border-color-focused)",
        error
          ? "border-error ring-1 ring-[var(--border-color-error)]"
          : "border-input",
        triggerSizeClasses[size],
        className,
      )}
    >
      <BaseSelect.Value
        placeholder={placeholder}
        className="truncate data-placeholder:text-placeholder"
      />
      <BaseSelect.Icon className="shrink-0 text-subtle">
        <CaretDownIcon size={16} />
      </BaseSelect.Icon>
    </BaseSelect.Trigger>
  )
}

type SelectContentProps = {
  children: ReactNode
  className?: string
  side?: "top" | "bottom" | "left" | "right"
  sideOffset?: number
}

export function SelectContent({
  children,
  className,
  side = "bottom",
  sideOffset = 4,
}: SelectContentProps) {
  return (
    <BaseSelect.Portal>
      <BaseSelect.Positioner
        side={side}
        sideOffset={sideOffset}
        alignItemWithTrigger={false}
        align="start"
      >
        <BaseSelect.Popup
          className={cn(
            "min-w-(--anchor-width) origin-(--transform-origin) rounded-lg bg-elevation-surface-overlay-default p-1.5 shadow-[0_6px_12px_0_var(--shadow-color-elevation-default),0_0px_1px_0_var(--shadow-color-elevation-strong)] transition-[transform,scale,opacity] outline-none data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0",
            className,
          )}
        >
          {children}
        </BaseSelect.Popup>
      </BaseSelect.Positioner>
    </BaseSelect.Portal>
  )
}

type SelectItemProps = {
  children: ReactNode
  value: string
  disabled?: boolean
  className?: string
}

export function SelectItem({
  children,
  value,
  disabled,
  className,
}: SelectItemProps) {
  return (
    <BaseSelect.Item
      value={value}
      disabled={disabled}
      className={cn(
        "flex cursor-default items-center gap-2 rounded-md px-2 py-1.5 body-14-regular text-default outline-none select-none data-disabled:pointer-events-none data-disabled:text-disabled data-highlighted:bg-interaction-hovered data-selected:body-14-medium",
        className,
      )}
    >
      <span className="inline-flex size-4 shrink-0 items-center justify-center">
        <BaseSelect.ItemIndicator>
          <CheckIcon size={14} weight="bold" />
        </BaseSelect.ItemIndicator>
      </span>
      <BaseSelect.ItemText>{children}</BaseSelect.ItemText>
    </BaseSelect.Item>
  )
}

type SelectGroupProps = {
  children: ReactNode
  className?: string
}

export function SelectGroup({ children, className }: SelectGroupProps) {
  return (
    <BaseSelect.Group className={cn("flex flex-col", className)}>
      {children}
    </BaseSelect.Group>
  )
}

type SelectGroupLabelProps = {
  children: ReactNode
  className?: string
}

export function SelectGroupLabel({
  children,
  className,
}: SelectGroupLabelProps) {
  return (
    <BaseSelect.GroupLabel
      className={cn("px-2 py-1.5 body-12-medium text-subtlest", className)}
    >
      {children}
    </BaseSelect.GroupLabel>
  )
}

export function SelectSeparator({ className }: { className?: string }) {
  return (
    <BaseSelect.Separator
      className={cn("my-1 border-t border-default", className)}
    />
  )
}

export { SelectRoot as Select }
