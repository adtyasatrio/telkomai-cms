import { EditorHeader } from "@/components/cms/editor-actions"
import { EntityTable } from "@/components/cms/entity-table"
import { events } from "@/lib/cms-data"

export default function EventsPage() {
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
          description="Event list with type and publication controls."
          items={events}
          columns={[
            { key: "title", label: "Title" },
            { key: "type", label: "Type" },
            { key: "date", label: "Date" },
            { key: "location", label: "Location" },
            { key: "featured", label: "Featured", type: "boolean" },
            { key: "status", label: "Status", type: "status" },
          ]}

          filters={[
            { key: "type", label: "Type", values: ["Workshop", "Seminar", "Competition", "Showcase"] },
            { key: "status", label: "Status", values: ["Published", "Scheduled", "Draft"] },
          ]}
          searchKeys={["title", "description", "location", "type"]}
          emptyTitle="No events found"
          addLabel="New event"
          addHref="/events/new"
          editHrefBase="/events"
        />
      </div>
    </div>
  )
}
