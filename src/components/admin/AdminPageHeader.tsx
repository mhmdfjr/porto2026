import Link from "next/link";

type Props = {
  title: string;
  createHref: string;
  createLabel: string;
};

/** Shared header for admin list pages: title + create button. */
export function AdminPageHeader({ title, createHref, createLabel }: Props) {
  return (
    <div className="mb-6 flex items-center justify-between">
      <h1 className="text-2xl font-bold">{title}</h1>
      <Link
        href={createHref}
        className="rounded bg-white px-4 py-2 font-semibold text-black"
      >
        {createLabel}
      </Link>
    </div>
  );
}
