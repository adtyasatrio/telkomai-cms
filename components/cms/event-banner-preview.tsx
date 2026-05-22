"use client"

import Link from "next/link"
import { XIcon } from "@phosphor-icons/react"

import { StatusBadge } from "@/components/cms/status-badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export function EventBannerPreview({
  active,
  bannerStatus,
  date,
  description,
  ctaLabel,
  ctaUrl,
  thumbnail,
  title,
}: {
  active: boolean
  bannerStatus: string
  date?: string
  description: string
  ctaLabel: string
  ctaUrl: string
  thumbnail: string
  title: string
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Popup preview</CardTitle>
        <CardDescription>How the landing page bottom banner will feel to visitors.</CardDescription>
      </CardHeader>
      <CardContent>
        <div
          className={cn(
            "relative overflow-hidden border border-primary/20 bg-primary text-primary-foreground shadow-sm",
            active ? "opacity-100" : "opacity-70"
          )}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.18),transparent_40%),linear-gradient(135deg,rgba(255,255,255,0.08),transparent_45%)]" />
          <div className="relative flex gap-3 p-3 sm:items-stretch">
            <div className="relative hidden w-28 shrink-0 overflow-hidden border border-white/15 bg-background/10 sm:block">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={thumbnail} alt={title} className="h-full w-full object-cover" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="mb-2 flex items-center justify-between gap-3">
                <span className="text-[10px] font-semibold uppercase tracking-[0.08em] text-primary-foreground/85">
                  Featured Event
                </span>
                <StatusBadge status={bannerStatus} />
              </div>
              <div className="space-y-1">
                <p className="text-[11px] text-primary-foreground/80">{date || "Upcoming"}</p>
                <h3 className="truncate font-heading text-sm font-semibold">{title}</h3>
                <p className="line-clamp-2 text-xs/relaxed text-primary-foreground/80">{description}</p>
              </div>
              <div className="mt-3 flex items-center gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  render={<Link href={ctaUrl} />}
                  className="hidden sm:inline-flex"
                >
                  {ctaLabel}
                </Button>
                <span className="text-[11px] text-primary-foreground/75 sm:hidden">
                  Mobile: whole banner opens detail
                </span>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon-sm"
              className="shrink-0 text-primary-foreground hover:bg-white/10 hover:text-primary-foreground"
              aria-label="Close preview"
            >
              <XIcon />
            </Button>
          </div>
        </div>
        <div className="mt-3 rounded-none border bg-muted/40 px-3 py-2 text-xs text-muted-foreground">
          On the public landing page this banner is fixed to the bottom and dismissible. Changing the popup ID will
          let visitors see it again after they close it.
        </div>
      </CardContent>
    </Card>
  )
}
