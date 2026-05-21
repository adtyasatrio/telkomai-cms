import { EditorHeader } from "@/components/cms/editor-actions"
import { EntityTable } from "@/components/cms/entity-table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { events } from "@/lib/cms-data"

export default function EventsPage() {
  return (
    <div className="flex flex-col gap-4">
      <EditorHeader title="Events editor" description="Search, filter, publish, and feature event content." />
      <div className="grid gap-4 px-4 pb-6 lg:px-6">
        <Card>
          <CardHeader>
            <CardTitle>Featured event selector</CardTitle>
            <CardDescription>Choose the event promoted in the landing page feature block.</CardDescription>
          </CardHeader>
          <CardContent>
            <FieldGroup>
              <Field>
                <FieldLabel>Featured event</FieldLabel>
                <Select defaultValue={events.find((event) => event.featured)?.id}>
                  <SelectTrigger className="w-full md:w-96"><SelectValue placeholder="Select event" /></SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {events.map((event) => <SelectItem key={event.id} value={event.id}>{event.title}</SelectItem>)}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </Field>
            </FieldGroup>
          </CardContent>
        </Card>
        <EntityTable
          title="Events"
          description="Event list with type and publication controls."
          items={events}
          columns={[
            { key: "title", label: "Title" },
            { key: "type", label: "Type" },
            { key: "date", label: "Date" },
            { key: "location", label: "Location" },
            { key: "published", label: "Published", type: "boolean" },
            { key: "status", label: "Status", type: "status" },
          ]}
          fields={[
            { key: "title", label: "Title" },
            { key: "type", label: "Type" },
            { key: "date", label: "Date" },
            { key: "location", label: "Location" },
            { key: "description", label: "Description", kind: "textarea" },
            { key: "imageUrl", label: "Image URL/upload" },
            { key: "featured", label: "Featured", kind: "switch" },
            { key: "published", label: "Published status", kind: "switch" },
          ]}
          filters={[
            { key: "type", label: "Type", values: ["Workshop", "Seminar", "Competition", "Showcase"] },
            { key: "status", label: "Status", values: ["Published", "Scheduled", "Draft"] },
          ]}
          searchKeys={["title", "description", "location", "type"]}
          emptyTitle="No events found"
          addLabel="New event"
        />
      </div>
    </div>
  )
}
