"use client"

import { toast } from "sonner"

import { PageHeader } from "@/components/cms/page-header"

export function EditorHeader({
  title,
  description,
}: {
  title: string
  description: string
}) {
  return (
    <PageHeader
      eyebrow="Editor"
      title={title}
      description={description}
      actions
      onSave={() => toast.success("Draft saved")}
      onPublish={() => toast.success("Content published")}
      onPreview={() => toast.info("Preview opened")}
      onCancel={() => toast.message("Changes cancelled")}
    />
  )
}
