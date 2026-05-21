"use client"

import { useState } from "react"
import { InfoIcon, PlusIcon, TrashIcon } from "@phosphor-icons/react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import type { Highlight } from "@/lib/cms-data"

type Props = {
  value: Highlight[]
  onChange: (value: Highlight[]) => void
}

export function HighlightListInput({ value, onChange }: Props) {
  const [items, setItems] = useState<Highlight[]>(value)

  const update = (next: Highlight[]) => {
    setItems(next)
    onChange(next)
  }

  const addItem = () => update([...items, { icon: "", label: "" }])
  const removeItem = (index: number) => update(items.filter((_, i) => i !== index))
  const updateItem = (index: number, field: keyof Highlight, val: string) =>
    update(items.map((item, i) => (i === index ? { ...item, [field]: val } : item)))

  return (
    <TooltipProvider>
      <div className="flex flex-col gap-2">
        {/* Column headers */}
        {items.length > 0 && (
          <div className="flex items-center gap-2 px-0.5">
            <div className="flex flex-1 items-center gap-1 text-xs text-muted-foreground">
              Icon name
              <Tooltip>
                <TooltipTrigger
                  render={
                    <button
                      type="button"
                      className="inline-flex items-center text-muted-foreground/60 hover:text-muted-foreground transition-colors"
                    />
                  }
                >
                  <InfoIcon className="size-3.5" />
                </TooltipTrigger>
                <TooltipContent side="top" className="max-w-60">
                  <p className="font-semibold mb-1">How to find a Phosphor icon name:</p>
                  <ol className="list-decimal list-inside space-y-0.5 text-background/80">
                    <li>Go to <a href="https://phosphoricons.com" target="_blank" rel="noopener noreferrer" className="underline">phosphoricons.com</a></li>
                    <li>Click an icon to see its name</li>
                    <li>Use the <strong>PascalCase</strong> name — e.g. <code>GraduationCap</code></li>
                  </ol>
                </TooltipContent>
              </Tooltip>
            </div>
            <div className="flex-[2] text-xs text-muted-foreground">Label</div>
            <div className="w-7" />
          </div>
        )}

        {items.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <Input
              value={item.icon}
              onChange={(e) => updateItem(index, "icon", e.target.value)}
              placeholder="e.g. GraduationCap"
              className="flex-1 font-mono text-xs"
            />
            <Input
              value={item.label}
              onChange={(e) => updateItem(index, "label", e.target.value)}
              placeholder="e.g. Talent Academy"
              className="flex-[2]"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              onClick={() => removeItem(index)}
              aria-label="Remove highlight"
              className="shrink-0 text-destructive hover:text-destructive"
            >
              <TrashIcon />
            </Button>
          </div>
        ))}

        <Button
          type="button"
          variant="outline"
          size="sm"
          className="w-fit"
          onClick={addItem}
        >
          <PlusIcon data-icon="inline-start" />
          Add highlight
        </Button>
      </div>
    </TooltipProvider>
  )
}
