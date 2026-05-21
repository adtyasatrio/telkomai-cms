"use client"

import { useEffect, useState } from "react"
import { MoonIcon, SunIcon } from "@phosphor-icons/react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"

const themes = [
  { value: "light", label: "Light", icon: SunIcon },
  { value: "dark", label: "Dark", icon: MoonIcon },
]

export function ThemeSelector() {
  const { setTheme, theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    window.setTimeout(() => setMounted(true), 0)
  }, [])

  if (!mounted) {
    return (
      <Button variant="outline" size="icon-sm" disabled aria-label="Theme">
        <SunIcon />
      </Button>
    )
  }

  const selectedTheme = theme === "dark" ? "dark" : "light"
  const selected = themes.find((item) => item.value === selectedTheme) ?? themes[0]
  const SelectedIcon = selected.icon
  const nextTheme = selectedTheme === "light" ? "dark" : "light"

  return (
    <Button
      variant="outline"
      size="icon-sm"
      aria-label={`Theme: ${selected.label}`}
      title={`Theme: ${selected.label}`}
      onClick={() => setTheme(nextTheme)}
    >
      <SelectedIcon />
    </Button>
  )
}
