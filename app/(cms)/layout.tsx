import { AppShell } from "@/components/cms/app-shell"

export default function CmsLayout({ children }: { children: React.ReactNode }) {
  return <AppShell>{children}</AppShell>
}
