import { EditorHeader } from "@/components/cms/editor-actions"
import { EntityTable } from "@/components/cms/entity-table"
import { media } from "@/lib/cms-data"

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
