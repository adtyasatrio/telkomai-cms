"use client"

import { useState } from "react"
import { MegaphoneSimpleIcon } from "@phosphor-icons/react"

import { EditorHeader } from "@/components/cms/editor-actions"
import { EntityTable } from "@/components/cms/entity-table"
import { events } from "@/lib/cms-data"

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
