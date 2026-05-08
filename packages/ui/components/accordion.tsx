"use client"

import { Accordion as BaseAccordion } from "@base-ui/react/accordion"
import { CaretDownIcon } from "@phosphor-icons/react"
import type { ComponentProps, ReactNode } from "react"

import { cn } from "../utils/cn"

export type AccordionRootProps = Omit<
  ComponentProps<typeof BaseAccordion.Root>,
  "className"
> & {
  className?: string
}

export function AccordionRoot({ className, ...props }: AccordionRootProps) {
  return <BaseAccordion.Root className={cn("w-full", className)} {...props} />
}

export type AccordionItemProps = Omit<
  ComponentProps<typeof BaseAccordion.Item>,
  "className"
> & {
  title: ReactNode
  children: ReactNode
  className?: string
}

export function AccordionItem({
  title,
  children,
  className,
  ...props
}: AccordionItemProps) {
  return (
    <BaseAccordion.Item
      className={cn("border-b border-default", className)}
      {...props}
    >
      <BaseAccordion.Header>
        <BaseAccordion.Trigger
          className={cn(
            "group flex w-full cursor-pointer items-center justify-between py-4",
            "body-16-semibold text-default",
            "transition-opacity hover:opacity-80",
            "focus-visible:outline-hidden",
          )}
        >
          {title}
          <CaretDownIcon
            size={20}
            className={cn(
              "shrink-0 text-default transition-[rotate] duration-200",
              "group-data-panel-open:rotate-180",
            )}
          />
        </BaseAccordion.Trigger>
      </BaseAccordion.Header>
      <BaseAccordion.Panel
        className={cn(
          "overflow-hidden",
          "transition-[height] duration-200 ease-out",
          "h-(--accordion-panel-height)",
          "data-ending-style:h-0",
          "data-starting-style:h-0",
        )}
      >
        <div className="pb-4 body-14-regular text-default">{children}</div>
      </BaseAccordion.Panel>
    </BaseAccordion.Item>
  )
}

export { AccordionRoot as Accordion }
