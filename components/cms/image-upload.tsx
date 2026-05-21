"use client"

import * as React from "react"
import { ImageSquareIcon, TrashIcon, UploadSimpleIcon } from "@phosphor-icons/react"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

type ImageUploadProps = {
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  className?: string
  aspectRatio?: "video" | "square" | "rectangle" | "any"
}

export function ImageUpload({
  value,
  defaultValue,
  onChange,
  className,
  aspectRatio = "rectangle",
}: ImageUploadProps) {
  const [internalValue, setInternalValue] = React.useState(value ?? defaultValue ?? "")
  const [isDragging, setIsDragging] = React.useState(false)
  const fileInputRef = React.useRef<HTMLInputElement>(null)

  // Sync value if controlled
  React.useEffect(() => {
    if (value !== undefined) {
      setInternalValue(value)
    }
  }, [value])

  const handleFile = (file: File) => {
    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("Unsupported file format. Please select an image.")
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File is too large. Maximum size is 5MB.")
      return
    }

    const reader = new FileReader()
    reader.onload = (event) => {
      const base64String = event.target?.result as string
      if (base64String) {
        if (value === undefined) {
          setInternalValue(base64String)
        }
        onChange?.(base64String)
        toast.success("Photo uploaded successfully")
      }
    }
    reader.readAsDataURL(file)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFile(e.target.files[0])
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0])
    }
  }

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (value === undefined) {
      setInternalValue("")
    }
    onChange?.("")
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
    toast.info("Photo removed")
  }

  const triggerUpload = () => {
    fileInputRef.current?.click()
  }

  const getAspectClass = () => {
    switch (aspectRatio) {
      case "video":
        return "aspect-video w-full"
      case "square":
        return "aspect-square w-full max-w-[200px]"
      case "rectangle":
      default:
        return "aspect-[4/3] w-full max-w-[320px]"
    }
  }

  return (
    <div className={cn("w-full", className)}>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />

      {internalValue ? (
        <div
          className={cn(
            "relative group border overflow-hidden bg-muted/20 dark:bg-muted/5",
            getAspectClass()
          )}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={internalValue}
            alt="Upload Preview"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity group-hover:opacity-100 flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={triggerUpload}
              className="flex items-center gap-1.5 bg-background px-3 py-1.5 text-xs font-medium hover:bg-accent transition-colors border shadow-xs"
            >
              <UploadSimpleIcon className="size-3.5" />
              Change
            </button>
            <button
              type="button"
              onClick={handleClear}
              className="flex items-center gap-1.5 bg-destructive px-3 py-1.5 text-xs font-medium hover:bg-destructive/90 transition-colors shadow-xs"
            >
              <TrashIcon className="size-3.5" />
              Remove
            </button>
          </div>
        </div>
      ) : (
        <div
          onClick={triggerUpload}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={cn(
            "flex flex-col items-center justify-center border border-dashed text-center cursor-pointer transition-all duration-200 select-none p-6",
            getAspectClass(),
            isDragging
              ? "border-primary bg-primary/5 text-primary"
              : "border-border hover:border-primary/50 hover:bg-muted/20 dark:hover:bg-muted/5 text-muted-foreground"
          )}
        >
          <div className="flex flex-col items-center gap-2">
            <div className="flex size-10 items-center justify-center border bg-background text-muted-foreground group-hover:text-foreground">
              <ImageSquareIcon className="size-5" />
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xs font-medium text-foreground">Upload Photo</span>
              <span className="text-[10px]/normal text-muted-foreground max-w-[200px]">
                Drag & drop an image here, or click to select a file.
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

