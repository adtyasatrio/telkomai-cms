import { EditorHeader } from "@/components/cms/editor-actions"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { events } from "@/lib/cms-data"

export default function EventsSectionPage() {
  return (
    <div className="flex flex-col gap-4">
      <EditorHeader
        title="Events section settings"
        description="Manage landing page copy and featured event placement separately from the event list."
      />
      <div className="grid gap-4 px-4 pb-6 lg:px-6">
        <Card>
          <CardHeader>
            <CardTitle>Section copy</CardTitle>
            <CardDescription>Text and featured event used by the landing page events section.</CardDescription>
          </CardHeader>
          <CardContent>
            <FieldGroup>
              <div className="grid gap-4 md:grid-cols-2">
                <Field><FieldLabel>Section label</FieldLabel><Input defaultValue="Events" /></Field>
                <Field><FieldLabel>Title</FieldLabel><Input defaultValue="Upcoming AI programs and ecosystem sessions" /></Field>
              </div>
              <Field>
                <FieldLabel>Description</FieldLabel>
                <Textarea defaultValue="Join workshops, seminars, and showcases hosted by the Telkom AI Center of Excellence." />
              </Field>
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
      </div>
    </div>
  )
}
