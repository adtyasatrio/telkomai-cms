"use client"

import { toast } from "sonner"

import { StatusBadge } from "@/components/cms/status-badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import type { ProgramItem } from "@/lib/cms-data"
import { ImageUpload } from "@/components/cms/image-upload"
import { useRouter } from "next/navigation"
import { PageHeader } from "@/components/cms/page-header"

const blankProgram: ProgramItem = {
  id: "prg-new",
  title: "",
  description: "",
  icon: "SquaresFour",
  imageUrl: "",
  sortOrder: 1,
  visible: false,
  status: "Draft",
  createdBy: "",
  updatedAt: "2026-05-21",
}

export function ProgramForm({ program, mode }: { program?: ProgramItem; mode: "new" | "edit" }) {
  const data = program ?? blankProgram
  const title = mode === "new" ? "Create program" : `Edit program: ${data.title}`
  const router = useRouter()

  return (
    <div className="flex flex-col gap-4">
      <PageHeader
        eyebrow="Programs"
        title={title}
        description="Manage program details, icon choice, sorting weight, and visibility toggle on a dedicated page."
        actions={true}
        onPreview={() => toast.info("Preview opened")}
        onSave={() => toast.success("Draft saved")}
        onPublish={() => toast.success("Program published")}
        onCancel={() => router.push("/programs")}
      />
      <div className="grid gap-4 px-4 pb-6 xl:grid-cols-[1fr_360px] lg:px-6">
        <Card>
          <CardHeader>
            <CardTitle>Program details</CardTitle>
            <CardDescription>Fields map to the ProgramItem model.</CardDescription>
          </CardHeader>
          <CardContent>
            <FieldGroup>
              <Field>
                <FieldLabel>Title</FieldLabel>
                <Input defaultValue={data.title} placeholder="e.g. AI Talent Accelerator" />
              </Field>
              <div className="grid gap-4 md:grid-cols-2">
                <Field>
                  <FieldLabel>Icon name</FieldLabel>
                  <Input defaultValue={data.icon} placeholder="e.g. GraduationCap" />
                </Field>
                <Field>
                  <FieldLabel>Sort order</FieldLabel>
                  <Input type="number" defaultValue={data.sortOrder} />
                </Field>
              </div>
              <Field>
                <FieldLabel>Description</FieldLabel>
                <Textarea defaultValue={data.description} placeholder="Short program description" />
              </Field>
              <Field>
                <FieldLabel>Program photo</FieldLabel>
                <ImageUpload defaultValue={data.imageUrl} onChange={(val) => { data.imageUrl = val }} aspectRatio="rectangle" />
              </Field>
              <Field orientation="horizontal">
                <FieldLabel>Visibility</FieldLabel>
                <Switch defaultChecked={data.visible} />
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
              <span>Icon: {data.icon || "Not set"}</span>
              <span>Sort Order: {data.sortOrder}</span>
              <span>Visibility: {data.visible ? "Visible" : "Hidden"}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
