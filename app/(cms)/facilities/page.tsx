import { EditorHeader } from "@/components/cms/editor-actions"
import { EntityTable } from "@/components/cms/entity-table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { facilities } from "@/lib/cms-data"

export default function FacilitiesPage() {
  return (
    <div className="flex flex-col gap-4">
      <EditorHeader title="Facilities editor" description="Manage AI Connect facility content, availability, and booking details." />
      <div className="grid gap-4 px-4 pb-6 lg:px-6">
        <Card>
          <CardHeader>
            <CardTitle>Section copy</CardTitle>
            <CardDescription>Landing page title and description for facilities.</CardDescription>
          </CardHeader>
          <CardContent>
            <FieldGroup>
              <Field><FieldLabel>Section title</FieldLabel><Input defaultValue="AI Connect facilities" /></Field>
              <Field><FieldLabel>Description</FieldLabel><Textarea defaultValue="Spaces for workshops, demos, rapid prototyping, and enterprise collaboration." /></Field>
            </FieldGroup>
          </CardContent>
        </Card>
        <EntityTable
          title="Facilities"
          description="Rooms, labs, and collaboration spaces available on the landing page."
          items={facilities}
          columns={[
            { key: "title", label: "Title" },
            { key: "capacity", label: "Capacity" },
            { key: "location", label: "Location" },
            { key: "bookingAvailable", label: "Booking", type: "boolean" },
            { key: "status", label: "Status", type: "status" },
          ]}
          fields={[
            { key: "title", label: "Title" },
            { key: "description", label: "Description", kind: "textarea" },
            { key: "imageUrl", label: "Image URL/upload" },
            { key: "capacity", label: "Capacity" },
            { key: "location", label: "Location" },
            { key: "features", label: "Features list", kind: "list" },
            { key: "bookingAvailable", label: "Booking availability", kind: "switch" },
          ]}
          filters={[{ key: "status", label: "Status", values: ["Published", "Draft"] }]}
          searchKeys={["title", "description", "location"]}
          emptyTitle="No facilities found"
          addLabel="New facility"
        />
      </div>
    </div>
  )
}
