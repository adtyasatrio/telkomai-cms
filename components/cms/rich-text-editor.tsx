"use client"

import { useCallback } from "react"
import LinkExtension from "@tiptap/extension-link"
import Placeholder from "@tiptap/extension-placeholder"
import { EditorContent, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import {
  ArrowCounterClockwiseIcon,
  ArrowClockwiseIcon,
  LinkIcon,
  ListBulletsIcon,
  ListNumbersIcon,
  ParagraphIcon,
  QuotesIcon,
  TextBIcon,
  TextHOneIcon,
  TextHThreeIcon,
  TextHTwoIcon,
  TextItalicIcon,
} from "@phosphor-icons/react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

type RichTextEditorProps = {
  value?: string
  placeholder?: string
  minHeight?: string
  onChange?: (html: string) => void
}

export function RichTextEditor({
  value = "",
  placeholder = "Write content...",
  minHeight = "min-h-64",
  onChange,
}: RichTextEditorProps) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      LinkExtension.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "underline underline-offset-4",
        },
      }),
      Placeholder.configure({
        placeholder,
      }),
    ],
    content: value,
    editorProps: {
      attributes: {
        class: cn(
          "rich-text-editor-content p-4 text-sm leading-relaxed outline-none",
          minHeight
        ),
      },
    },
    onUpdate: ({ editor }) => onChange?.(editor.getHTML()),
  })

  const setLink = useCallback(() => {
    if (!editor) {
      return
    }

    const previousUrl = editor.getAttributes("link").href as string | undefined
    const url = window.prompt("Link URL", previousUrl ?? "https://")

    if (url === null) {
      return
    }

    if (!url) {
      editor.chain().focus().extendMarkRange("link").unsetLink().run()
      return
    }

    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run()
  }, [editor])

  if (!editor) {
    return (
      <div className="rounded-none border bg-background">
        <div className="h-10 border-b bg-muted/30" />
        <div className={cn("p-4 text-sm text-muted-foreground", minHeight)}>
          Loading editor...
        </div>
      </div>
    )
  }

  return (
    <div className="overflow-hidden rounded-none border bg-background">
      <div className="flex flex-wrap items-center gap-1 border-b bg-muted/30 p-2">
        <ToolbarButton
          label="Paragraph"
          active={editor.isActive("paragraph")}
          onClick={() => editor.chain().focus().setParagraph().run()}
        >
          <ParagraphIcon data-icon="inline-start" />
        </ToolbarButton>
        <ToolbarButton
          label="H1"
          active={editor.isActive("heading", { level: 1 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        >
          <TextHOneIcon data-icon="inline-start" />
        </ToolbarButton>
        <ToolbarButton
          label="H2"
          active={editor.isActive("heading", { level: 2 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        >
          <TextHTwoIcon data-icon="inline-start" />
        </ToolbarButton>
        <ToolbarButton
          label="H3"
          active={editor.isActive("heading", { level: 3 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        >
          <TextHThreeIcon data-icon="inline-start" />
        </ToolbarButton>
        <Separator orientation="vertical" className="mx-1 h-7" />
        <ToolbarButton
          label="Bold"
          active={editor.isActive("bold")}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <TextBIcon data-icon="inline-start" />
        </ToolbarButton>
        <ToolbarButton
          label="Italic"
          active={editor.isActive("italic")}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <TextItalicIcon data-icon="inline-start" />
        </ToolbarButton>
        <ToolbarButton label="Link" active={editor.isActive("link")} onClick={setLink}>
          <LinkIcon data-icon="inline-start" />
        </ToolbarButton>
        <Separator orientation="vertical" className="mx-1 h-7" />
        <ToolbarButton
          label="Bullet list"
          active={editor.isActive("bulletList")}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          <ListBulletsIcon data-icon="inline-start" />
        </ToolbarButton>
        <ToolbarButton
          label="Numbered list"
          active={editor.isActive("orderedList")}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          <ListNumbersIcon data-icon="inline-start" />
        </ToolbarButton>
        <ToolbarButton
          label="Quote"
          active={editor.isActive("blockquote")}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
        >
          <QuotesIcon data-icon="inline-start" />
        </ToolbarButton>
        <Separator orientation="vertical" className="mx-1 h-7" />
        <ToolbarButton label="Undo" onClick={() => editor.chain().focus().undo().run()}>
          <ArrowCounterClockwiseIcon data-icon="inline-start" />
        </ToolbarButton>
        <ToolbarButton label="Redo" onClick={() => editor.chain().focus().redo().run()}>
          <ArrowClockwiseIcon data-icon="inline-start" />
        </ToolbarButton>
      </div>
      <EditorContent editor={editor} />
    </div>
  )
}

function ToolbarButton({
  active,
  children,
  label,
  onClick,
}: {
  active?: boolean
  children: React.ReactNode
  label: string
  onClick: () => void
}) {
  return (
    <Button
      type="button"
      variant={active ? "secondary" : "ghost"}
      size="sm"
      aria-label={label}
      title={label}
      onClick={onClick}
    >
      {children}
    </Button>
  )
}
