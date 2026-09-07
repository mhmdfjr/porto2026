"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TiptapImage from "@tiptap/extension-image";
import TiptapLink from "@tiptap/extension-link";

type Props = {
  initialJson?: string;
  onChange: (json: string, html: string) => void;
};

function parseInitial(initialJson?: string) {
  if (!initialJson) return undefined;
  try {
    const parsed: unknown = JSON.parse(initialJson);
    if (parsed && typeof parsed === "object") return parsed;
    return undefined;
  } catch {
    return undefined;
  }
}

function ToolbarButton({
  active,
  onClick,
  label,
  title,
}: {
  active?: boolean;
  onClick: () => void;
  label: string;
  title: string;
}) {
  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      className={`rounded px-2 py-1 text-sm ${
        active ? "bg-white text-black" : "bg-neutral-800 hover:bg-neutral-700"
      }`}
    >
      {label}
    </button>
  );
}

export function PostEditor({ initialJson, onChange }: Props) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      TiptapImage,
      TiptapLink.configure({ openOnClick: false }),
    ],
    content: parseInitial(initialJson) ?? "<p></p>",
    editorProps: {
      attributes: {
        class: "min-h-64 p-3 text-white outline-none prose-invert",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(JSON.stringify(editor.getJSON()), editor.getHTML());
    },
  });

  if (!editor) {
    return (
      <div className="rounded bg-neutral-800 p-3 text-sm text-neutral-500">
        Memuat editor...
      </div>
    );
  }

  function setLink() {
    const previous = editor?.getAttributes("link").href as string | undefined;
    const url = window.prompt("URL link:", previous ?? "https://");
    if (url === null) return;
    if (url === "") {
      editor?.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor
      ?.chain()
      .focus()
      .extendMarkRange("link")
      .setLink({ href: url })
      .run();
  }

  function addImage() {
    const url = window.prompt("URL gambar:");
    if (url) editor?.chain().focus().setImage({ src: url }).run();
  }

  return (
    <div className="overflow-hidden rounded bg-neutral-800">
      <div className="flex flex-wrap gap-1 border-b border-neutral-700 p-2">
        <ToolbarButton
          label="B"
          title="Bold"
          active={editor.isActive("bold")}
          onClick={() => editor.chain().focus().toggleBold().run()}
        />
        <ToolbarButton
          label="I"
          title="Italic"
          active={editor.isActive("italic")}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        />
        <ToolbarButton
          label="H2"
          title="Heading 2"
          active={editor.isActive("heading", { level: 2 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        />
        <ToolbarButton
          label="H3"
          title="Heading 3"
          active={editor.isActive("heading", { level: 3 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        />
        <ToolbarButton
          label="• List"
          title="Bullet list"
          active={editor.isActive("bulletList")}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        />
        <ToolbarButton
          label="1. List"
          title="Ordered list"
          active={editor.isActive("orderedList")}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        />
        <ToolbarButton
          label="Quote"
          title="Blockquote"
          active={editor.isActive("blockquote")}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
        />
        <ToolbarButton
          label="Code"
          title="Code block"
          active={editor.isActive("codeBlock")}
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        />
        <ToolbarButton label="Link" title="Tambah link" onClick={setLink} />
        <ToolbarButton label="Gambar" title="Sisip gambar via URL" onClick={addImage} />
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}
