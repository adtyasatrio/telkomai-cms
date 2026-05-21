import { EditorHeader } from "@/components/cms/editor-actions"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function FacilitiesSectionPage() {
  return (
    <div className="flex flex-col gap-4">
      <EditorHeader
        eyebrow="Facilities Section"
        title="Facilities Section Intro"
        description="Manage the title and introduction for the AI Connect facilities section."
      />
      <div className="grid gap-4 px-4 pb-6 lg:px-6">
        <Card>
          <CardHeader>
            <CardTitle>Section copy</CardTitle>
            <CardDescription>Text shown above facility cards on the landing page.</CardDescription>
          </CardHeader>
          <CardContent>
            <FieldGroup>
              <Field><FieldLabel>Section title</FieldLabel><Input defaultValue="AI Connect facilities" /></Field>
              <Field>
                <FieldLabel>Description</FieldLabel>
                <Textarea defaultValue="Spaces for workshops, demos, rapid prototyping, and enterprise collaboration." />
              </Field>
            </FieldGroup>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
