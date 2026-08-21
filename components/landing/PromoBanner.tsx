export function PromoBanner() {
  return (
    <section className="mx-auto max-w-6xl px-4 sm:px-6">
      <div className="flex flex-col items-center justify-between gap-4 rounded-2xl border border-primary/20 bg-gradient-to-r from-primary/10 via-surface to-secondary/10 p-6 text-center sm:flex-row sm:text-left">
        <div>
          <p className="font-display text-lg font-semibold">
            Transaksi pertama? Prosesnya kami pantau sampai selesai.
          </p>
          <p className="mt-1 text-sm text-text-muted">
            Status pesanan bisa dicek real-time di halaman riwayat.
          </p>
        </div>
        <span className="shrink-0 rounded-full bg-secondary/10 px-4 py-2 font-mono text-xs uppercase tracking-widest text-secondary">
          Proses Otomatis
        </span>
      </div>
    </section>
  );
}
