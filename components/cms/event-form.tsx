"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

import { DatePicker } from "@/components/cms/date-picker"
import { EventBannerPreview } from "@/components/cms/event-banner-preview"
import { ImageUpload } from "@/components/cms/image-upload"
import { PageHeader } from "@/components/cms/page-header"
import { RichTextEditor } from "@/components/cms/rich-text-editor"
import { StatusBadge } from "@/components/cms/status-badge"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import type { EventItem } from "@/lib/cms-data"
import { events } from "@/lib/cms-data"

const blankEvent: EventItem = {
  id: "evt-new",
  title: "",
  type: "Workshop",
  date: "",
  location: "",
  description: "",
  imageUrl: "",
  featured: false,
  showBannerPopup: false,
  bannerPopupId: "",
  bannerCtaLabel: "Detail",
  bannerCtaUrl: "/events/detail",
  bannerStartAt: "",
  bannerEndAt: "",
  bannerStatus: "Draft",
  status: "Draft",
  createdBy: "",
  updatedAt: "2026-05-21",
}

function buildInitialEvent(event?: EventItem): EventItem {
  const data = event ?? blankEvent

  return {
    ...blankEvent,
    ...data,
    showBannerPopup: data.showBannerPopup ?? false,
    bannerPopupId: data.bannerPopupId ?? "",
    bannerCtaLabel: data.bannerCtaLabel ?? "Detail",
    bannerCtaUrl: data.bannerCtaUrl ?? "/events/detail",
    bannerStartAt: data.bannerStartAt ?? "",
    bannerEndAt: data.bannerEndAt ?? "",
    bannerStatus: data.bannerStatus ?? data.status ?? "Draft",
  }
}

function syncMockEvent(next: EventItem) {
  const index = events.findIndex((item) => item.id === next.id)
  if (index >= 0) {
    events[index] = { ...events[index], ...next }
    return
  }

  const generatedId = next.id === "evt-new" ? `evt-${Date.now()}` : next.id
  events.unshift({ ...next, id: generatedId })
}

function disableOtherPopupBanners(currentId: string) {
  events.forEach((item) => {
    if (item.id !== currentId && item.showBannerPopup) {
      item.showBannerPopup = false
      item.bannerStatus = "Hidden"
    }
  })
}

