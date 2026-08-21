import Link from "next/link";
import { register } from "@/lib/auth/actions";

export const metadata = { title: "Daftar" };

export default function RegisterPage({
  searchParams,
}: {
  searchParams: { error?: string };
}) {
  return (
    <section className="mx-auto flex max-w-sm flex-col gap-6 px-4 py-16 sm:px-6">
      <div>
        <h1 className="font-display text-2xl font-semibold">Daftar</h1>
        <p className="mt-1 text-sm text-text-muted">
          Buat akun buat mulai top up & pantau transaksimu.
        </p>
      </div>

      {searchParams.error ? (
        <p className="rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3 text-sm text-red-400">
          {searchParams.error}
        </p>
      ) : null}

      <form action={register} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="full_name" className="text-sm text-text-muted">
            Nama Lengkap
          </label>
          <input
            id="full_name"
            name="full_name"
            type="text"
            required
            className="rounded-xl border border-white/10 bg-surface px-4 py-2.5 text-sm text-text-primary outline-none focus:border-primary/40"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-sm text-text-muted">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="rounded-xl border border-white/10 bg-surface px-4 py-2.5 text-sm text-text-primary outline-none focus:border-primary/40"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="password" className="text-sm text-text-muted">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            minLength={6}
            className="rounded-xl border border-white/10 bg-surface px-4 py-2.5 text-sm text-text-primary outline-none focus:border-primary/40"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="confirm_password" className="text-sm text-text-muted">
            Konfirmasi Password
          </label>
          <input
            id="confirm_password"
            name="confirm_password"
            type="password"
            required
            minLength={6}
            className="rounded-xl border border-white/10 bg-surface px-4 py-2.5 text-sm text-text-primary outline-none focus:border-primary/40"
          />
        </div>

        <button
          type="submit"
          className="mt-2 rounded-full bg-gradient-to-r from-primary to-secondary px-5 py-2.5 text-sm font-medium text-bg transition-opacity hover:opacity-90"
        >
          Daftar
        </button>
      </form>

      <p className="text-center text-sm text-text-muted">
        Sudah punya akun?{" "}
        <Link href="/auth/login" className="text-primary hover:underline">
          Masuk
        </Link>
      </p>
    </section>
  );
}
