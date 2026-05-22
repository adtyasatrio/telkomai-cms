"use client"

import { useRouter } from "next/navigation"
import { toast } from "sonner"

import { StatusBadge } from "@/components/cms/status-badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import type { PartnerItem } from "@/lib/cms-data"
import { ImageUpload } from "@/components/cms/image-upload"
import { PageHeader } from "@/components/cms/page-header"

const blankPartner: PartnerItem = {
  id: "part-new",
  name: "",
  logoUrl: "",
  status: "Draft",
  createdBy: "",
  updatedAt: "2026-05-22",
}

export function PartnerForm({ partner, mode }: { partner?: PartnerItem; mode: "new" | "edit" }) {
  const data = partner ?? blankPartner
  const title = mode === "new" ? "Add partner" : `Edit partner: ${data.name}`
  const router = useRouter()

  return (
    <div className="flex flex-col gap-4">
      <PageHeader
        eyebrow="Partners"
        title={title}
        description="Manage partner logo and details."
        actions={true}
        onPreview={() => toast.info("Preview opened")}
        onSave={() => toast.success("Draft saved")}
        onPublish={() => toast.success("Partner published")}
        onCancel={() => router.push("/partners")}
      />
      <div className="grid gap-4 px-4 pb-6 xl:grid-cols-[1fr_360px] lg:px-6">
        <Card>
          <CardHeader>
            <CardTitle>Partner details</CardTitle>
            <CardDescription>Upload partner logo and name.</CardDescription>
          </CardHeader>
          <CardContent>
            <FieldGroup>
              <Field>
                <FieldLabel>Partner Name</FieldLabel>
                <Input defaultValue={data.name} placeholder="e.g. Telkomsel" />
              </Field>
              <Field>
                <FieldLabel>Logo</FieldLabel>
                <ImageUpload defaultValue={data.logoUrl} onChange={(val) => { data.logoUrl = val }} aspectRatio="square" />
              </Field>
            </FieldGroup>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Publishing summary</CardTitle>
            <CardDescription>Quick review before publishing.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <StatusBadge status={data.status} />
            <div className="flex flex-col gap-1">
              <span className="text-xs text-muted-foreground">Record ID</span>
              <span className="font-mono text-xs">{data.id}</span>
            </div>
            <Separator />
            <div className="grid gap-2 text-xs">
              <span>Created by: {data.createdBy || "You"}</span>
              <span>Last updated: {data.updatedAt}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
