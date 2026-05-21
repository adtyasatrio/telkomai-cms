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
import type { EventItem } from "@/lib/cms-data"

const blankEvent: EventItem = {
  id: "evt-new",
  title: "",
  type: "Workshop",
  date: "",
  location: "",
  description: "",
  imageUrl: "",
  featured: false,
  published: false,
  status: "Draft",
  updatedAt: "2026-05-21",
}

export function EventForm({ event, mode }: { event?: EventItem; mode: "new" | "edit" }) {
  const data = event ?? blankEvent
  const title = mode === "new" ? "Create event" : `Edit event: ${data.title}`

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3 border-b bg-background px-4 py-4 lg:flex-row lg:items-center lg:justify-between lg:px-6">
        <div className="flex min-w-0 flex-col gap-1">
          <p className="text-xs font-medium uppercase tracking-normal text-primary">Events</p>
          <h1 className="truncate font-heading text-xl font-semibold">{title}</h1>
          <p className="max-w-3xl text-xs/relaxed text-muted-foreground">
            Manage event copy, schedule, feature placement, image, and publish state on a dedicated page.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" onClick={() => toast.info("Preview opened")}>
            <EyeIcon data-icon="inline-start" />
            Preview
          </Button>
          <Button variant="outline" onClick={() => toast.success("Draft saved")}>
            <FloppyDiskIcon data-icon="inline-start" />
            Save Draft
          </Button>
          <Button onClick={() => toast.success("Event published")}>
            <PaperPlaneTiltIcon data-icon="inline-start" />
            Publish
          </Button>
          <Button variant="ghost" render={<Link href="/events" />}>
            <XIcon data-icon="inline-start" />
            Cancel
          </Button>
        </div>
      </div>
      <div className="grid gap-4 px-4 pb-6 xl:grid-cols-[1fr_360px] lg:px-6">
        <Card>
          <CardHeader>
            <CardTitle>Event details</CardTitle>
            <CardDescription>Fields map to the EventItem model.</CardDescription>
          </CardHeader>
          <CardContent>
            <FieldGroup>
              <Field>
                <FieldLabel>Title</FieldLabel>
                <Input defaultValue={data.title} placeholder="Event title" />
              </Field>
              <div className="grid gap-4 md:grid-cols-3">
                <Field>
                  <FieldLabel>Type</FieldLabel>
                  <Select defaultValue={data.type}>
                    <SelectTrigger className="w-full"><SelectValue placeholder="Select type" /></SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {["Workshop", "Seminar", "Competition", "Showcase"].map((type) => (
                          <SelectItem key={type} value={type}>{type}</SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </Field>
                <Field>
                  <FieldLabel>Date</FieldLabel>
                  <Input type="date" defaultValue={data.date} />
                </Field>
                <Field>
                  <FieldLabel>Location</FieldLabel>
                  <Input defaultValue={data.location} placeholder="City or venue" />
                </Field>
              </div>
              <Field>
                <FieldLabel>Description</FieldLabel>
                <RichTextEditor
                  value={data.description}
                  placeholder="Write the event description..."
                />
              </Field>
              <Field>
                <FieldLabel>Image URL/upload</FieldLabel>
                <Input defaultValue={data.imageUrl} placeholder="https://..." />
              </Field>
              <div className="grid gap-4 md:grid-cols-2">
                <Field orientation="horizontal">
                  <FieldLabel>Featured toggle</FieldLabel>
                  <Switch defaultChecked={data.featured} />
                </Field>
                <Field orientation="horizontal">
                  <FieldLabel>Published status</FieldLabel>
                  <Switch defaultChecked={data.published} />
                </Field>
              </div>
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
              <span>Type: {data.type}</span>
              <span>Date: {data.date || "Not scheduled"}</span>
              <span>Location: {data.location || "Not set"}</span>
              <span>Featured: {data.featured ? "Yes" : "No"}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
