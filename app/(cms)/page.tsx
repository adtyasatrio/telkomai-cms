"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import {
  CalendarDotsIcon,
  CaretRightIcon,
  ImageSquareIcon,
  MapPinAreaIcon,
  NewspaperClippingIcon,
  CaretDoubleLeftIcon,
  CaretDoubleRightIcon,
  CaretLeftIcon,
} from "@phosphor-icons/react"

import { PageHeader } from "@/components/cms/page-header"
import { StatusBadge } from "@/components/cms/status-badge"
import { Button } from "@/components/ui/button"
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { activity, events, facilities, landingSections, media, programs } from "@/lib/cms-data"

const metrics = [
  { label: "Events", value: events.length, icon: CalendarDotsIcon },
  { label: "Media posts", value: media.length, icon: NewspaperClippingIcon },
  { label: "Facilities", value: facilities.length, icon: MapPinAreaIcon },
  { label: "Programs", value: programs.length, icon: ImageSquareIcon },
]

const quickActions = [
  ["Edit Hero", "/content/hero"],
  ["Programs", "/programs"],
  ["Facilities", "/facilities"],
  ["Events", "/events"],
  ["Media", "/media"],
  ["Footer", "/footer"],
]

export default function DashboardPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(3)

  const totalItems = activity.length
  const totalPages = Math.ceil(totalItems / pageSize) || 1
  const activePage = Math.min(currentPage, totalPages)
  const startIndex = (activePage - 1) * pageSize
  const endIndex = Math.min(startIndex + pageSize, totalItems)

  const paginatedActivity = useMemo(() => {
    return activity.slice(startIndex, startIndex + pageSize)
  }, [startIndex, pageSize])

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

  return (
    <div className="flex flex-col gap-4">
      <PageHeader
        eyebrow="Dashboard"
        title="CMS operations overview"
        description="Monitor landing page content health, recent changes, and priority editing areas."
      />
      <div className="grid gap-4 px-4 lg:grid-cols-4 lg:px-6">
        {metrics.map((metric) => {
          const Icon = metric.icon

          return (
            <Card key={metric.label} size="sm">
              <CardHeader>
                <CardTitle>{metric.label}</CardTitle>
                <CardAction>
                  <Icon className="size-5 text-muted-foreground" weight="duotone" />
                </CardAction>
                <CardDescription>Landing page inventory</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-semibold">{metric.value}</div>
              </CardContent>
            </Card>
          )
        })}
      </div>
      <div className="grid gap-4 px-4 pb-6 lg:grid-cols-[1fr_320px] lg:px-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent updates</CardTitle>
            <CardDescription>Latest activity from content editors.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Item</TableHead>
                  <TableHead>Area</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedActivity.map((row) => (
                  <TableRow key={`${row.item}-${row.date}`}>
                    <TableCell className="font-medium">{row.item}</TableCell>
                    <TableCell>{row.area}</TableCell>
                    <TableCell><StatusBadge status={row.action} /></TableCell>
                    <TableCell>{row.user}</TableCell>
                    <TableCell>{row.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
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
                        <SelectItem value="3">3</SelectItem>
                        <SelectItem value="5">5</SelectItem>
                        <SelectItem value="10">10</SelectItem>
                        <SelectItem value="20">20</SelectItem>
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
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Quick actions</CardTitle>
            <CardDescription>Jump into high-use editors.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-2">
            {quickActions.map(([label, href]) => (
              <Button
                key={href}
                variant="outline"
                render={<Link href={href} />}
                className="justify-between w-full"
              >
                <span>{label}</span>
                <CaretRightIcon data-icon="inline-end" />
              </Button>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
