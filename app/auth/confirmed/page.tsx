import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

export const metadata = { title: "Email Terkonfirmasi" };

export default function EmailConfirmedPage() {
  return (
    <section className="mx-auto flex min-h-[70vh] max-w-sm flex-col items-center justify-center gap-6 px-4 py-16 text-center sm:px-6">
      <div className="flex h-16 w-16 items-center justify-center rounded-full border border-secondary/20 bg-secondary/10">
        <CheckCircle2 className="h-9 w-9 text-secondary" strokeWidth={1.75} />
      </div>

      <div className="flex flex-col gap-2">
        <h1 className="font-display text-2xl font-semibold">
          Email Berhasil Dikonfirmasi
        </h1>
        <p className="text-sm text-text-muted">
          Akun kamu sudah aktif. Silakan masuk untuk mulai top up & pantau
          transaksimu di Veltapedia.
        </p>
      </div>

      <Link
        href="/auth/login"
        className="w-full rounded-full bg-gradient-to-r from-primary to-secondary px-5 py-2.5 text-sm font-medium text-bg transition-opacity hover:opacity-90"
      >
        Masuk ke Akun
      </Link>

      <Link
        href="/"
        className="text-sm text-text-muted hover:text-text-primary hover:underline"
      >
        Kembali ke beranda
      </Link>
    </section>
  );
}
