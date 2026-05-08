"use client"

import { Tabs as BaseTabs } from "@base-ui/react/tabs"
import { cva, type VariantProps } from "class-variance-authority"
import type { ComponentProps, ReactNode } from "react"

import { cn } from "../utils/cn"

const tabsListClasses =
  "relative flex shrink-0 items-center border-b border-default"

const tabVariants = cva(
  cn(
    "relative inline-flex cursor-pointer items-center justify-center whitespace-nowrap transition-colors duration-200 ease-out outline-none select-none",
    "text-subtle hover:text-default",
    "data-active:text-default",
    "data-disabled:cursor-not-allowed data-disabled:text-disabled data-disabled:hover:text-disabled",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--border-color-focused)",
  ),
  {
    variants: {
      size: {
        sm: "h-8 px-3 body-12-medium data-[active]:body-12-semibold",
        md: "h-10 px-4 body-14-medium data-[active]:body-14-semibold",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
)

type TabsRootProps = Omit<ComponentProps<typeof BaseTabs.Root>, "className"> & {
  className?: string
  children: ReactNode
}

export function TabsRoot({ className, children, ...props }: TabsRootProps) {
  return (
    <BaseTabs.Root className={cn("flex flex-col", className)} {...props}>
      {children}
    </BaseTabs.Root>
  )
}

type TabsListProps = Omit<ComponentProps<typeof BaseTabs.List>, "className"> & {
  className?: string
  children: ReactNode
}

export function TabsList({ className, children, ...props }: TabsListProps) {
  return (
    <BaseTabs.List className={cn(tabsListClasses, className)} {...props}>
      {children}
    </BaseTabs.List>
  )
}

type TabsTabProps = Omit<ComponentProps<typeof BaseTabs.Tab>, "className"> &
  VariantProps<typeof tabVariants> & {
    className?: string
    children: ReactNode
  }

export function TabsTab({
  className,
  size = "md",
  children,
  ...props
}: TabsTabProps) {
  return (
    <BaseTabs.Tab className={cn(tabVariants({ size }), className)} {...props}>
      {children}
    </BaseTabs.Tab>
  )
}

type TabsIndicatorProps = Omit<
  ComponentProps<typeof BaseTabs.Indicator>,
  "className"
> & {
  className?: string
}

export function TabsIndicator({ className, ...props }: TabsIndicatorProps) {
  return (
    <BaseTabs.Indicator
      className={cn(
        "absolute -bottom-px h-0.5 w-(--active-tab-width) translate-x-(--active-tab-left) rounded-full bg-neutral-bold-default transition-[translate,width] duration-200 ease-out",
        className,
      )}
      {...props}
    />
  )
}

type TabsPanelProps = Omit<
  ComponentProps<typeof BaseTabs.Panel>,
  "className"
> & {
  className?: string
  children: ReactNode
}

export function TabsPanel({ className, children, ...props }: TabsPanelProps) {
  return (
    <BaseTabs.Panel className={cn("pt-4 outline-none", className)} {...props}>
      {children}
    </BaseTabs.Panel>
  )
}

export { TabsRoot as Tabs }
export { tabVariants }
