"use client"

import { useState } from "react"
import Link from "next/link"
import { EyeIcon, FloppyDiskIcon, PaperPlaneTiltIcon, XIcon } from "@phosphor-icons/react"
import { toast } from "sonner"

import { RichTextEditor } from "@/components/cms/rich-text-editor"
import { StatusBadge } from "@/components/cms/status-badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Field, FieldGroup, FieldLabel, FieldDescription } from "@/components/ui/field"
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
  const [category, setCategory] = useState<MediaItem["category"]>(data.category)
  const [urlValue, setUrlValue] = useState<string>(data.url)

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
            <CardDescription>Fields dynamically adapt based on the selected category.</CardDescription>
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
                  <Select value={category} onValueChange={(val) => setCategory(val as MediaItem["category"])}>
                    <SelectTrigger className="w-full"><SelectValue placeholder="Select category" /></SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {["News", "Article", "Video", "Press"].map((cat) => (
                          <SelectItem key={cat} value={cat}>{cat}</SelectItem>
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
                <FieldLabel>
                  {category === "Video" ? "Video Thumbnail" : "Media Banner / Thumbnail"}
                </FieldLabel>
                <ImageUpload defaultValue={data.thumbnailUrl} onChange={(val) => { data.thumbnailUrl = val }} aspectRatio="rectangle" />
              </Field>

              {/* Dynamic Content Body (Only shown for Article and Press) */}
              {(category === "Article" || category === "Press") && (
                <Field className="animate-fade-in">
                  <FieldLabel>
                    {category === "Article" ? "Article Body" : "Press Release Content"}
                  </FieldLabel>
                  <RichTextEditor
                    value={data.body}
                    placeholder={
                      category === "Article" 
                        ? "Write the full article content here..." 
                        : "Write the press release content here..."
                    }
                  />
                </Field>
              )}

              {/* Dynamic URLs based on Category */}
              {category === "News" && (
                <Field className="animate-fade-in">
                  <FieldLabel>News Source URL</FieldLabel>
                  <Input 
                    value={urlValue} 
                    onChange={(e) => setUrlValue(e.target.value)} 
                    placeholder="https://news-source.com/article" 
                  />
                </Field>
              )}

              {category === "Video" && (
                <Field className="animate-fade-in">
                  <FieldLabel>Video Link (YouTube, Vimeo, etc.)</FieldLabel>
                  <Input 
                    value={urlValue} 
                    onChange={(e) => setUrlValue(e.target.value)} 
                    placeholder="https://www.youtube.com/watch?v=..." 
                  />
                </Field>
              )}

              {category === "Press" && (
                <Field className="animate-fade-in">
                  <FieldLabel>Official PDF / Document Link (Optional)</FieldLabel>
                  <Input 
                    value={urlValue} 
                    onChange={(e) => setUrlValue(e.target.value)} 
                    placeholder="https://telkom.co.id/press-release.pdf" 
                  />
                </Field>
              )}

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
              <span>Category: {category}</span>
              <span>Meta/date: {data.metaDate || "Not set"}</span>
              {category !== "Article" && (
                <span>
                  {category === "Video" && "Video URL: "}
                  {category === "News" && "Source URL: "}
                  {category === "Press" && "Document URL: "}
                  {urlValue || "Not set"}
                </span>
              )}
              <span>Published: {data.published ? "Yes" : "No"}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
