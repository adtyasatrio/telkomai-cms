"use client"

import { Badge } from "@/components/ui/badge"
import type { Status } from "@/lib/cms-data"

export function StatusBadge({ status }: { status: Status | string }) {
  // Published (Green/Emerald)
  if (status === "Published") {
    return (
      <Badge className="bg-emerald-500/10 text-emerald-700 border-emerald-500/20 hover:bg-emerald-500/15 dark:bg-emerald-500/15 dark:text-emerald-400 dark:border-emerald-500/30">
        {status}
      </Badge>
    )
  }

  // Draft / Updated draft (Amber)
  if (status === "Draft" || status === "Updated draft") {
    return (
      <Badge className="bg-amber-500/10 text-amber-700 border-amber-500/20 hover:bg-amber-500/15 dark:bg-amber-500/15 dark:text-amber-400 dark:border-amber-500/30">
        {status}
      </Badge>
    )
  }

  // Scheduled (Blue/Sky)
  if (status === "Scheduled") {
    return (
      <Badge className="bg-sky-500/10 text-sky-700 border-sky-500/20 hover:bg-sky-500/15 dark:bg-sky-500/15 dark:text-sky-400 dark:border-sky-500/30">
        {status}
      </Badge>
    )
  }

  // Enabled (Teal)
  if (status === "Enabled") {
    return (
      <Badge className="bg-teal-500/10 text-teal-700 border-teal-500/20 hover:bg-teal-500/15 dark:bg-teal-500/15 dark:text-teal-400 dark:border-teal-500/30">
        {status}
      </Badge>
    )
  }

  // Disabled (Rose/Red)
  if (status === "Disabled") {
    return (
      <Badge className="bg-rose-500/10 text-rose-700 border-rose-500/20 hover:bg-rose-500/15 dark:bg-rose-500/15 dark:text-rose-400 dark:border-rose-500/30">
        {status}
      </Badge>
    )
  }

  // Created (Indigo)
  if (status === "Created") {
    return (
      <Badge className="bg-indigo-500/10 text-indigo-700 border-indigo-500/20 hover:bg-indigo-500/15 dark:bg-indigo-500/15 dark:text-indigo-400 dark:border-indigo-500/30">
        {status}
      </Badge>
    )
  }

  // Edited (Purple/Violet)
  if (status === "Edited") {
    return (
      <Badge className="bg-violet-500/10 text-violet-700 border-violet-500/20 hover:bg-violet-500/15 dark:bg-violet-500/15 dark:text-violet-400 dark:border-violet-500/30">
        {status}
      </Badge>
    )
  }

  return <Badge variant="secondary">{status}</Badge>
}
