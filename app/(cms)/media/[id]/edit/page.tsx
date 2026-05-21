import { MediaForm } from "@/components/cms/media-form"
import { media } from "@/lib/cms-data"

export default async function EditMediaPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const item = media.find((entry) => entry.id === id)

  return <MediaForm item={item} mode="edit" />
}
