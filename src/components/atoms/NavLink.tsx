import Link from "next/link";

interface NavLinkProps {
  href: string;
  label: string;
  isActive?: boolean;
}

export const NavLink = ({ href, label, isActive }: NavLinkProps) => {
  return (
    <Link
      href={href}
      className={`font-gotham font-bold text-lg transition-colors duration-300 hover:text-red-600 ${
        isActive ? "text-brand-red" : "text-brand-red md:text-brand-red"
        /* Di mobile menu text hitam/putih, di desktop text merah sesuai gambar */
      }`}
    >
      {label}
    </Link>
  );
};
