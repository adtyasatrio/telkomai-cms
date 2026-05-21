import { EditorHeader } from "@/components/cms/editor-actions"
import { EntityTable } from "@/components/cms/entity-table"
import { media } from "@/lib/cms-data"

export default function MediaPage() {
  return (
    <div className="flex flex-col gap-4">
      <EditorHeader title="Media editor" description="Manage media library cards, article bodies, thumbnails, and URLs." />
      <div className="px-4 pb-6 lg:px-6">
        <EntityTable
          title="Media library"
          description="Media posts with search, category filter, and publish controls."
          items={media}
          columns={[
            { key: "title", label: "Title" },
            { key: "category", label: "Category" },
            { key: "metaDate", label: "Meta/date" },
            { key: "published", label: "Published", type: "boolean" },
            { key: "status", label: "Status", type: "status" },
          ]}
          fields={[
            { key: "title", label: "Title" },
            { key: "category", label: "Category" },
            { key: "metaDate", label: "Meta/date" },
            { key: "description", label: "Description", kind: "textarea" },
            { key: "thumbnailUrl", label: "Thumbnail URL/upload" },
            { key: "body", label: "Content body", kind: "textarea" },
            { key: "url", label: "External URL or detail URL" },
            { key: "published", label: "Published status", kind: "switch" },
          ]}
          filters={[
            { key: "category", label: "Category", values: ["News", "Article", "Video", "Press"] },
            { key: "status", label: "Status", values: ["Published", "Draft"] },
          ]}
          searchKeys={["title", "description", "category"]}
          emptyTitle="No media items found"
          addLabel="New media"
        />
      </div>
    </div>
  )
}
