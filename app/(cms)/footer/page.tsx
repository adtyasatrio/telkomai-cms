"use client"

import { useState } from "react"

import { EditorHeader } from "@/components/cms/editor-actions"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { footerContent } from "@/lib/cms-data"

export default function FooterPage() {
  const [footer, setFooter] = useState(footerContent)

  return (
    <div className="flex flex-col gap-4">
      <EditorHeader
        eyebrow="Footer"
        title="Footer & Contact Info"
        description="Manage company description, contact methods, social links, and footer navigation."
      />
      <div className="grid gap-4 px-4 pb-6 xl:grid-cols-[1fr_380px] lg:px-6">
        <Card>
          <CardHeader>
            <CardTitle>Contact content</CardTitle>
            <CardDescription>These fields are ready to map to a FooterContent API model.</CardDescription>
          </CardHeader>
          <CardContent>
            <FieldGroup>
              <Field><FieldLabel>Company description</FieldLabel><Textarea value={footer.description} onChange={(event) => setFooter({ ...footer, description: event.target.value })} /></Field>
              <div className="grid gap-4 md:grid-cols-2">
                <Field><FieldLabel>Contact email</FieldLabel><Input value={footer.email} onChange={(event) => setFooter({ ...footer, email: event.target.value })} /></Field>
                <Field><FieldLabel>Phone</FieldLabel><Input value={footer.phone} onChange={(event) => setFooter({ ...footer, phone: event.target.value })} /></Field>
              </div>
              <Field><FieldLabel>Address</FieldLabel><Textarea value={footer.address} onChange={(event) => setFooter({ ...footer, address: event.target.value })} /></Field>
              <Field>
                <FieldLabel>Social links</FieldLabel>
                <Textarea defaultValue={footer.socialLinks.map((link) => `${link.label}: ${link.url}`).join("\n")} />
              </Field>
              <Field>
                <FieldLabel>Footer nav links</FieldLabel>
                <Textarea defaultValue={footer.navLinks.map((link) => `${link.label}: ${link.url}`).join("\n")} />
              </Field>
            </FieldGroup>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Footer preview</CardTitle>
            <CardDescription>Compact view of public footer content.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div>
              <h2 className="font-heading text-lg font-semibold">Telkom AI Center of Excellence</h2>
              <p className="mt-2 text-xs/relaxed text-muted-foreground">{footer.description}</p>
            </div>
            <Separator />
            <div className="grid gap-2 text-xs">
              <p>{footer.email}</p>
              <p>{footer.phone}</p>
              <p>{footer.address}</p>
            </div>
            <Separator />
            <div className="grid gap-2">
              {footer.navLinks.map((link) => <span key={link.label} className="text-xs text-muted-foreground">{link.label} {"->"} {link.url}</span>)}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
