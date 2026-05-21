"use client"

import Link from "next/link"
import { useEffect, useMemo, useState } from "react"
import {
  CopyIcon,
  DotsThreeIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
  PencilSimpleIcon,
  PlusIcon,
  TrashIcon,
  CaretDoubleLeftIcon,
  CaretDoubleRightIcon,
  CaretLeftIcon,
  CaretRightIcon,
} from "@phosphor-icons/react"
import { toast } from "sonner"

import { StatusBadge } from "@/components/cms/status-badge"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyTitle } from "@/components/ui/empty"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

type EditableRecord = Record<string, string | number | boolean | string[]>

type Column<T> = {
  key: keyof T
  label: string
  type?: "status" | "boolean" | "list"
}

export function EntityTable<T extends EditableRecord>({
  title,
  description,
  items,
  columns,
  filters,
  searchKeys,
  emptyTitle,
  addLabel,
  addHref,
  editHrefBase,
  isLoading = false,
}: {
  title: string
  description: string
  items: T[]
  columns: Column<T>[]
  filters: { key: keyof T; label: string; values: string[] }[]
  searchKeys: (keyof T)[]
  emptyTitle: string
  addLabel: string
  addHref: string
  editHrefBase: string
  isLoading?: boolean
}) {
  const [rows, setRows] = useState(items)
  const [query, setQuery] = useState("")
  const [filter, setFilter] = useState("all")
  const [preview, setPreview] = useState<T | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<T | null>(null)

  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(5)

  // Reset pagination on search query or filter changes
  useEffect(() => {
    setCurrentPage(1)
  }, [query, filter])

  const filtered = useMemo(() => {
    return rows.filter((row) => {
      const matchesQuery = searchKeys.some((key) =>
        String(row[key]).toLowerCase().includes(query.toLowerCase())
      )
      const matchesFilter =
        filter === "all" ||
        filters.some((item) => String(row[item.key]) === filter)

      return matchesQuery && matchesFilter
    })
  }, [filter, filters, query, rows, searchKeys])

  const totalItems = filtered.length
  const totalPages = Math.ceil(totalItems / pageSize) || 1
  const activePage = Math.min(currentPage, totalPages)
  const startIndex = (activePage - 1) * pageSize
  const endIndex = Math.min(startIndex + pageSize, totalItems)

  const paginatedItems = useMemo(() => {
    return filtered.slice(startIndex, startIndex + pageSize)
  }, [filtered, startIndex, pageSize])

  // Handle out of bounds currentPage
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages)
    }
  }, [currentPage, totalPages])

  const getPageNumbers = () => {
    const pages: (number | "ellipsis")[] = []
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i)
    } else {
      pages.push(1)
      if (activePage > 3) {
        pages.push("ellipsis")
      }
      const start = Math.max(2, activePage - 1)
      const end = Math.min(totalPages - 1, activePage + 1)
      for (let i = start; i <= end; i++) {
        if (!pages.includes(i)) pages.push(i)
      }
      if (activePage < totalPages - 2) {
        pages.push("ellipsis")
      }
      if (!pages.includes(totalPages)) {
        pages.push(totalPages)
      }
    }
    return pages
  }

  const duplicateRow = (row: T) => {
    const copy = { ...row, id: `${row.id}-copy`, title: `${row.title} Copy` } as T
    setRows((current) => [copy, ...current])
    toast.success("Item duplicated")
  }

  const deleteRow = (row: T) => {
    setRows((current) => current.filter((item) => item.id !== row.id))
    toast.success("Item deleted")
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-1 flex-col gap-2 sm:flex-row">
            <div className="relative flex-1">
              <MagnifyingGlassIcon className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input
                className="pl-8"
                placeholder={`Search ${title.toLowerCase()}...`}
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
            </div>
            <Select value={filter} onValueChange={(value) => setFilter(value ?? "all")}>
              <SelectTrigger className="w-full sm:w-44">
                <FunnelIcon data-icon="inline-start" />
                <SelectValue placeholder="Filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="all">All records</SelectItem>
                  {filters.flatMap((item) =>
                    item.values.map((value) => (
                      <SelectItem key={`${String(item.key)}-${value}`} value={value}>
                        {value}
                      </SelectItem>
                    ))
                  )}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <Button render={<Link href={addHref} />}>
            <PlusIcon data-icon="inline-start" />
            {addLabel}
          </Button>
        </div>
        {isLoading ? (
          <div className="flex flex-col gap-3">
            <div className="grid gap-2 sm:grid-cols-3">
              <Skeleton className="h-8" />
              <Skeleton className="h-8" />
              <Skeleton className="h-8" />
            </div>
            <Skeleton className="h-44" />
          </div>
        ) : filtered.length ? (
          <Table>
            <TableHeader>
              <TableRow>
                {columns.map((column) => (
                  <TableHead key={String(column.key)}>{column.label}</TableHead>
                ))}
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedItems.map((row) => (
                <TableRow key={String(row.id)}>
                  {columns.map((column) => (
                    <TableCell key={String(column.key)}>
                      <CellValue value={row[column.key]} type={column.type} />
                    </TableCell>
                  ))}
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger render={<Button variant="ghost" size="icon-sm" />}>
                        <DotsThreeIcon />
                        <span className="sr-only">Open actions</span>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuGroup>
                          <DropdownMenuItem render={<Link href={`${editHrefBase}/${row.id}/edit`} />}>
                            <PencilSimpleIcon />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setPreview(row)}>
                            <MagnifyingGlassIcon />
                            Preview
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => duplicateRow(row)}>
                            <CopyIcon />
                            Duplicate
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            variant="destructive"
                            onClick={() => setDeleteTarget(row)}
                          >
                            <TrashIcon />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <Empty>
            <EmptyHeader>
              <EmptyTitle>{emptyTitle}</EmptyTitle>
              <EmptyDescription>Adjust search filters or create a new entry.</EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <Button render={<Link href={addHref} />}>{addLabel}</Button>
            </EmptyContent>
          </Empty>
        )}
      </CardContent>
      {totalItems > 0 && (
        <CardFooter className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-t border-border/50">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4 text-muted-foreground">
            <span className="text-xs">
              Showing <span className="font-semibold text-foreground">{totalItems === 0 ? 0 : startIndex + 1}</span> to{" "}
              <span className="font-semibold text-foreground">{endIndex}</span> of{" "}
              <span className="font-semibold text-foreground">{totalItems}</span> entries
            </span>
            <div className="flex items-center gap-2">
              <span className="text-xs whitespace-nowrap">Rows per page:</span>
              <Select
                value={String(pageSize)}
                onValueChange={(val) => {
                  setPageSize(Number(val))
                  setCurrentPage(1)
                }}
              >
                <SelectTrigger className="h-7 w-[70px] text-xs">
                  <SelectValue placeholder={String(pageSize)} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="5">5</SelectItem>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="20">20</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Pagination className="mx-0 w-auto justify-end">
            <PaginationContent>
              <PaginationItem>
                <PaginationLink
                  aria-label="Go to first page"
                  onClick={() => setCurrentPage(1)}
                  disabled={activePage === 1}
                  variant="ghost"
                  size="icon-sm"
                >
                  <CaretDoubleLeftIcon className="size-3.5" />
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink
                  aria-label="Go to previous page"
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={activePage === 1}
                  variant="ghost"
                  size="icon-sm"
                >
                  <CaretLeftIcon className="size-3.5" />
                </PaginationLink>
              </PaginationItem>

              {getPageNumbers().map((page, index) => {
                if (page === "ellipsis") {
                  return (
                    <PaginationItem key={`ellipsis-${index}`}>
                      <PaginationEllipsis />
                    </PaginationItem>
                  )
                }
                return (
                  <PaginationItem key={page}>
                    <PaginationLink
                      isActive={page === activePage}
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                )
              })}

              <PaginationItem>
                <PaginationLink
                  aria-label="Go to next page"
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={activePage === totalPages}
                  variant="ghost"
                  size="icon-sm"
                >
                  <CaretRightIcon className="size-3.5" />
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink
                  aria-label="Go to last page"
                  onClick={() => setCurrentPage(totalPages)}
                  disabled={activePage === totalPages}
                  variant="ghost"
                  size="icon-sm"
                >
                  <CaretDoubleRightIcon className="size-3.5" />
                </PaginationLink>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </CardFooter>
      )}
      <Dialog open={!!preview} onOpenChange={(open) => !open && setPreview(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{preview?.title ?? "Preview"}</DialogTitle>
            <DialogDescription>{preview?.description ?? "Local preview for this CMS item."}</DialogDescription>
          </DialogHeader>
          <pre className="max-h-72 overflow-auto bg-muted p-3 text-xs">{JSON.stringify(preview, null, 2)}</pre>
        </DialogContent>
      </Dialog>
      <AlertDialog open={!!deleteTarget} onOpenChange={(open) => !open && setDeleteTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this item?</AlertDialogTitle>
            <AlertDialogDescription>
              This will remove {deleteTarget ? `"${String(deleteTarget.title)}"` : "this item"} from the local CMS table.
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (deleteTarget) {
                  deleteRow(deleteTarget)
                }
                setDeleteTarget(null)
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  )
}

function CellValue({ value, type }: { value: unknown; type?: Column<EditableRecord>["type"] }) {
  if (type === "status") {
    return <StatusBadge status={String(value)} />
  }

  if (type === "boolean") {
    return <StatusBadge status={value ? "Enabled" : "Disabled"} />
  }

  if (type === "list" && Array.isArray(value)) {
    return <span className="text-muted-foreground">{value.join(", ")}</span>
  }

  return <span>{String(value)}</span>
}
