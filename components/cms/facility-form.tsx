"use client"

import Link from "next/link"
import { EyeIcon, FloppyDiskIcon, PaperPlaneTiltIcon, XIcon } from "@phosphor-icons/react"
import { toast } from "sonner"

import { StatusBadge } from "@/components/cms/status-badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import type { FacilityItem } from "@/lib/cms-data"
import { ImageUpload } from "@/components/cms/image-upload"
import { useRouter } from "next/navigation"
import { PageHeader } from "@/components/cms/page-header"

const blankFacility: FacilityItem = {
  id: "fac-new",
  title: "",
  tab: "",
  description: "",
  imageUrl: "",
  capacity: "",
  location: "",
  features: [],
  bookingAvailable: false,
  status: "Draft",
  createdBy: "",
  updatedAt: "2026-05-21",
}

export function FacilityForm({ facility, mode }: { facility?: FacilityItem; mode: "new" | "edit" }) {
  const data = facility ?? blankFacility
  const title = mode === "new" ? "Create facility" : `Edit facility: ${data.title}`
  const router = useRouter()

  return (
    <div className="flex flex-col gap-4">
      <PageHeader
        eyebrow="Facilities"
        title={title}
        description="Manage facility details, capacity, features list, image, and booking status on a dedicated page."
        actions={true}
        onPreview={() => toast.info("Preview opened")}
        onSave={() => toast.success("Draft saved")}
        onPublish={() => toast.success("Facility published")}
        onCancel={() => router.push("/facilities")}
      />
      <div className="grid gap-4 px-4 pb-6 xl:grid-cols-[1fr_360px] lg:px-6">
        <Card>
          <CardHeader>
            <CardTitle>Facility details</CardTitle>
            <CardDescription>Fields map to the FacilityItem model.</CardDescription>
          </CardHeader>
          <CardContent>
            <FieldGroup>
              <div className="grid gap-4 md:grid-cols-2">
                <Field>
                  <FieldLabel>Title</FieldLabel>
                  <Input defaultValue={data.title} placeholder="e.g. AI Experience Lab" />
                </Field>
                <Field>
                  <FieldLabel>Tab Name</FieldLabel>
                  <Input defaultValue={data.tab} placeholder="e.g. Space" />
                </Field>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <Field>
                  <FieldLabel>Capacity</FieldLabel>
                  <Input defaultValue={data.capacity} placeholder="e.g. 40 pax" />
                </Field>
                <Field>
                  <FieldLabel>Location</FieldLabel>
                  <Input defaultValue={data.location} placeholder="e.g. Jakarta Digital Valley, 7F" />
                </Field>
              </div>
              <Field>
                <FieldLabel>Description</FieldLabel>
                <Textarea defaultValue={data.description} placeholder="Short facility introduction" />
              </Field>
              <Field>
                <FieldLabel>Facility photo</FieldLabel>
                <ImageUpload defaultValue={data.imageUrl} onChange={(val) => { data.imageUrl = val }} aspectRatio="rectangle" />
              </Field>
              <Field>
                <FieldLabel>Features list (one per line)</FieldLabel>
                <Textarea defaultValue={data.features.join("\n")} placeholder="e.g. Demo wall&#10;Hybrid meeting" />
              </Field>
              <Field orientation="horizontal" className="border bg-muted/40 px-3 py-2.5">
                <FieldLabel>Booking availability</FieldLabel>
                <Switch defaultChecked={data.bookingAvailable} />
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
              <span>Capacity: {data.capacity || "Not set"}</span>
              <span>Location: {data.location || "Not set"}</span>
              <span>Booking: {data.bookingAvailable ? "Available" : "Closed"}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
