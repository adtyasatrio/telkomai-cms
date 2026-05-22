import { notFound } from "next/navigation"
import { partners } from "@/lib/cms-data"
import { PartnerForm } from "@/components/cms/partner-form"

export default async function EditPartnerPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const partner = partners.find((p) => p.id === id)

  if (!partner) {
    notFound()
  }

  return <PartnerForm partner={partner} mode="edit" />
}
