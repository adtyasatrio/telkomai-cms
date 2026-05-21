"use client"

import { Badge } from "@/components/ui/badge"
import type { Status } from "@/lib/cms-data"

export function StatusBadge({ status }: { status: Status | string }) {
  if (status === "Published") {
    return (
      <Badge className="bg-emerald-500/10 text-emerald-700 border-emerald-500/20 hover:bg-emerald-500/15 dark:bg-emerald-500/15 dark:text-emerald-400 dark:border-emerald-500/30">
        {status}
      </Badge>
    )
  }

  return <Badge variant="secondary">{status}</Badge>
}
