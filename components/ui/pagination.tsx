"use client"

import * as React from "react"
import {
  CaretDoubleLeftIcon,
  CaretDoubleRightIcon,
  CaretLeftIcon,
  CaretRightIcon,
  DotsThreeIcon,
} from "@phosphor-icons/react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

function Pagination({ className, ...props }: React.ComponentProps<"nav">) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      className={cn("mx-auto flex w-full justify-center", className)}
      {...props}
    />
  )
}
Pagination.displayName = "Pagination"

function PaginationContent({ className, ...props }: React.ComponentProps<"ul">) {
  return (
    <ul
      className={cn("flex flex-row items-center gap-1", className)}
      {...props}
    />
  )
}
PaginationContent.displayName = "PaginationContent"

function PaginationItem({ className, ...props }: React.ComponentProps<"li">) {
  return <li className={cn("", className)} {...props} />
}
PaginationItem.displayName = "PaginationItem"

type PaginationLinkProps = {
  isActive?: boolean
  disabled?: boolean
} & React.ComponentProps<typeof Button>

function PaginationLink({
  className,
  isActive,
  disabled,
  size = "icon-sm",
  variant,
  ...props
}: PaginationLinkProps) {
  return (
    <Button
      aria-current={isActive ? "page" : undefined}
      disabled={disabled}
      variant={variant || (isActive ? "outline" : "ghost")}
      size={size}
      className={cn(className)}
      {...props}
    />
  )
}
PaginationLink.displayName = "PaginationLink"

function PaginationPrevious({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      aria-label="Go to previous page"
      className={cn("gap-1 pl-2.5", className)}
      {...props}
    >
      <CaretLeftIcon className="size-4" />
      <span>Previous</span>
    </PaginationLink>
  )
}
PaginationPrevious.displayName = "PaginationPrevious"

function PaginationNext({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      aria-label="Go to next page"
      className={cn("gap-1 pr-2.5", className)}
      {...props}
    >
      <span>Next</span>
      <CaretRightIcon className="size-4" />
    </PaginationLink>
  )
}
PaginationNext.displayName = "PaginationNext"

function PaginationEllipsis({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      aria-hidden
      className={cn("flex size-7 items-center justify-center", className)}
      {...props}
    >
      <DotsThreeIcon className="size-4" />
      <span className="sr-only">More pages</span>
    </span>
  )
}
PaginationEllipsis.displayName = "PaginationEllipsis"

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
}
