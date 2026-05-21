import { ProgramForm } from "@/components/cms/program-form"
import { programs } from "@/lib/cms-data"

export default async function EditProgramPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const program = programs.find((item) => item.id === id)

  return <ProgramForm program={program} mode="edit" />
}
