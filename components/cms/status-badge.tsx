"use client"

import { Badge } from "@/components/ui/badge"
import type { Status } from "@/lib/cms-data"

export function StatusBadge({ status }: { status: Status | string }) {
  if (status === "Published") {
    return (
      <Badge className="bg-black text-white dark:bg-white dark:text-black hover:bg-black/90 dark:hover:bg-white/90 border-transparent">
        {status}
      </Badge>
    )
  }

  return <Badge variant="secondary">{status}</Badge>
}
