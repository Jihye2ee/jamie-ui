"use client"

import type { HTMLAttributes, TdHTMLAttributes, ThHTMLAttributes } from "react"

import { cn } from "../utils/cn"

type TableProps = HTMLAttributes<HTMLTableElement>

export function Table({ className, ...props }: TableProps) {
  return (
    <div className="relative w-full overflow-auto">
      <table
        className={cn("w-full caption-bottom body-14-regular", className)}
        {...props}
      />
    </div>
  )
}

type TableHeaderProps = HTMLAttributes<HTMLTableSectionElement>

export function TableHeader({ className, ...props }: TableHeaderProps) {
  return (
    <thead
      className={cn(
        "bg-neutral-subtle-default [&_tr]:border-b [&_tr]:border-default",
        className,
      )}
      {...props}
    />
  )
}

type TableBodyProps = HTMLAttributes<HTMLTableSectionElement>

export function TableBody({ className, ...props }: TableBodyProps) {
  return (
    <tbody className={cn("[&_tr:last-child]:border-0", className)} {...props} />
  )
}

type TableFooterProps = HTMLAttributes<HTMLTableSectionElement>

export function TableFooter({ className, ...props }: TableFooterProps) {
  return (
    <tfoot
      className={cn(
        "border-t border-default bg-neutral-subtle-default body-14-medium",
        className,
      )}
      {...props}
    />
  )
}

type TableRowProps = HTMLAttributes<HTMLTableRowElement>

export function TableRow({ className, ...props }: TableRowProps) {
  return (
    <tr
      className={cn(
        "border-b border-default transition-colors hover:bg-interaction-hovered",
        className,
      )}
      {...props}
    />
  )
}

type TableHeadProps = ThHTMLAttributes<HTMLTableCellElement>

export function TableHead({ className, ...props }: TableHeadProps) {
  return (
    <th
      className={cn(
        "h-10 px-3 text-left align-middle body-12-semibold text-subtle",
        className,
      )}
      {...props}
    />
  )
}

type TableCellProps = TdHTMLAttributes<HTMLTableCellElement>

export function TableCell({ className, ...props }: TableCellProps) {
  return (
    <td className={cn("p-3 align-middle text-default", className)} {...props} />
  )
}

type TableCaptionProps = HTMLAttributes<HTMLTableCaptionElement>

export function TableCaption({ className, ...props }: TableCaptionProps) {
  return (
    <caption
      className={cn("mt-4 body-12-regular text-subtlest", className)}
      {...props}
    />
  )
}
