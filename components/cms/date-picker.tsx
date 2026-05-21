"use client"

import * as React from "react"
import { CalendarIcon } from "@phosphor-icons/react"
import { format, parse, isValid } from "date-fns"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

type DatePickerProps = {
  /** ISO date string: "YYYY-MM-DD" */
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  placeholder?: string
  className?: string
}

export function DatePicker({
  value,
  defaultValue,
  onChange,
  placeholder = "Pick a date",
  className,
}: DatePickerProps) {
  const parseDate = (str?: string): Date | undefined => {
    if (!str) return undefined
    const d = parse(str, "yyyy-MM-dd", new Date())
    return isValid(d) ? d : undefined
  }

  const [internalDate, setInternalDate] = React.useState<Date | undefined>(
    parseDate(value ?? defaultValue)
  )
  const [open, setOpen] = React.useState(false)

  // Sync if controlled
  React.useEffect(() => {
    if (value !== undefined) setInternalDate(parseDate(value))
  }, [value])

  const handleSelect = (date: Date | undefined) => {
    setInternalDate(date)
    setOpen(false)
    onChange?.(date ? format(date, "yyyy-MM-dd") : "")
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        render={
          <Button
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal",
              !internalDate && "text-muted-foreground",
              className
            )}
          />
        }
      >
        <CalendarIcon data-icon="inline-start" />
        {internalDate ? format(internalDate, "PPP") : <span>{placeholder}</span>}
      </PopoverTrigger>
      <PopoverContent align="start" className="w-auto p-0">
        <Calendar
          mode="single"
          selected={internalDate}
          onSelect={handleSelect}
          defaultMonth={internalDate}
        />
      </PopoverContent>
    </Popover>
  )
}
