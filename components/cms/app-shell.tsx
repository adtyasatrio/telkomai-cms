"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  CalendarDotsIcon,
  HouseIcon,
  ImageSquareIcon,
  LayoutIcon,
  MapPinAreaIcon,
  NewspaperClippingIcon,
  SquaresFourIcon,
  UsersThreeIcon,
} from "@phosphor-icons/react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarSeparator,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

const nav = [
  { label: "Dashboard", href: "/", icon: HouseIcon },
  { label: "Landing Content", href: "/content", icon: LayoutIcon },
  { label: "Hero", href: "/content/hero", icon: ImageSquareIcon },
  { label: "Programs", href: "/programs", icon: SquaresFourIcon },
  { label: "Facilities", href: "/facilities", icon: MapPinAreaIcon },
  { label: "Events", href: "/events", icon: CalendarDotsIcon },
  { label: "Media", href: "/media", icon: NewspaperClippingIcon },
  { label: "Footer / Contact", href: "/footer", icon: UsersThreeIcon },
]

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <SidebarHeader>
          <div className="flex items-center gap-2 px-2 py-1.5">
            <div className="flex size-8 items-center justify-center bg-primary text-primary-foreground">
              AI
            </div>
            <div className="flex min-w-0 flex-col group-data-[collapsible=icon]:hidden">
              <span className="truncate font-heading text-sm font-semibold">Telkom AI CoE</span>
              <span className="truncate text-xs text-sidebar-foreground/70">Landing CMS</span>
            </div>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Content</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {nav.map((item) => {
                  const Icon = item.icon
                  const active =
                    item.href === "/" ? pathname === "/" : pathname.startsWith(item.href)

                  return (
                    <SidebarMenuItem key={item.href}>
                      <SidebarMenuButton render={<Link href={item.href} />} isActive={active}>
                        <Icon />
                        <span>{item.label}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarSeparator />
        <SidebarFooter>
          <div className="flex flex-col gap-2 px-2 py-1 group-data-[collapsible=icon]:hidden">
            <p className="text-xs text-sidebar-foreground/70">Auth-ready shell</p>
            <Button variant="outline" size="sm">Admin profile</Button>
          </div>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-12 items-center gap-3 border-b bg-background px-4">
          <SidebarTrigger />
          <Separator orientation="vertical" className="h-5" />
          <div className="flex min-w-0 flex-1 items-center justify-between gap-3">
            <p className="truncate text-xs text-muted-foreground">
              Manage all content powering the public landing page
            </p>
            <Button variant="outline" size="sm">Production</Button>
          </div>
        </header>
        <main className="min-h-[calc(100svh-3rem)] bg-muted/30">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  )
}
