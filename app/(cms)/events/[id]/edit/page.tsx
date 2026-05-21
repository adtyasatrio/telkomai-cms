import { EventForm } from "@/components/cms/event-form"
import { events } from "@/lib/cms-data"

export default async function EditEventPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const event = events.find((item) => item.id === id)

  return <EventForm event={event} mode="edit" />
}
