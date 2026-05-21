"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { EyeIcon, FloppyDiskIcon, PaperPlaneTiltIcon, XIcon } from "@phosphor-icons/react"

import { Button } from "@/components/ui/button"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

type PageHeaderProps = {
  eyebrow: string
  title: string
  description: string
  actions?: boolean
  onSave?: () => void
  onPublish?: () => void
  onPreview?: () => void
  onCancel?: () => void
}

export function PageHeader({
  eyebrow,
  title,
  description,
  actions,
  onSave,
  onPublish,
  onPreview,
  onCancel,
}: PageHeaderProps) {
  const pathname = usePathname()

  const segments = React.useMemo(() => {
    return pathname ? pathname.split("/").filter(Boolean) : []
  }, [pathname])

  const showBreadcrumbs = segments.length > 0

  const breadcrumbs = React.useMemo(() => {
    const list = [{ label: "Dashboard", href: "/" }]
    let currentPath = ""

    for (let i = 0; i < segments.length; i++) {
      const segment = segments[i]
      currentPath += `/${segment}`

      // Skip dynamic ID segments to make breadcrumbs look clean (e.g. Events > Edit Event)
      if (
        (segment.startsWith("evt-") ||
          segment.startsWith("fac-") ||
          segment.startsWith("prg-") ||
          segment.startsWith("med-") ||
          /^[a-zA-Z0-9]{5,}$/.test(segment)) &&
        segments[i + 1] === "edit"
      ) {
        continue
      }

      let label = segment
      if (segment === "content") {
        label = "Landing Content"
      } else if (segment === "programs") {
        label = "Programs"
      } else if (segment === "facilities") {
        label = "Facilities"
      } else if (segment === "events") {
        label = "Events"
      } else if (segment === "media") {
        label = "Media"
      } else if (segment === "footer") {
        label = "Footer"
      } else if (segment === "new") {
        label = "Create"
      } else if (segment === "edit") {
        const parent = segments[i - 2] || segments[i - 1]
        if (parent === "events") label = "Edit Event"
        else if (parent === "facilities") label = "Edit Facility"
        else if (parent === "programs") label = "Edit Program"
        else if (parent === "media") label = "Edit Media"
        else label = "Edit"
      } else if (segment === "hero") {
        label = "Hero Content"
      } else {
        label = segment.charAt(0).toUpperCase() + segment.slice(1)
      }

      list.push({
        label,
        href: currentPath,
      })
    }

    return list
  }, [segments])

  return (
    <div className="flex flex-col gap-3 border-b bg-background px-4 py-4 lg:flex-row lg:items-center lg:justify-between lg:px-6">
      <div className="flex min-w-0 flex-col gap-1">
        {showBreadcrumbs && (
          <Breadcrumb className="mb-1">
            <BreadcrumbList>
              {breadcrumbs.map((item, index) => {
                const isLast = index === breadcrumbs.length - 1
                return (
                  <React.Fragment key={item.href}>
                    <BreadcrumbItem>
                      {isLast ? (
                        <BreadcrumbPage>{item.label}</BreadcrumbPage>
                      ) : (
                        <BreadcrumbLink asChild>
                          <Link href={item.href}>{item.label}</Link>
                        </BreadcrumbLink>
                      )}
                    </BreadcrumbItem>
                    {!isLast && <BreadcrumbSeparator />}
                  </React.Fragment>
                )
              })}
            </BreadcrumbList>
          </Breadcrumb>
        )}
        <h1 className="truncate font-heading text-xl font-semibold">{title}</h1>
        <p className="max-w-3xl text-xs/relaxed text-muted-foreground">{description}</p>
      </div>
      {actions ? (
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" onClick={onPreview}>
            <EyeIcon data-icon="inline-start" />
            Preview
          </Button>
          <Button variant="outline" onClick={onSave}>
            <FloppyDiskIcon data-icon="inline-start" />
            Save Draft
          </Button>
          <Button onClick={onPublish}>
            <PaperPlaneTiltIcon data-icon="inline-start" />
            Publish
          </Button>
          <Button variant="ghost" onClick={onCancel}>
            <XIcon data-icon="inline-start" />
            Cancel
          </Button>
        </div>
      ) : null}
    </div>
  )
}

