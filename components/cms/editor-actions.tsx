"use client"

import { toast } from "sonner"

import { PageHeader } from "@/components/cms/page-header"

export function EditorHeader({
  title,
  description,
  eyebrow = "Editor",
  actions = true,
}: {
  title: string
  description: string
  eyebrow?: string
  actions?: boolean
}) {
  return (
    <PageHeader
      eyebrow={eyebrow}
      title={title}
      description={description}
      actions={actions}
      onSave={() => toast.success("Draft saved")}
      onPublish={() => toast.success("Content published")}
      onPreview={() => toast.info("Preview opened")}
      onCancel={() => toast.message("Changes cancelled")}
    />
  )
}
