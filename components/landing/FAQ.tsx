"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils/cn";

const FAQ_ITEMS = [
  {
    question: "Berapa lama proses top up?",
    answer:
      "Setelah pembayaran terverifikasi, order diteruskan otomatis ke sistem game dalam hitungan menit.",
  },
  {
    question: "Metode pembayaran apa saja yang tersedia?",
    answer: "QRIS, virtual account, dan e-wallet lewat payment gateway resmi.",
  },
  {
    question: "Bagaimana jika transaksi gagal setelah bayar?",
    answer:
      "Status transaksi bisa dicek di halaman riwayat. Jika ada kendala fulfillment, tim kami akan menindaklanjuti secara manual.",
  },
  {
    question: "Apakah harus login untuk order?",
    answer:
      "Ya, login diperlukan supaya kamu bisa melacak riwayat dan status pesananmu.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <h2 className="font-display text-xl font-semibold sm:text-2xl">FAQ</h2>
      <div className="mt-6 flex flex-col gap-2">
        {FAQ_ITEMS.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={item.question}
              className="overflow-hidden rounded-xl border border-white/5 bg-surface"
            >
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-medium text-text-primary"
              >
                {item.question}
                <ChevronDown
                  className={cn(
                    "h-4 w-4 shrink-0 text-text-muted transition-transform",
                    isOpen && "rotate-180"
                  )}
                />
              </button>
              <div
                className={cn(
                  "grid transition-[grid-template-rows] duration-300 ease-in-out",
                  isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                )}
              >
                <div className="overflow-hidden">
                  <p className="px-5 pb-4 text-sm text-text-muted">
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
