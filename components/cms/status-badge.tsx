"use client"

import { Badge } from "@/components/ui/badge"
import type { Status } from "@/lib/cms-data"

export function StatusBadge({ status }: { status: Status | string }) {
  const variant = status === "Published" ? "default" : "secondary"

  return <Badge variant={variant}>{status}</Badge>
}
