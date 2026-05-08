"use client"

import type { ComboboxRoot } from "@base-ui/react/combobox"
import { Combobox as BaseCombobox } from "@base-ui/react/combobox"
import { CaretDownIcon, CheckIcon, XIcon } from "@phosphor-icons/react"
import { Fragment, useRef } from "react"

import { cn } from "../utils/cn"

const sizeClasses = {
  md: "h-10 rounded-lg body-14-regular",
  sm: "h-8 rounded-md body-14-regular",
} as const

const chipsSizeClasses = {
  md: "min-h-10 rounded-lg",
  sm: "min-h-8 rounded-md",
} as const

const popupClasses = cn(
  "min-w-[var(--anchor-width)] origin-[var(--transform-origin)] rounded-lg p-1.5",
  "bg-elevation-surface-overlay-default",
  "shadow-[0_6px_12px_0_var(--shadow-color-elevation-default),0_0px_1px_0_var(--shadow-color-elevation-strong)]",
  "transition-[transform,scale,opacity] outline-none",
  "data-[ending-style]:scale-95 data-[ending-style]:opacity-0",
  "data-[starting-style]:scale-95 data-[starting-style]:opacity-0",
)

const itemClasses = cn(
  "group flex cursor-default items-center gap-2 rounded-md px-2 py-1.5 body-14-regular text-default",
  "outline-none select-none",
  "data-[highlighted]:bg-interaction-hovered",
  "data-[selected]:body-14-medium",
)

export type ComboboxProps<T> = {
  items: T[]
  value?: T | null
  defaultValue?: T | null
  onValueChange?: (
    value: T | null,
    eventDetails: ComboboxRoot.ChangeEventDetails,
  ) => void
  placeholder?: string
  size?: "md" | "sm"
  disabled?: boolean
  error?: boolean
  getLabel?: (item: T) => string
  className?: string
}

export function Combobox<T>({
  items,
  value,
  defaultValue,
  onValueChange,
  placeholder = "Placeholder",
  size = "md",
  disabled = false,
  error = false,
  getLabel = (item: T) => String(item),
  className,
}: ComboboxProps<T>) {
  return (
    <BaseCombobox.Root
      items={items}
      value={value}
      defaultValue={defaultValue}
      onValueChange={onValueChange}
      disabled={disabled}
      itemToStringLabel={(item) => getLabel(item)}
    >
      <div className={cn("relative", className)}>
        <BaseCombobox.Input
          className={cn(
            "w-full border pr-14 pl-3",
            sizeClasses[size],
            "bg-input-default text-default transition-colors outline-none",
            "placeholder:text-placeholder",
            "hover:bg-input-hovered",
            "focus:border-focused focus:ring-1 focus:ring-[var(--border-color-focused)]",
            "disabled:cursor-not-allowed disabled:border-disabled disabled:bg-input-disabled disabled:text-disabled disabled:placeholder:text-disabled",
            error
              ? "border-error ring-1 ring-[var(--border-color-error)]"
              : "border-input",
          )}
          placeholder={placeholder}
        />
        <BaseCombobox.Clear
          className={cn(
            "absolute top-1/2 right-7 inline-flex size-6 -translate-y-1/2 items-center justify-center rounded-sm text-subtle",
            "transition-colors hover:bg-interaction-hovered active:bg-interaction-pressed",
          )}
        >
          <XIcon size={16} weight="bold" />
        </BaseCombobox.Clear>
        <BaseCombobox.Icon className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-subtle">
          <CaretDownIcon size={16} weight="bold" />
        </BaseCombobox.Icon>
      </div>

      <BaseCombobox.Portal>
        <BaseCombobox.Positioner sideOffset={4}>
          <BaseCombobox.Popup className={popupClasses}>
            <BaseCombobox.List>
              {(item: T) => (
                <BaseCombobox.Item
                  key={getLabel(item)}
                  value={item}
                  className={itemClasses}
                >
                  <BaseCombobox.ItemIndicator
                    className="invisible inline-flex size-4 items-center justify-center text-default data-[selected]:visible"
                    keepMounted
                  >
                    <CheckIcon size={14} weight="bold" />
                  </BaseCombobox.ItemIndicator>
                  {getLabel(item)}
                </BaseCombobox.Item>
              )}
            </BaseCombobox.List>
            <BaseCombobox.Empty className="flex items-center px-2 py-1.5 body-14-regular text-subtle">
              No item found
            </BaseCombobox.Empty>
          </BaseCombobox.Popup>
        </BaseCombobox.Positioner>
      </BaseCombobox.Portal>
    </BaseCombobox.Root>
  )
}

