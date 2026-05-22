"use client"

import { useState } from "react"
import { MegaphoneSimpleIcon } from "@phosphor-icons/react"

import { EditorHeader } from "@/components/cms/editor-actions"
import { EntityTable } from "@/components/cms/entity-table"
import { events, eventsHeader } from "@/lib/cms-data"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

export default function EventsPage() {
  const [items] = useState(events)

  return (
    <div className="flex flex-col gap-4">
      <EditorHeader
        eyebrow="Events"
        title="Events"
        description="Search, filter, publish, and feature event content."
        actions={false}
      />
      <div className="grid gap-4 px-4 pb-6 lg:px-6">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="section-content" className="border-none rounded-none bg-card text-card-foreground ring-1 ring-foreground/10">
            <AccordionTrigger className="px-4 hover:no-underline">
              <div className="flex flex-col items-start gap-1 text-left">
                <span className="font-heading text-sm font-medium">Events Section Intro</span>
                <span className="text-xs/relaxed text-muted-foreground font-normal">Manage the title and introduction for the upcoming events section.</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4">
              <FieldGroup>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <Field>
                    <FieldLabel htmlFor="eyebrow">Eyebrow</FieldLabel>
                    <Input id="eyebrow" defaultValue={eventsHeader.eyebrow} />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="title">Title</FieldLabel>
                    <Input id="title" defaultValue={eventsHeader.title} />
                  </Field>
                </div>
                <Field>
                  <FieldLabel htmlFor="description">Description</FieldLabel>
                  <Textarea id="description" defaultValue={eventsHeader.description} rows={3} />
                </Field>
                <div className="flex justify-end">
                  <Button>Save Content</Button>
                </div>
              </FieldGroup>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <EntityTable
          title="Events"
          description="Event list with type, publication, and popup banner controls."
          items={items}
          columns={[
            {
              key: "title",
              label: "Title",
              render: (value, row) => (
                <div className="flex items-center gap-2">
                  <span>{String(value)}</span>
                  {row.showBannerPopup ? (
                    <span title="Featured in popup banner">
                      <MegaphoneSimpleIcon className="size-3.5 shrink-0 text-primary" weight="fill" />
                    </span>
                  ) : null}
                </div>
              ),
            },
            { key: "type", label: "Type" },
            { key: "date", label: "Date" },
            { key: "location", label: "Location" },
            { key: "featured", label: "Featured", type: "boolean" },
            { key: "status", label: "Status", type: "status" },
          ]}
          filters={[
            { key: "type", label: "Type", values: ["Workshop", "Seminar", "Competition", "Showcase"] },
            { key: "status", label: "Status", values: ["Published", "Scheduled", "Draft"] },
            { key: "showBannerPopup", label: "Popup banner", values: [{ label: "Active popup", value: "true" }] },
          ]}
          searchKeys={["title", "description", "location", "type", "bannerPopupId"]}
          emptyTitle="No events found"
          addLabel="New event"
          addHref="/events/new"
          editHrefBase="/events"
        />
      </div>
    </div>
  )
}
