import { EditorHeader } from "@/components/cms/editor-actions"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function ProgramsSectionPage() {
  return (
    <div className="flex flex-col gap-4">
      <EditorHeader
        title="Programs section copy"
        description="Manage the landing page label, title, and introduction for the AI Center programs section."
      />
      <div className="grid gap-4 px-4 pb-6 lg:px-6">
        <Card>
          <CardHeader>
            <CardTitle>Section copy</CardTitle>
            <CardDescription>Text shown above the program cards on the landing page.</CardDescription>
          </CardHeader>
          <CardContent>
            <FieldGroup>
              <div className="grid gap-4 md:grid-cols-2">
                <Field><FieldLabel>Section label</FieldLabel><Input defaultValue="AI Center" /></Field>
                <Field><FieldLabel>Title</FieldLabel><Input defaultValue="Programs built for applied AI adoption" /></Field>
              </div>
              <Field>
                <FieldLabel>Description</FieldLabel>
                <Textarea defaultValue="Choose learning, pilot, and governance programs based on your team maturity." />
              </Field>
            </FieldGroup>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