export type MultiComboboxProps<T> = {
  items: T[]
  value?: T[]
  defaultValue?: T[]
  onValueChange?: (
    value: T[],
    eventDetails: ComboboxRoot.ChangeEventDetails,
  ) => void
  placeholder?: string
  size?: "md" | "sm"
  disabled?: boolean
  error?: boolean
  getLabel?: (item: T) => string
  className?: string
}

export function MultiCombobox<T>({
  items,
  value,
  defaultValue,
  onValueChange,
  placeholder = "Placeholder",
  size = "md",
  disabled = false,
  error = false,
  getLabel = (item: T) => String(item),
  className,
}: MultiComboboxProps<T>) {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <BaseCombobox.Root
      multiple
      items={items}
      value={value}
      defaultValue={defaultValue}
      onValueChange={onValueChange}
      disabled={disabled}
      itemToStringLabel={(item) => getLabel(item)}
    >
      <div className={cn("relative inline-flex", className)}>
        <BaseCombobox.Chips
          ref={containerRef}
          className={cn(
            "flex w-full flex-wrap items-center gap-1 border p-1.5",
            chipsSizeClasses[size],
            "bg-input-default transition-colors",
            error
              ? "border-error ring-1 ring-[var(--border-color-error)]"
              : "border-input focus-within:border-focused focus-within:ring-1 focus-within:ring-[var(--border-color-focused)]",
          )}
        >
          <BaseCombobox.Value>
            {(selectedValues: T[]) => (
              <Fragment>
                {selectedValues.map((item) => (
                  <BaseCombobox.Chip
                    key={getLabel(item)}
                    className="inline-flex items-center gap-1 rounded-md bg-interaction-hovered py-0.5 pr-1 pl-2 body-14-medium text-default"
                  >
                    {getLabel(item)}
                    <BaseCombobox.ChipRemove className="inline-flex size-6 items-center justify-center rounded-sm text-subtle transition-colors hover:bg-interaction-pressed">
                      <XIcon size={12} weight="bold" />
                    </BaseCombobox.ChipRemove>
                  </BaseCombobox.Chip>
                ))}
                <BaseCombobox.Input
                  className={cn(
                    "min-w-16 flex-1 bg-transparent py-0.5 pl-1.5 body-14-regular text-default outline-none",
                    "placeholder:text-placeholder",
                    "disabled:cursor-not-allowed disabled:text-disabled disabled:placeholder:text-disabled",
                  )}
                  placeholder={selectedValues.length === 0 ? placeholder : ""}
                />
              </Fragment>
            )}
          </BaseCombobox.Value>
        </BaseCombobox.Chips>
      </div>

      <BaseCombobox.Portal>
        <BaseCombobox.Positioner sideOffset={4} anchor={containerRef}>
          <BaseCombobox.Popup className={popupClasses}>
            <BaseCombobox.List>
              {(item: T) => (
                <BaseCombobox.Item
                  key={getLabel(item)}
                  value={item}
                  className={itemClasses}
                >
                  <BaseCombobox.ItemIndicator
                    className="invisible inline-flex size-4 items-center justify-center text-default data-[selected]:visible"
                    keepMounted
                  >
                    <CheckIcon size={14} weight="bold" />
                  </BaseCombobox.ItemIndicator>
                  {getLabel(item)}
                </BaseCombobox.Item>
              )}
            </BaseCombobox.List>
            <BaseCombobox.Empty className="flex items-center px-2 py-1.5 body-14-regular text-subtle">
              No item found
            </BaseCombobox.Empty>
          </BaseCombobox.Popup>
        </BaseCombobox.Positioner>
      </BaseCombobox.Portal>
    </BaseCombobox.Root>
  )
}
