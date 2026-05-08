"use client"

import {
  ArrowDownIcon,
  ArrowsDownUpIcon,
  ArrowUpIcon,
  SpinnerGapIcon,
} from "@phosphor-icons/react"
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
} from "@tanstack/react-table"
import { useState } from "react"

import { cn } from "../utils/cn"
import { Button } from "./button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table"

type DataTableProps<TData> = {
  columns: ColumnDef<TData, unknown>[]
  data: TData[]
  pageSize?: number
  loading?: boolean
}

export function DataTable<TData>({
  columns,
  data,
  pageSize = 5,
  loading,
}: DataTableProps<TData>) {
  const [sorting, setSorting] = useState<SortingState>([])

  const table = useReactTable({
    data,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: { pageSize },
    },
  })

  return (
    <div className="flex flex-col gap-4">
      <div className="relative">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="hover:bg-transparent">
                {headerGroup.headers.map((header) => {
                  const align = header.column.columnDef.meta?.align
                  return (
                    <TableHead
                      key={header.id}
                      className={cn(align === "right" && "text-right")}
                    >
                      {header.isPlaceholder ? null : header.column.getCanSort() ? (
                        <button
                          type="button"
                          className={cn(
                            "inline-flex cursor-pointer items-center gap-1 select-none",
                            header.column.getIsSorted() && "text-default",
                            align === "right" && "ml-auto",
                          )}
                          onClick={header.column.getToggleSortingHandler()}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                          <SortIcon direction={header.column.getIsSorted()} />
                        </button>
                      ) : (
                        flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )
                      )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => {
                    const align = cell.column.columnDef.meta?.align
                    return (
                      <TableCell
                        key={cell.id}
                        className={cn(align === "right" && "text-right")}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    )
                  })}
                </TableRow>
              ))
            ) : (
              <TableRow className="hover:bg-transparent">
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center text-subtle"
                >
                  결과가 없습니다.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-elevation-surface-default/60">
            <SpinnerGapIcon
              size={24}
              className="animate-spin text-subtle"
              aria-label="로딩 중"
            />
          </div>
        )}
      </div>

      {table.getPageCount() > 1 && (
        <div className="flex items-center justify-between">
          <p className="body-12-regular text-subtle">
            {table.getState().pagination.pageIndex + 1} / {table.getPageCount()}{" "}
            페이지
          </p>
          <div className="flex items-center gap-2">
            <Button
              appearance="ghost"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              이전
            </Button>
            <Button
              appearance="ghost"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              다음
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

function SortIcon({ direction }: { direction: false | "asc" | "desc" }) {
  if (direction === "asc") {
    return <ArrowUpIcon size={14} weight="bold" />
  }
  if (direction === "desc") {
    return <ArrowDownIcon size={14} weight="bold" />
  }
  return <ArrowsDownUpIcon size={14} className="text-subtle" />
}