export function EventForm({ event, mode }: { event?: EventItem; mode: "new" | "edit" }) {
  const router = useRouter()
  const [form, setForm] = useState(() => buildInitialEvent(event))
  const [replaceDialogOpen, setReplaceDialogOpen] = useState(false)

  const title = mode === "new" ? "Create event" : `Edit event: ${form.title}`
  const activeOtherBanner = events.find(
    (item) => item.id !== form.id && item.showBannerPopup
  )

  const updateForm = <K extends keyof EventItem>(key: K, value: EventItem[K]) => {
    setForm((current) => ({ ...current, [key]: value }))
  }

  const validateBanner = () => {
    const bannerPopupId = (form.bannerPopupId ?? "").trim()
    const bannerCtaUrl = (form.bannerCtaUrl ?? "").trim()

    if (form.showBannerPopup) {
      if (activeOtherBanner) {
        toast.error("Only one popup banner can be active at a time.")
        return false
      }

      if (!bannerPopupId) {
        toast.error("Banner popup ID is required.")
        return false
      }

      if (!bannerCtaUrl) {
        toast.error("Banner CTA URL is required.")
        return false
      }

      const duplicate = events.some(
        (item) => item.id !== form.id && item.bannerPopupId?.trim() === bannerPopupId
      )

      if (duplicate) {
        toast.error("Banner popup ID must be unique.")
        return false
      }
    }

    if (form.bannerStartAt && form.bannerEndAt && form.bannerStartAt > form.bannerEndAt) {
      toast.error("Banner start date must be before banner end date.")
      return false
    }

    return true
  }

  const handleSaveDraft = () => {
    if (!validateBanner()) return
    syncMockEvent(form)
    toast.success("Draft saved")
  }

  const handlePublish = () => {
    if (!validateBanner()) return
    const next = { ...form, status: "Published" as const }
    syncMockEvent(next)
    setForm(next)
    toast.success("Event published")
  }

  const activatePopupBanner = () => {
    disableOtherPopupBanners(form.id)
    const next = {
      ...form,
      showBannerPopup: true,
      bannerStatus: form.bannerStatus ?? form.status,
    }
    syncMockEvent(next)
    setForm(next)
    setReplaceDialogOpen(false)
    toast.success("Popup banner enabled")
  }

  const handlePopupBannerToggle = (checked: boolean) => {
    if (!checked) {
      const next = { ...form, showBannerPopup: false }
      syncMockEvent(next)
      setForm(next)
      return
    }

    if (activeOtherBanner) {
      setReplaceDialogOpen(true)
      return
    }

    activatePopupBanner()
  }

  const previewTitle = form.title || "Event title"
  const previewDescription = form.description || "Event description"
  const previewThumbnail = form.imageUrl
  const previewBannerStatus = form.bannerStatus ?? form.status

  return (
    <div className="flex flex-col gap-4">
      <PageHeader
        eyebrow="Events"
        title={title}
        description="Manage event copy, schedule, feature placement, image, and the landing page popup banner."
        actions
        onPreview={() => toast.info("Preview opened")}
        onSave={handleSaveDraft}
        onPublish={handlePublish}
        onCancel={() => router.push("/events")}
      />
      <div className="grid gap-4 px-4 pb-6 xl:grid-cols-[minmax(0,1fr)_420px] lg:px-6">
        <div className="flex flex-col gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Event details</CardTitle>
              <CardDescription>Fields map to the EventItem model.</CardDescription>
            </CardHeader>
            <CardContent>
              <FieldGroup>
                <Field>
                  <FieldLabel>Title</FieldLabel>
                  <Input
                    value={form.title}
                    onChange={(event) => updateForm("title", event.target.value)}
                    placeholder="Event title"
                  />
                </Field>
                <div className="grid gap-4 md:grid-cols-3">
                  <Field>
                    <FieldLabel>Type</FieldLabel>
                    <Select
                      value={form.type}
                      onValueChange={(value) =>
                        updateForm("type", value as EventItem["type"])
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {["Workshop", "Seminar", "Competition", "Showcase"].map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </Field>
                  <Field>
                    <FieldLabel>Date</FieldLabel>
                    <DatePicker
                      value={form.date}
                      onChange={(value) => updateForm("date", value)}
                      placeholder="Pick event date"
                    />
                  </Field>
                  <Field>
                    <FieldLabel>Location</FieldLabel>
                    <Input
                      value={form.location}
                      onChange={(event) => updateForm("location", event.target.value)}
                      placeholder="City or venue"
                    />
                  </Field>
                </div>
                <Field>
                  <FieldLabel>Description</FieldLabel>
                  <RichTextEditor
                    value={form.description}
                    placeholder="Write the event description..."
                    onChange={(value) => updateForm("description", value)}
                  />
                </Field>
                <Field>
                  <FieldLabel>Event photo</FieldLabel>
                  <ImageUpload
                    value={form.imageUrl}
                    onChange={(value) => updateForm("imageUrl", value)}
                    aspectRatio="rectangle"
                  />
                </Field>
                <div className="grid gap-4 md:grid-cols-2">
                  <Field orientation="horizontal" className="border bg-muted/40 px-3 py-2.5">
                    <FieldLabel>Featured toggle</FieldLabel>
                    <Switch
                      checked={form.featured}
                      onCheckedChange={(checked) => updateForm("featured", checked)}
                    />
                  </Field>
                  <Field orientation="horizontal" className="border bg-muted/40 px-3 py-2.5">
                    <FieldLabel>Published status</FieldLabel>
                    <Switch
                      checked={form.status === "Published"}
                      onCheckedChange={(checked) =>
                        updateForm("status", checked ? "Published" : "Draft")
                      }
                    />
                  </Field>
                  <Field orientation="horizontal" className="border bg-muted/40 px-3 py-2.5 md:col-span-2">
                    <div className="flex flex-col gap-1">
                      <FieldLabel>Enable popup banner</FieldLabel>
                      <FieldDescription>
                        This controls the bottom banner on the public landing page. Only one
                        event banner can be active at a time.
                      </FieldDescription>
                    </div>
                    <Switch
                      checked={form.showBannerPopup}
                      onCheckedChange={handlePopupBannerToggle}
                    />
                  </Field>
                </div>
              </FieldGroup>
            </CardContent>
          </Card>

          {form.showBannerPopup ? (
            <Card>
              <CardHeader>
                <CardTitle>Popup banner</CardTitle>
                <CardDescription>
                  This banner uses the event detail content, so you only control the popup ID,
                  CTA, schedule, and banner status here.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FieldGroup>
                  <Field>
                    <FieldLabel>Banner popup ID</FieldLabel>
                    <Input
                      value={form.bannerPopupId ?? ""}
                      onChange={(event) => updateForm("bannerPopupId", event.target.value)}
                      placeholder="ai-connect-future-lab-2026-06-18-v1"
                    />
                    <FieldDescription>
                      Change this ID when you want visitors to see this banner again after
                      dismissing it.
                    </FieldDescription>
                  </Field>

                  <div className="grid gap-4 md:grid-cols-2">
                    <Field>
                      <FieldLabel>CTA label</FieldLabel>
                      <Input
                        value={form.bannerCtaLabel ?? ""}
                        onChange={(event) => updateForm("bannerCtaLabel", event.target.value)}
                        placeholder='Defaults to "Detail"'
                      />
                    </Field>
                    <Field>
                      <FieldLabel>CTA URL</FieldLabel>
                      <Input
                        value={form.bannerCtaUrl ?? ""}
                        onChange={(event) => updateForm("bannerCtaUrl", event.target.value)}
                        placeholder="/events/detail"
                      />
                    </Field>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <Field>
                      <FieldLabel>Banner start date</FieldLabel>
                      <DatePicker
                        value={form.bannerStartAt ?? ""}
                        onChange={(value) => updateForm("bannerStartAt", value)}
                        placeholder="Pick start date"
                      />
                    </Field>
                    <Field>
                      <FieldLabel>Banner end date</FieldLabel>
                      <DatePicker
                        value={form.bannerEndAt ?? ""}
                        onChange={(value) => updateForm("bannerEndAt", value)}
                        placeholder="Pick end date"
                      />
                    </Field>
                  </div>

                  <Field>
                    <FieldLabel>Banner status</FieldLabel>
                    <Select
                      value={form.bannerStatus ?? "Draft"}
                      onValueChange={(value) =>
                        updateForm("bannerStatus", value as EventItem["bannerStatus"])
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select banner status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {["Draft", "Published", "Scheduled", "Hidden"].map((status) => (
                            <SelectItem key={status} value={status}>
                              {status}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </Field>
                </FieldGroup>
              </CardContent>
            </Card>
          ) : null}
        </div>

        <div className="flex flex-col gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Publishing summary</CardTitle>
              <CardDescription>Quick review before publishing.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <StatusBadge status={form.status} />
              <div className="flex flex-col gap-1">
                <span className="text-xs text-muted-foreground">Record ID</span>
                <span className="font-mono text-xs">{form.id}</span>
              </div>
              <Separator />
              <div className="grid gap-2 text-xs">
                <span>Type: {form.type}</span>
                <span>Date: {form.date || "Not scheduled"}</span>
                <span>Location: {form.location || "Not set"}</span>
                <span>Featured: {form.featured ? "Yes" : "No"}</span>
                <span>Popup banner: {form.showBannerPopup ? "Active" : "Inactive"}</span>
                <span>Popup ID: {form.bannerPopupId || "Not set"}</span>
              </div>
            </CardContent>
          </Card>

          {form.showBannerPopup ? (
            <EventBannerPreview
              active={form.showBannerPopup}
              bannerStatus={previewBannerStatus}
              date={form.date}
              description={previewDescription}
              ctaLabel={form.bannerCtaLabel ?? "Detail"}
              ctaUrl={form.bannerCtaUrl ?? "/events/detail"}
              thumbnail={previewThumbnail}
              title={previewTitle}
            />
          ) : null}
        </div>
      </div>

      <AlertDialog open={replaceDialogOpen} onOpenChange={setReplaceDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Replace active popup banner?</AlertDialogTitle>
            <AlertDialogDescription>
              Only one popup banner can be active at a time. Enabling this will disable the
              current active banner.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={activatePopupBanner}>Replace banner</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
