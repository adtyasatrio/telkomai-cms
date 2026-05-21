import { FacilityForm } from "@/components/cms/facility-form"
import { facilities } from "@/lib/cms-data"

export default async function EditFacilityPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const facility = facilities.find((item) => item.id === id)

  return <FacilityForm facility={facility} mode="edit" />
}
