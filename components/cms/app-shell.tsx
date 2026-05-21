"use client"

import Link from "next/link"

import { Button } from "@/components/ui/button"
import { usePathname } from "next/navigation"
import {
  ArrowSquareOutIcon,
  CalendarDotsIcon,
  HouseIcon,
  LayoutIcon,
  MapPinAreaIcon,
  NewspaperClippingIcon,
  SquaresFourIcon,
  UsersThreeIcon,
  UserIcon,
  SignOutIcon,
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ThemeSelector } from "@/components/cms/theme-selector"

const nav = [
  { label: "Dashboard", href: "/", icon: HouseIcon },
  { label: "Landing Content", href: "/content", icon: LayoutIcon },
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
                      <SidebarMenuButton
                        className="min-h-10 px-3"
                        render={<Link href={item.href} />}
                        isActive={active}
                      >
                        <Icon weight={active ? "fill" : "duotone"} />
                        <span className={active ? "text-xs font-semibold" : "text-xs"}>{item.label}</span>
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
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <button className="flex w-full items-center gap-2.5 px-2 py-1.5 text-left rounded-sm hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors outline-hidden focus-visible:ring-2 focus-visible:ring-sidebar-ring cursor-pointer" />
              }
            >
              <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold text-xs border border-primary/20">
                AS
              </div>
              <div className="flex min-w-0 flex-col group-data-[collapsible=icon]:hidden">
                <span className="truncate text-xs font-semibold text-sidebar-foreground">Aditya Satrio</span>
                <span className="truncate text-[10px] text-sidebar-foreground/60">Super Admin</span>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" side="top" sideOffset={8} className="w-48">
              <DropdownMenuItem className="cursor-pointer gap-2" render={<Link href="/profile" />}>
                <UserIcon className="size-4" />
                <span>Edit Profile</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer gap-2" variant="destructive">
                <SignOutIcon className="size-4" />
                <span>Sign Out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-12 items-center gap-4 border-b bg-background px-4">
          <SidebarTrigger />
          <div className="flex min-w-0 flex-1 items-center justify-between gap-3">
            <p className="truncate text-xs text-muted-foreground">
              Manage all content powering the public landing page
            </p>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" render={<Link href="https://telkomai.vercel.app" target="_blank" rel="noopener noreferrer" />}>
                <ArrowSquareOutIcon data-icon="inline-start" />
                Go to Landing Page
              </Button>
              <ThemeSelector />
            </div>
          </div>
        </header>
        <main className="min-h-[calc(100svh-3rem)] bg-line-pattern">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  )
}
