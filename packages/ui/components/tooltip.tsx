"use client"

import { Tooltip as BaseTooltip } from "@base-ui/react/tooltip"
import type { ComponentProps, ReactNode } from "react"

import { cn } from "../utils/cn"

type TooltipProviderProps = ComponentProps<typeof BaseTooltip.Provider>

export function TooltipProvider({ children, ...props }: TooltipProviderProps) {
  return <BaseTooltip.Provider {...props}>{children}</BaseTooltip.Provider>
}

type TooltipProps = ComponentProps<typeof BaseTooltip.Root> & {
  children: ReactNode
}

export function TooltipRoot({ children, ...props }: TooltipProps) {
  return <BaseTooltip.Root {...props}>{children}</BaseTooltip.Root>
}

type TooltipTriggerProps = ComponentProps<typeof BaseTooltip.Trigger>

export function TooltipTrigger(props: TooltipTriggerProps) {
  return <BaseTooltip.Trigger {...props} />
}

type TooltipContentProps = {
  children: ReactNode
  className?: string
  side?: "top" | "bottom" | "left" | "right"
  align?: "start" | "center" | "end"
  sideOffset?: number
}

export function TooltipContent({
  children,
  className,
  side = "top",
  align = "center",
  sideOffset = 8,
}: TooltipContentProps) {
  return (
    <BaseTooltip.Portal>
      <BaseTooltip.Positioner side={side} align={align} sideOffset={sideOffset}>
        <BaseTooltip.Popup
          className={cn(
            "max-w-xs origin-(--transform-origin) rounded-md bg-neutral-bold-default px-2.5 py-1.5 body-12-medium text-inverse transition-[transform,scale,opacity] outline-none data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0",
            className,
          )}
        >
          {children}
        </BaseTooltip.Popup>
      </BaseTooltip.Positioner>
    </BaseTooltip.Portal>
  )
}

export { TooltipRoot as Tooltip }
