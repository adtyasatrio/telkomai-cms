import { EditorHeader } from "@/components/cms/editor-actions"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function MediaSectionPage() {
  return (
    <div className="flex flex-col gap-4">
      <EditorHeader
        eyebrow="Media Section"
        title="Media Section Intro"
        description="Manage the landing page label, title, and description for the media library section."
      />
      <div className="grid gap-4 px-4 pb-6 lg:px-6">
        <Card>
          <CardHeader>
            <CardTitle>Section copy</CardTitle>
            <CardDescription>Text shown above media cards on the landing page.</CardDescription>
          </CardHeader>
          <CardContent>
            <FieldGroup>
              <div className="grid gap-4 md:grid-cols-2">
                <Field><FieldLabel>Section label</FieldLabel><Input defaultValue="Media Library" /></Field>
                <Field><FieldLabel>Title</FieldLabel><Input defaultValue="Stories and updates from Telkom AI CoE" /></Field>
              </div>
              <Field>
                <FieldLabel>Description</FieldLabel>
                <Textarea defaultValue="Browse announcements, videos, articles, and press coverage from the AI Center of Excellence." />
              </Field>
            </FieldGroup>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
