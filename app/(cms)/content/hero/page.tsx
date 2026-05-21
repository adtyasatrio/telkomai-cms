"use client"

import { useState } from "react"
import { toast } from "sonner"

import { EditorHeader } from "@/components/cms/editor-actions"
import { ImageUpload } from "@/components/cms/image-upload"
import { StatusBadge } from "@/components/cms/status-badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { heroContent } from "@/lib/cms-data"

export default function HeroEditorPage() {
  const [hero, setHero] = useState(heroContent)
  const highlights = hero.highlights.join("\n")

  return (
    <div className="flex flex-col gap-4">
      <EditorHeader
        eyebrow="Hero Section"
        title="Hero Content"
        description="Control the first viewport, calls to action, image, and facility highlights."
      />
      <div className="grid gap-4 px-4 pb-6 xl:grid-cols-[1fr_420px] lg:px-6">
        <Card>
          <CardHeader>
            <CardTitle>Hero content</CardTitle>
            <CardDescription>Landing page copy and links.</CardDescription>
          </CardHeader>
          <CardContent>
            <FieldGroup>
              <Field>
                <FieldLabel>Eyebrow text</FieldLabel>
                <Input value={hero.eyebrow} onChange={(event) => setHero({ ...hero, eyebrow: event.target.value })} />
              </Field>
              <Field>
                <FieldLabel>Main title</FieldLabel>
                <Input value={hero.title} onChange={(event) => setHero({ ...hero, title: event.target.value })} />
              </Field>
              <Field>
                <FieldLabel>Description</FieldLabel>
                <Textarea value={hero.description} onChange={(event) => setHero({ ...hero, description: event.target.value })} />
              </Field>
              <div className="grid gap-4 md:grid-cols-2">
                <Field>
                  <FieldLabel>Primary CTA label</FieldLabel>
                  <Input value={hero.primaryCtaLabel} onChange={(event) => setHero({ ...hero, primaryCtaLabel: event.target.value })} />
                </Field>
                <Field>
                  <FieldLabel>Primary CTA link</FieldLabel>
                  <Input value={hero.primaryCtaLink} onChange={(event) => setHero({ ...hero, primaryCtaLink: event.target.value })} />
                </Field>
                <Field>
                  <FieldLabel>Secondary CTA label</FieldLabel>
                  <Input value={hero.secondaryCtaLabel} onChange={(event) => setHero({ ...hero, secondaryCtaLabel: event.target.value })} />
                </Field>
                <Field>
                  <FieldLabel>Secondary CTA link</FieldLabel>
                  <Input value={hero.secondaryCtaLink} onChange={(event) => setHero({ ...hero, secondaryCtaLink: event.target.value })} />
                </Field>
              </div>
              <Field>
                <FieldLabel>Hero background photo</FieldLabel>
                <ImageUpload value={hero.backgroundImage} onChange={(val) => setHero({ ...hero, backgroundImage: val })} aspectRatio="video" />
              </Field>
              <Field>
                <FieldLabel>Facility highlights list</FieldLabel>
                <Textarea
                  value={highlights}
                  onChange={(event) =>
                    setHero({
                      ...hero,
                      highlights: event.target.value.split("\n").filter(Boolean),
                    })
                  }
                />
              </Field>
            </FieldGroup>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Live preview</CardTitle>
            <CardDescription>Approximate landing hero output.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div
              className="flex min-h-80 flex-col justify-end bg-cover bg-center p-4 text-white"
              style={{ backgroundImage: `linear-gradient(180deg, rgb(0 0 0 / 0.15), rgb(0 0 0 / 0.75)), url(${hero.backgroundImage})` }}
            >
              <div className="flex flex-col gap-3">
                <StatusBadge status={hero.status} />
                <p className="text-xs font-medium uppercase tracking-normal">{hero.eyebrow}</p>
                <h2 className="font-heading text-2xl font-semibold">{hero.title}</h2>
                <p className="text-sm/relaxed text-white/80">{hero.description}</p>
                <div className="flex flex-wrap gap-2">
                  <Button onClick={() => toast.info(hero.primaryCtaLink)}>{hero.primaryCtaLabel}</Button>
                  <Button variant="outline" onClick={() => toast.info(hero.secondaryCtaLink)}>{hero.secondaryCtaLabel}</Button>
                </div>
              </div>
            </div>
            <Separator />
            <div className="grid gap-2">
              {hero.highlights.map((highlight) => (
                <div key={highlight} className="border px-3 py-2 text-xs">{highlight}</div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
