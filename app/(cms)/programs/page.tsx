import { EditorHeader } from "@/components/cms/editor-actions"
import { EntityTable } from "@/components/cms/entity-table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { programs } from "@/lib/cms-data"

export default function ProgramsPage() {
  return (
    <div className="flex flex-col gap-4">
      <EditorHeader title="Programs editor" description="Manage AI Center program section copy and program cards." />
      <div className="grid gap-4 px-4 pb-6 lg:px-6">
        <Card>
          <CardHeader>
            <CardTitle>Section copy</CardTitle>
            <CardDescription>Label, title, and introduction for the programs section.</CardDescription>
          </CardHeader>
          <CardContent>
            <FieldGroup>
              <div className="grid gap-4 md:grid-cols-2">
                <Field><FieldLabel>Section label</FieldLabel><Input defaultValue="AI Center" /></Field>
                <Field><FieldLabel>Title</FieldLabel><Input defaultValue="Programs built for applied AI adoption" /></Field>
              </div>
              <Field><FieldLabel>Description</FieldLabel><Textarea defaultValue="Choose learning, pilot, and governance programs based on your team maturity." /></Field>
            </FieldGroup>
          </CardContent>
        </Card>
        <EntityTable
          title="Program cards"
          description="CRUD list for all landing page program tiles."
          items={programs}
          columns={[
            { key: "title", label: "Title" },
            { key: "icon", label: "Icon" },
            { key: "sortOrder", label: "Sort" },
            { key: "visible", label: "Visibility", type: "boolean" },
            { key: "status", label: "Status", type: "status" },
          ]}
          fields={[
            { key: "title", label: "Title" },
            { key: "description", label: "Description", kind: "textarea" },
            { key: "icon", label: "Icon name" },
            { key: "imageUrl", label: "Image URL/upload" },
            { key: "sortOrder", label: "Sort order", kind: "number" },
            { key: "visible", label: "Visibility", kind: "switch" },
          ]}
          filters={[{ key: "status", label: "Status", values: ["Published", "Draft"] }]}
          searchKeys={["title", "description", "icon"]}
          emptyTitle="No program cards found"
          addLabel="New program"
        />
      </div>
    </div>
  )
}
