"use client"

import type { CheckboxRoot } from "@base-ui/react/checkbox"
import { Checkbox as BaseCheckbox } from "@base-ui/react/checkbox"
import { CheckIcon, MinusIcon } from "@phosphor-icons/react"
import type { ReactNode } from "react"

import { cn } from "../utils/cn"

type CheckboxItemProps = {
  size?: "md" | "sm"
  checked?: boolean
  defaultChecked?: boolean
  onCheckedChange?: (
    checked: boolean,
    eventDetails: CheckboxRoot.ChangeEventDetails,
  ) => void
  indeterminate?: boolean
  disabled?: boolean
  name?: string
  value?: string
  required?: boolean
  className?: string
  parent?: boolean
  inputRef?: React.Ref<HTMLInputElement>
  id?: string
}

const checkboxSizeClasses = {
  md: "size-5 rounded-[5px]",
  sm: "size-4 rounded-[4px]",
} as const

const checkboxWithLabelSizeClasses = {
  md: "size-4 rounded-[4px]",
  sm: "size-4 rounded-[4px]",
} as const

const checkboxIconSize = {
  md: 14,
  sm: 12,
} as const

const checkboxWithLabelIconSize = {
  md: 12,
  sm: 12,
} as const

export function CheckboxItem({
  size = "md",
  className,
  withLabel = false,
  ...props
}: CheckboxItemProps & { withLabel?: boolean }) {
  const sizeClasses = withLabel
    ? checkboxWithLabelSizeClasses
    : checkboxSizeClasses
  const iconSize = withLabel ? checkboxWithLabelIconSize : checkboxIconSize

  return (
    <span className="inline-flex shrink-0 items-center justify-center p-1">
      <BaseCheckbox.Root
        {...props}
        className={cn(
          "inline-flex shrink-0 cursor-pointer items-center justify-center border transition-colors duration-150 ease-out",
          "border-strong bg-input-default",
          "hover:bg-input-hovered",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--border-color-focused)]",
          "data-[checked]:border-transparent data-[checked]:bg-neutral-bold-default data-[checked]:hover:bg-neutral-bold-hovered",
          "data-[indeterminate]:border-transparent data-[indeterminate]:bg-neutral-bold-default data-[indeterminate]:hover:bg-neutral-bold-hovered",
          "data-[disabled]:cursor-not-allowed data-[disabled]:border-disabled data-[disabled]:bg-input-disabled data-[disabled]:hover:bg-input-disabled",
          "data-[disabled]:data-[checked]:border-transparent data-[disabled]:data-[checked]:bg-disabled data-[disabled]:data-[checked]:hover:bg-disabled",
          "data-[disabled]:data-[indeterminate]:border-transparent data-[disabled]:data-[indeterminate]:bg-disabled data-[disabled]:data-[indeterminate]:hover:bg-disabled",
          sizeClasses[size],
          className,
        )}
      >
        <BaseCheckbox.Indicator
          keepMounted
          className="flex items-center justify-center text-inverse data-[unchecked]:hidden"
          render={(renderProps, state) => (
            <span {...renderProps}>
              {state.indeterminate ? (
                <MinusIcon size={iconSize[size]} weight="bold" />
              ) : (
                <CheckIcon size={iconSize[size]} weight="bold" />
              )}
            </span>
          )}
        />
      </BaseCheckbox.Root>
    </span>
  )
}

type CheckboxProps = {
  label: ReactNode
  size?: "md" | "sm"
  checked?: boolean
  defaultChecked?: boolean
  onCheckedChange?: (
    checked: boolean,
    eventDetails: CheckboxRoot.ChangeEventDetails,
  ) => void
  indeterminate?: boolean
  disabled?: boolean
  name?: string
  value?: string
  required?: boolean
  className?: string
  parent?: boolean
  id?: string
}

const labelTextClasses = {
  md: "body-14-regular",
  sm: "body-12-regular",
} as const

export function Checkbox({
  label,
  size = "md",
  disabled = false,
  className,
  ...props
}: CheckboxProps) {
  return (
    <label
      className={cn(
        "inline-flex cursor-pointer items-center gap-1 select-none",
        disabled && "cursor-not-allowed",
        className,
      )}
    >
      <CheckboxItem size={size} disabled={disabled} withLabel {...props} />
      <span
        className={cn(
          labelTextClasses[size],
          "text-default",
          disabled && "text-disabled",
        )}
      >
        {label}
      </span>
    </label>
  )
}
