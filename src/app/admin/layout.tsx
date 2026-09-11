import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { logout } from "./actions";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const menu = [
    { href: "/admin", label: "Dashboard" },
    { href: "/admin/projects", label: "Projects" },
    { href: "/admin/posts", label: "Posts" },
    { href: "/admin/comments", label: "Comments" },
    { href: "/admin/works", label: "Works" },
    { href: "/admin/educations", label: "Educations" },
    { href: "/admin/skills", label: "Skills" },
    { href: "/admin/features", label: "Features" },
    { href: "/admin/organizations", label: "Organizations" },
    { href: "/admin/contacts", label: "Contacts" },
  ];

  return (
    <div className="flex min-h-screen bg-brand-black text-white">
      <aside className="w-60 border-r border-neutral-800 p-4">
        <p className="mb-6 text-sm text-neutral-400">{user.email}</p>
        <nav className="space-y-2">
          {menu.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block rounded px-3 py-2 hover:bg-neutral-800"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <form action={logout} className="mt-6">
          <button className="w-full rounded bg-red-500/10 px-3 py-2 text-left text-red-400 hover:bg-red-500/20">
            Logout
          </button>
        </form>
      </aside>
      <main className="flex-1 p-8">{children}</main>
      <Toaster theme="dark" position="top-right" richColors />
    </div>
  );
}
