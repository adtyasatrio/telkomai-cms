"use client"

import Link from "next/link"
import {
  CalendarDotsIcon,
  ImageSquareIcon,
  MapPinAreaIcon,
  NewspaperClippingIcon,
  SquaresFourIcon,
} from "@phosphor-icons/react"

import { PageHeader } from "@/components/cms/page-header"
import { StatusBadge } from "@/components/cms/status-badge"
import { Button } from "@/components/ui/button"
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { activity, events, facilities, landingSections, media, programs } from "@/lib/cms-data"

const metrics = [
  { label: "Sections", value: landingSections.length, icon: SquaresFourIcon },
  { label: "Events", value: events.length, icon: CalendarDotsIcon },
  { label: "Media posts", value: media.length, icon: NewspaperClippingIcon },
  { label: "Facilities", value: facilities.length, icon: MapPinAreaIcon },
  { label: "Programs", value: programs.length, icon: ImageSquareIcon },
]

const quickActions = [
  ["Edit Hero", "/content/hero"],
  ["Programs", "/programs"],
  ["Facilities", "/facilities"],
  ["Events", "/events"],
  ["Media", "/media"],
  ["Footer", "/footer"],
]

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-4">
      <PageHeader
        eyebrow="Dashboard"
        title="CMS operations overview"
        description="Monitor landing page content health, recent changes, and priority editing areas."
      />
      <div className="grid gap-4 px-4 lg:grid-cols-5 lg:px-6">
        {metrics.map((metric) => {
          const Icon = metric.icon

          return (
            <Card key={metric.label} size="sm">
              <CardHeader>
                <CardTitle>{metric.label}</CardTitle>
                <CardAction>
                  <Icon className="size-5 text-muted-foreground" weight="duotone" />
                </CardAction>
                <CardDescription>Landing page inventory</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-semibold">{metric.value}</div>
              </CardContent>
            </Card>
          )
        })}
      </div>
      <div className="grid gap-4 px-4 pb-6 lg:grid-cols-[1fr_320px] lg:px-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent updates</CardTitle>
            <CardDescription>Latest activity from content editors.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Item</TableHead>
                  <TableHead>Area</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {activity.map((row) => (
                  <TableRow key={`${row.item}-${row.date}`}>
                    <TableCell className="font-medium">{row.item}</TableCell>
                    <TableCell>{row.area}</TableCell>
                    <TableCell><StatusBadge status={row.action} /></TableCell>
                    <TableCell>{row.user}</TableCell>
                    <TableCell>{row.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Quick actions</CardTitle>
            <CardDescription>Jump into high-use editors.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-2">
            {quickActions.map(([label, href]) => (
              <Button key={href} variant="outline" render={<Link href={href} />}>
                {label}
              </Button>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
