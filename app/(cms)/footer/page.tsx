"use client"

import { useState } from "react"
import { FacebookLogo, InstagramLogo, LinkedinLogo, XLogo } from "@phosphor-icons/react"

import { cn } from "@/lib/utils"

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
              <div className="grid gap-4 md:grid-cols-2">
                <Field>
                  <FieldLabel className="flex items-center gap-1.5">
                    <LinkedinLogo className="size-4 text-[#0077b5]" weight="duotone" />
                    LinkedIn URL
                  </FieldLabel>
                  <Input
                    value={footer.socialLinks.find((link) => link.label === "LinkedIn")?.url || ""}
                    onChange={(event) => {
                      const newSocials = footer.socialLinks.map((link) =>
                        link.label === "LinkedIn" ? { ...link, url: event.target.value } : link
                      )
                      setFooter({ ...footer, socialLinks: newSocials })
                    }}
                  />
                </Field>
                <Field>
                  <FieldLabel className="flex items-center gap-1.5">
                    <InstagramLogo className="size-4 text-[#e1306c]" weight="duotone" />
                    Instagram URL
                  </FieldLabel>
                  <Input
                    value={footer.socialLinks.find((link) => link.label === "Instagram")?.url || ""}
                    onChange={(event) => {
                      const newSocials = footer.socialLinks.map((link) =>
                        link.label === "Instagram" ? { ...link, url: event.target.value } : link
                      )
                      setFooter({ ...footer, socialLinks: newSocials })
                    }}
                  />
                </Field>
                <Field>
                  <FieldLabel className="flex items-center gap-1.5">
                    <FacebookLogo className="size-4 text-[#1877f2]" weight="duotone" />
                    Facebook URL
                  </FieldLabel>
                  <Input
                    value={footer.socialLinks.find((link) => link.label === "Facebook")?.url || ""}
                    onChange={(event) => {
                      const newSocials = footer.socialLinks.map((link) =>
                        link.label === "Facebook" ? { ...link, url: event.target.value } : link
                      )
                      setFooter({ ...footer, socialLinks: newSocials })
                    }}
                  />
                </Field>
                <Field>
                  <FieldLabel className="flex items-center gap-1.5">
                    <XLogo className="size-4 text-foreground" weight="duotone" />
                    X (Twitter) URL
                  </FieldLabel>
                  <Input
                    value={footer.socialLinks.find((link) => link.label === "X")?.url || ""}
                    onChange={(event) => {
                      const newSocials = footer.socialLinks.map((link) =>
                        link.label === "X" ? { ...link, url: event.target.value } : link
                      )
                      setFooter({ ...footer, socialLinks: newSocials })
                    }}
                  />
                </Field>
              </div>
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
            <div className="flex flex-col gap-2">
              {footer.socialLinks.map((link) => {
                let Icon = LinkedinLogo
                let iconColor = "text-[#0077b5]"

                if (link.label === "Instagram") {
                  Icon = InstagramLogo
                  iconColor = "text-[#e1306c]"
                } else if (link.label === "Facebook") {
                  Icon = FacebookLogo
                  iconColor = "text-[#1877f2]"
                } else if (link.label === "X") {
                  Icon = XLogo
                  iconColor = "text-foreground"
                }

                if (!link.url) return null

                return (
                  <div key={link.label} className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Icon className={cn("size-4 shrink-0", iconColor)} weight="duotone" />
                    <span className="truncate">{link.url}</span>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
