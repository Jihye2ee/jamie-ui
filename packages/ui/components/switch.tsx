"use client"

import { Switch as BaseSwitch } from "@base-ui/react/switch"
import type { ComponentProps, ReactNode } from "react"

import { cn } from "../utils/cn"

type SwitchItemProps = ComponentProps<typeof BaseSwitch.Root>

export function SwitchItem({ className, ...props }: SwitchItemProps) {
  return (
    <BaseSwitch.Root
      {...props}
      className={cn(
        "group/switch relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-[14px] transition-colors duration-200 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--border-color-focused) data-checked:bg-success-bold-default data-checked:hover:bg-success-bold-hovered data-disabled:cursor-not-allowed data-disabled:opacity-60 data-disabled:hover:bg-neutral-default data-disabled:data-checked:hover:bg-success-bold-default data-unchecked:bg-neutral-default data-unchecked:hover:bg-neutral-hovered",
        className,
      )}
    >
      <span className="pointer-events-none absolute inset-0 rounded-[inherit] bg-linear-to-b from-transparent to-black/20 opacity-0 transition-opacity duration-200 group-data-checked/switch:opacity-100" />
      <span className="pointer-events-none absolute inset-0 rounded-[inherit] bg-linear-to-b from-transparent to-black/10 opacity-0 transition-opacity duration-200 group-data-unchecked/switch:opacity-100" />

      <BaseSwitch.Thumb
        className={cn(
          "pointer-events-none relative size-5 overflow-hidden rounded-full bg-white transition-all duration-200 ease-out",
          "shadow-[0_2px_6px_var(--shadow-color-elevation-default),0_0_1px_var(--shadow-color-elevation-strong)]",
          "ring-1 ring-white ring-inset",
          "data-checked:translate-x-[22px] data-unchecked:translate-x-0.5",
        )}
      >
        <span className="absolute inset-px rounded-full bg-[conic-gradient(transparent_0%,black_24.5%,transparent_64.4%,black_100%)] opacity-10" />
      </BaseSwitch.Thumb>
    </BaseSwitch.Root>
  )
}

type SwitchProps = Omit<ComponentProps<typeof BaseSwitch.Root>, "className"> & {
  label: ReactNode
  className?: string
}

export function Switch({
  label,
  disabled = false,
  className,
  ...props
}: SwitchProps) {
  return (
    <label
      className={cn(
        "inline-flex cursor-pointer items-center gap-2 select-none",
        disabled && "cursor-not-allowed",
        className,
      )}
    >
      <SwitchItem disabled={disabled} {...props} />
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
