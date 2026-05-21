"use client"

import Link from "next/link"
import { EyeIcon, FloppyDiskIcon, PaperPlaneTiltIcon, XIcon } from "@phosphor-icons/react"
import { toast } from "sonner"

import { RichTextEditor } from "@/components/cms/rich-text-editor"
import { StatusBadge } from "@/components/cms/status-badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import type { MediaItem } from "@/lib/cms-data"
import { ImageUpload } from "@/components/cms/image-upload"
import { useRouter } from "next/navigation"
import { PageHeader } from "@/components/cms/page-header"

const blankMedia: MediaItem = {
  id: "med-new",
  title: "",
  category: "News",
  metaDate: "",
  description: "",
  thumbnailUrl: "",
  body: "",
  url: "",
  published: false,
  status: "Draft",
  updatedAt: "2026-05-21",
}

export function MediaForm({ item, mode }: { item?: MediaItem; mode: "new" | "edit" }) {
  const data = item ?? blankMedia
  const title = mode === "new" ? "Create media item" : `Edit media: ${data.title}`
  const router = useRouter()

  return (
    <div className="flex flex-col gap-4">
      <PageHeader
        eyebrow="Media library"
        title={title}
        description="Manage media metadata, thumbnail, article body, external link, and publish state on a dedicated page."
        actions={true}
        onPreview={() => toast.info("Preview opened")}
        onSave={() => toast.success("Draft saved")}
        onPublish={() => toast.success("Media item published")}
        onCancel={() => router.push("/media")}
      />
      <div className="grid gap-4 px-4 pb-6 xl:grid-cols-[1fr_360px] lg:px-6">
        <Card>
          <CardHeader>
            <CardTitle>Media details</CardTitle>
            <CardDescription>Fields map to the MediaItem model.</CardDescription>
          </CardHeader>
          <CardContent>
            <FieldGroup>
              <Field>
                <FieldLabel>Title</FieldLabel>
                <Input defaultValue={data.title} placeholder="Media title" />
              </Field>
              <div className="grid gap-4 md:grid-cols-2">
                <Field>
                  <FieldLabel>Category</FieldLabel>
                  <Select defaultValue={data.category}>
                    <SelectTrigger className="w-full"><SelectValue placeholder="Select category" /></SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {["News", "Article", "Video", "Press"].map((category) => (
                          <SelectItem key={category} value={category}>{category}</SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </Field>
                <Field>
                  <FieldLabel>Meta/date</FieldLabel>
                  <Input type="date" defaultValue={data.metaDate} />
                </Field>
              </div>
              <Field>
                <FieldLabel>Description</FieldLabel>
                <Textarea defaultValue={data.description} placeholder="Short media summary" />
              </Field>
              <Field>
                <FieldLabel>Media photo / Thumbnail</FieldLabel>
                <ImageUpload defaultValue={data.thumbnailUrl} onChange={(val) => { data.thumbnailUrl = val }} aspectRatio="rectangle" />
              </Field>
              <Field>
                <FieldLabel>Content body</FieldLabel>
                <RichTextEditor
                  value={data.body}
                  placeholder="Write the media article body..."
                />
              </Field>
              <Field>
                <FieldLabel>External URL or detail URL</FieldLabel>
                <Input defaultValue={data.url} placeholder="https://..." />
              </Field>
              <Field orientation="horizontal">
                <FieldLabel>Published status</FieldLabel>
                <Switch defaultChecked={data.published} />
              </Field>
            </FieldGroup>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Publishing summary</CardTitle>
            <CardDescription>Quick review before publishing.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <StatusBadge status={data.status} />
            <div className="flex flex-col gap-1">
              <span className="text-xs text-muted-foreground">Record ID</span>
              <span className="font-mono text-xs">{data.id}</span>
            </div>
            <Separator />
            <div className="grid gap-2 text-xs">
              <span>Category: {data.category}</span>
              <span>Meta/date: {data.metaDate || "Not set"}</span>
              <span>URL: {data.url || "Not set"}</span>
              <span>Published: {data.published ? "Yes" : "No"}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
