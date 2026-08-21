import { Zap, ShieldCheck, Wallet, RotateCcwIcon } from "lucide-react";

const VALUE_PROPS = [
  {
    icon: Zap,
    title: "Proses Instan",
    description:
      "Order diteruskan otomatis begitu pembayaran terverifikasi.",
  },
  {
    icon: ShieldCheck,
    title: "Pembayaran Aman",
    description:
      "Transaksi lewat payment gateway resmi, bukan transfer manual.",
  },
  {
    icon: Wallet,
    title: "Harga Transparan",
    description:
      "Nggak ada biaya tersembunyi — harga yang tampil, itu yang dibayar.",
  },
  {
    icon: RotateCcwIcon,
    title: "Riwayat Jelas",
    description:
      "Semua transaksi tercatat, bisa dicek statusnya kapan saja.",
  },
];

export function ValueProps() {
  return (
    <section id="keunggulan" className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <h2 className="font-display text-xl font-semibold sm:text-2xl">
        Kenapa Veltapedia?
      </h2>
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {VALUE_PROPS.map((item, index) => (
          <div
            key={item.title}
            style={{ animationDelay: `${index * 60}ms` }}
            className="animate-fade-up rounded-2xl border border-white/5 bg-surface p-5"
          >
            <item.icon className="h-6 w-6 text-primary" />
            <h3 className="mt-3 text-sm font-medium text-text-primary">
              {item.title}
            </h3>
            <p className="mt-1 text-sm text-text-muted">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
