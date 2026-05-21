import Link from "next/link"
import { EyeIcon, PencilSimpleIcon } from "@phosphor-icons/react"

import { PageHeader } from "@/components/cms/page-header"
import { StatusBadge } from "@/components/cms/status-badge"
import { Button } from "@/components/ui/button"
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { landingSections } from "@/lib/cms-data"

export default function LandingContentPage() {
  return (
    <div className="flex flex-col gap-4">
      <PageHeader
        eyebrow="Landing content"
        title="Landing page section map"
        description="Edit the content modules that compose the public Telkom AI Center of Excellence landing page."
      />
      <div className="grid gap-4 px-4 pb-6 md:grid-cols-2 xl:grid-cols-3 lg:px-6">
        {landingSections.map((section) => (
          <Card key={section.title}>
            <CardHeader>
              <CardTitle>{section.title}</CardTitle>
              <CardAction>
                <StatusBadge status={section.status} />
              </CardAction>
              <CardDescription>Last updated {section.updatedAt}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-1.5">
                <p className="text-sm/relaxed text-muted-foreground line-clamp-2">
                  {section.description}
                </p>
                <span className="text-xs font-medium text-foreground">
                  {section.meta}
                </span>
              </div>
            </CardContent>

            <CardFooter className="gap-2">
              <Button variant="outline" render={<Link href={section.href} />}>
                <EyeIcon data-icon="inline-start" />
                {section.previewLabel || "Preview"}
              </Button>
              <Button render={<Link href={section.editHref} />}>
                <PencilSimpleIcon data-icon="inline-start" />
                Edit
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
