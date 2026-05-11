"use client"

import { Popover as BasePopover } from "@base-ui/react/popover"
import type { ComponentProps, ReactNode } from "react"

import { cn } from "../utils/cn"

type PopoverProps = ComponentProps<typeof BasePopover.Root>

export function PopoverRoot({ children, ...props }: PopoverProps) {
  return <BasePopover.Root {...props}>{children}</BasePopover.Root>
}

export type PopoverTriggerProps = ComponentProps<typeof BasePopover.Trigger>

export function PopoverTrigger(props: PopoverTriggerProps) {
  return <BasePopover.Trigger {...props} />
}

export type PopoverCloseProps = ComponentProps<typeof BasePopover.Close>

export function PopoverClose(props: PopoverCloseProps) {
  return <BasePopover.Close {...props} />
}

type PopoverContentProps = {
  children: ReactNode
  className?: string
  side?: "top" | "bottom" | "left" | "right"
  align?: "start" | "center" | "end"
  sideOffset?: number
}

export function PopoverContent({
  children,
  className,
  side = "bottom",
  align = "center",
  sideOffset = 8,
}: PopoverContentProps) {
  return (
    <BasePopover.Portal>
      <BasePopover.Positioner side={side} align={align} sideOffset={sideOffset}>
        <BasePopover.Popup
          className={cn(
            "max-w-xs origin-(--transform-origin) rounded-lg bg-elevation-surface-overlay-default p-4 shadow-[0_6px_12px_0_var(--shadow-color-elevation-default),0_0px_1px_0_var(--shadow-color-elevation-strong)] transition-[transform,scale,opacity] outline-none data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0",
            className,
          )}
        >
          {children}
        </BasePopover.Popup>
      </BasePopover.Positioner>
    </BasePopover.Portal>
  )
}

type PopoverTitleProps = {
  children: ReactNode
  className?: string
}

export function PopoverTitle({ children, className }: PopoverTitleProps) {
  return (
    <BasePopover.Title
      className={cn("body-14-semibold text-default", className)}
    >
      {children}
    </BasePopover.Title>
  )
}

type PopoverDescriptionProps = {
  children: ReactNode
  className?: string
}

export function PopoverDescription({
  children,
  className,
}: PopoverDescriptionProps) {
  return (
    <BasePopover.Description
      className={cn("mt-1 body-14-regular text-subtle", className)}
    >
      {children}
    </BasePopover.Description>
  )
}

export { PopoverRoot as Popover }
