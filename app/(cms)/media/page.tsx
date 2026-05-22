import { EditorHeader } from "@/components/cms/editor-actions"
import { EntityTable } from "@/components/cms/entity-table"
import { media, mediaHeader } from "@/lib/cms-data"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

export default function MediaPage() {
  return (
    <div className="flex flex-col gap-4">
      <EditorHeader
        eyebrow="Media"
        title="Media Library"
        description="Manage media library cards, article bodies, thumbnails, and URLs."
        actions={false}
      />
      <div className="grid gap-4 px-4 pb-6 lg:px-6">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="section-content" className="border-none rounded-none bg-card text-card-foreground ring-1 ring-foreground/10">
            <AccordionTrigger className="px-4 hover:no-underline">
              <div className="flex flex-col items-start gap-1 text-left">
                <span className="font-heading text-sm font-medium">Media Section Intro</span>
                <span className="text-xs/relaxed text-muted-foreground font-normal">Manage the title and introduction for the media library section.</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4">
              <FieldGroup>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <Field>
                    <FieldLabel htmlFor="eyebrow">Eyebrow</FieldLabel>
                    <Input id="eyebrow" defaultValue={mediaHeader.eyebrow} />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="title">Title</FieldLabel>
                    <Input id="title" defaultValue={mediaHeader.title} />
                  </Field>
                </div>
                <Field>
                  <FieldLabel htmlFor="description">Description</FieldLabel>
                  <Textarea id="description" defaultValue={mediaHeader.description} rows={3} />
                </Field>
                <div className="flex justify-end">
                  <Button>Save Content</Button>
                </div>
              </FieldGroup>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <EntityTable
          title="Media library"
          description="Media posts with search, category filter, and publish controls."
          items={media}
          columns={[
            { key: "title", label: "Title" },
            { key: "category", label: "Category" },
            { key: "metaDate", label: "Meta/date" },
            { key: "createdBy", label: "Creator" },
            { key: "status", label: "Status", type: "status" },
          ]}

          filters={[
            { key: "category", label: "Category", values: ["News", "Article", "Video", "Press"] },
            { key: "status", label: "Status", values: ["Published", "Draft", "Scheduled", "Hidden"] },
          ]}
          searchKeys={["title", "description", "category"]}
          emptyTitle="No media items found"
          addLabel="New media"
          addHref="/media/new"
          editHrefBase="/media"
        />
      </div>
    </div>
  )
}
