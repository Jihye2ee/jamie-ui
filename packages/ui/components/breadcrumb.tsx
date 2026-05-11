"use client"

import { CaretRightIcon } from "@phosphor-icons/react"
import Link from "next/link"
import { createContext, useContext } from "react"
import type { ComponentProps, ReactNode } from "react"

import { cn } from "../utils/cn"

type BreadcrumbContextValue = {
  separator: ReactNode
}

function DefaultSeparator() {
  return <CaretRightIcon className="size-3.5 fill-subtlest" weight="bold" />
}

const BreadcrumbContext = createContext<BreadcrumbContextValue>({
  separator: <DefaultSeparator />,
})

function useBreadcrumbContext() {
  return useContext(BreadcrumbContext)
}

type BreadcrumbProps = ComponentProps<"nav"> & {
  separator?: ReactNode
}

export function BreadcrumbRoot({
  separator,
  className,
  children,
  ...props
}: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className={className} {...props}>
      <BreadcrumbContext.Provider
        value={{ separator: separator ?? <DefaultSeparator /> }}
      >
        <ol className="flex items-center gap-1">{children}</ol>
      </BreadcrumbContext.Provider>
    </nav>
  )
}

type BreadcrumbItemProps = ComponentProps<"li">

export function BreadcrumbItem({
  className,
  children,
  ...props
}: BreadcrumbItemProps) {
  const { separator } = useBreadcrumbContext()

  return (
    <li className={cn("inline-flex items-center gap-1", className)} {...props}>
      {children}
      <span aria-hidden className="flex items-center">
        {separator}
      </span>
    </li>
  )
}

type BreadcrumbLinkProps = ComponentProps<typeof Link>

export function BreadcrumbLink({ className, ...props }: BreadcrumbLinkProps) {
  return (
    <Link
      className={cn(
        "body-14-medium text-subtle transition-colors hover:text-default",
        className,
      )}
      {...props}
    />
  )
}

type BreadcrumbPageProps = ComponentProps<"li">

export function BreadcrumbPage({
  className,
  children,
  ...props
}: BreadcrumbPageProps) {
  return (
    <li className={cn("inline-flex items-center", className)} {...props}>
      <span aria-current="page" className="body-14-medium text-default">
        {children}
      </span>
    </li>
  )
}

type BreadcrumbEllipsisProps = ComponentProps<"li">

export function BreadcrumbEllipsis({
  className,
  ...props
}: BreadcrumbEllipsisProps) {
  const { separator } = useBreadcrumbContext()

  return (
    <li className={cn("inline-flex items-center gap-1", className)} {...props}>
      <span className="body-14-medium text-subtle" role="presentation">
        &hellip;
      </span>
      <span aria-hidden className="flex items-center">
        {separator}
      </span>
    </li>
  )
}

export { BreadcrumbRoot as Breadcrumb }
