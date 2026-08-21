import Link from "next/link";

const FOOTER_LINKS = [
  { href: "/faq", label: "FAQ" },
  { href: "/terms", label: "Syarat & Ketentuan" },
  { href: "/privacy", label: "Kebijakan Privasi" },
];

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-bg">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-10 text-sm text-text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>
          © {new Date().getFullYear()} Veltapedia. Semua transaksi diproses
          aman & instan.
        </p>
        <nav className="flex gap-6">
          {FOOTER_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-text-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
