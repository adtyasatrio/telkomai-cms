"use client"

import { EditorHeader } from "@/components/cms/editor-actions"
import { EntityTable } from "@/components/cms/entity-table"
import { partners } from "@/lib/cms-data"

export default function PartnersPage() {
  return (
    <div className="flex flex-col gap-4">
      <EditorHeader
        eyebrow="Landing content"
        title="Partners"
        description="Manage the partner logos displayed in the marquee section."
        actions={false}
      />
      <div className="grid gap-4 px-4 pb-6 lg:px-6">
        <EntityTable
          title="All Partners"
          description="Browse and manage partner logos."
          items={partners}
          searchKeys={["name"]}
          columns={[
            {
              key: "logoUrl",
              label: "Logo",
              render: (val, row) => (
                <div className="h-10 w-10 overflow-hidden rounded border bg-muted flex items-center justify-center p-1">
                  <img src={String(val)} alt={row.name} className="h-full w-full object-contain" />
                </div>
              ),
            },
            { key: "name", label: "Partner Name" },
            { key: "status", label: "Status", type: "status" },
            { key: "updatedAt", label: "Last Updated" },
          ]}
          filters={[
            {
              key: "status",
              label: "Status",
              values: ["Draft", "Published", "Hidden"],
            },
          ]}
          emptyTitle="No partners found"
          addLabel="Add partner"
          addHref="/partners/new"
          editHrefBase="/partners"
        />
      </div>
    </div>
  )
}
