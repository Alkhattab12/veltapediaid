"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import type { User } from "@supabase/supabase-js";
import { cn } from "@/lib/utils/cn";
import { logout } from "@/lib/auth/actions";

const NAV_LINKS = [
  { href: "/products", label: "Produk" },
  { href: "/orders", label: "Riwayat" },
  { href: "/profile", label: "Profil" },
];

export function Navbar({ user }: { user: User | null }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-bg/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          className="font-display text-lg font-semibold tracking-tight"
        >
          Velta<span className="text-primary">pedia</span>
        </Link>

        <nav className="hidden items-center gap-8 sm:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group relative text-sm text-text-muted transition-colors hover:text-text-primary"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-gradient-to-r from-primary to-secondary transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 sm:flex">
          {user ? (
            <>
              <Link
                href="/profile"
                className="max-w-[10rem] truncate text-sm text-text-muted transition-colors hover:text-text-primary"
              >
                {user.email}
              </Link>
              <form action={logout}>
                <button
                  type="submit"
                  className="rounded-full border border-white/10 px-5 py-2 text-sm text-text-muted transition-colors hover:border-primary/40 hover:text-text-primary"
                >
                  Keluar
                </button>
              </form>
            </>
          ) : (
            <Link
              href="/auth/login"
              className="rounded-full bg-gradient-to-r from-primary to-secondary px-5 py-2 text-sm font-medium text-bg transition-opacity hover:opacity-90"
            >
              Masuk
            </Link>
          )}
        </div>

        <button
          type="button"
          aria-label={open ? "Tutup menu" : "Buka menu"}
          aria-expanded={open}
          onClick={() => setOpen((prev) => !prev)}
          className="rounded-md p-2 text-text-primary sm:hidden"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <div
        className={cn(
          "overflow-hidden border-b border-white/5 bg-bg transition-[max-height] duration-300 ease-in-out sm:hidden",
          open ? "max-h-64" : "max-h-0"
        )}
      >
        <nav className="flex flex-col gap-1 px-4 pb-4">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-md px-2 py-3 text-sm text-text-muted hover:bg-white/5 hover:text-text-primary"
            >
              {link.label}
            </Link>
          ))}
          {user ? (
            <>
              <Link
                href="/profile"
                onClick={() => setOpen(false)}
                className="truncate rounded-md px-2 py-3 text-sm text-text-muted hover:bg-white/5 hover:text-text-primary"
              >
                {user.email}
              </Link>
              <form action={logout}>
                <button
                  type="submit"
                  className="mt-2 w-full rounded-full border border-white/10 px-5 py-2 text-center text-sm text-text-muted"
                >
                  Keluar
                </button>
              </form>
            </>
          ) : (
            <Link
              href="/auth/login"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-gradient-to-r from-primary to-secondary px-5 py-2 text-center text-sm font-medium text-bg"
            >
              Masuk
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
