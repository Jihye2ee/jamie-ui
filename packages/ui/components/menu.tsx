"use client"

import { Menu as BaseMenu } from "@base-ui/react/menu"
import type { ComponentProps, ReactNode } from "react"

import { cn } from "../utils/cn"

type MenuProps = ComponentProps<typeof BaseMenu.Root>

export function MenuRoot({ children, ...props }: MenuProps) {
  return <BaseMenu.Root {...props}>{children}</BaseMenu.Root>
}

export type MenuTriggerProps = ComponentProps<typeof BaseMenu.Trigger>

export function MenuTrigger(props: MenuTriggerProps) {
  return <BaseMenu.Trigger {...props} />
}

type MenuContentProps = {
  children: ReactNode
  className?: string
  side?: "top" | "bottom" | "left" | "right"
  align?: "start" | "center" | "end"
  sideOffset?: number
}

export function MenuContent({
  children,
  className,
  side = "bottom",
  align = "start",
  sideOffset = 4,
}: MenuContentProps) {
  return (
    <BaseMenu.Portal>
      <BaseMenu.Positioner side={side} align={align} sideOffset={sideOffset}>
        <BaseMenu.Popup
          className={cn(
            "min-w-40 origin-(--transform-origin) rounded-lg bg-elevation-surface-overlay-default p-1.5 shadow-[0_6px_12px_0_var(--shadow-color-elevation-default),0_0px_1px_0_var(--shadow-color-elevation-strong)] transition-[transform,scale,opacity] outline-none data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0",
            className,
          )}
        >
          {children}
        </BaseMenu.Popup>
      </BaseMenu.Positioner>
    </BaseMenu.Portal>
  )
}

type MenuItemProps = {
  children: ReactNode
  className?: string
  onClick?: () => void
  disabled?: boolean
  danger?: boolean
}

export function MenuItem({
  children,
  className,
  onClick,
  disabled,
  danger,
}: MenuItemProps) {
  return (
    <BaseMenu.Item
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "flex cursor-default items-center gap-2 rounded-md px-2 py-1.5 body-14-regular outline-none select-none data-disabled:pointer-events-none data-disabled:text-disabled data-highlighted:bg-interaction-hovered",
        danger
          ? "text-error data-[highlighted]:bg-error-default"
          : "text-default",
        className,
      )}
    >
      {children}
    </BaseMenu.Item>
  )
}

type MenuSeparatorProps = {
  className?: string
}

export function MenuSeparator({ className }: MenuSeparatorProps) {
  return (
    <BaseMenu.Separator
      className={cn("my-1 border-t border-default", className)}
    />
  )
}

type MenuGroupProps = {
  children: ReactNode
  className?: string
}

export function MenuGroup({ children, className }: MenuGroupProps) {
  return (
    <BaseMenu.Group className={cn("flex flex-col gap-1", className)}>
      {children}
    </BaseMenu.Group>
  )
}

type MenuGroupLabelProps = {
  children: ReactNode
  className?: string
}

export function MenuGroupLabel({ children, className }: MenuGroupLabelProps) {
  return (
    <BaseMenu.GroupLabel
      className={cn("px-2 py-1.5 body-12-medium text-subtlest", className)}
    >
      {children}
    </BaseMenu.GroupLabel>
  )
}

export { MenuRoot as Menu }
