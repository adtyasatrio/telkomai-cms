import { EditorHeader } from "@/components/cms/editor-actions"
import { EntityTable } from "@/components/cms/entity-table"
import { programs } from "@/lib/cms-data"

export default function ProgramsPage() {
  return (
    <div className="flex flex-col gap-4">
      <EditorHeader
        eyebrow="Programs"
        title="Programs"
        description="Manage AI Center program cards."
        actions={false}
      />
      <div className="grid gap-4 px-4 pb-6 lg:px-6">
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
          filters={[{ key: "status", label: "Status", values: ["Published", "Draft"] }]}
          searchKeys={["title", "description", "icon"]}
          emptyTitle="No program cards found"
          addLabel="New program"
          addHref="/programs/new"
          editHrefBase="/programs"
        />
      </div>
    </div>
  )
}
