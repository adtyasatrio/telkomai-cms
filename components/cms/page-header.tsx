"use client"

import { EyeIcon, FloppyDiskIcon, PaperPlaneTiltIcon, XIcon } from "@phosphor-icons/react"

import { Button } from "@/components/ui/button"

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
  return (
    <div className="flex flex-col gap-3 border-b bg-background px-4 py-4 lg:flex-row lg:items-center lg:justify-between lg:px-6">
      <div className="flex min-w-0 flex-col gap-1">
        <p className="text-xs font-medium uppercase tracking-normal text-primary">{eyebrow}</p>
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
