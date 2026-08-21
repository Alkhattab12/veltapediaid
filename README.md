# Veltapedia — Phase 1 + Phase 2 (Landing Page)

## Isi Phase 1 (Foundation)

- Next.js App Router + TypeScript
- Tailwind dengan token warna/font khusus (bukan default)
- Navbar responsif (drawer di mobile) + Footer
- Supabase client (browser, server, middleware refresh session)
- Struktur env var lengkap (Supabase, Midtrans, Kiosdiamond)

## Isi Phase 2 — bagian 1: Landing Page

- Hero + quick-pick kategori
- Grid kategori produk
- Produk populer & produk terbaru (reusable component)
- Promo banner
- Keunggulan layanan (4 value prop)
- FAQ accordion

**Penting:** data produk masih MOCK (`lib/products/mock-data.ts`), belum
dari Supabase — tabel `products` baru dibuat di Phase 3. Tombol
"Lihat Semua Produk" dan "Masuk" akan 404 dulu karena halaman
`/products` dan `/auth/login` belum dibuat (menyusul di bagian 2 & 3
Phase 2).

## 1. Push ke GitHub (dari HP, tanpa PC)

1. Buka github.com → buat repository baru (mis. `veltapedia`), **jangan**
   centang "Add README" (biar tidak bentrok).
2. Di halaman repo kosong, pakai **Add file → Upload files**, lalu upload
   semua file/folder di zip ini (extract dulu pakai file manager HP —
   sebagian besar aplikasi file manager Android bisa extract zip
   langsung).
3. Commit ke branch `main`.

Kalau nanti butuh edit rutin dari terminal, install **Termux**, lalu
`git clone` repo dan pakai `git add / commit / push` seperti biasa.

## 2. Import ke Vercel

1. Buka vercel.com → **Add New → Project** → pilih repo `veltapedia`.
2. Framework preset otomatis terdeteksi **Next.js** — biarkan default.
3. Isi Environment Variables (lihat `.env.example`) — untuk Phase 1
   minimal isi 3 baris `NEXT_PUBLIC_SUPABASE_*` dan
   `SUPABASE_SERVICE_ROLE_KEY`. Baris Midtrans/Kiosdiamond boleh
   dikosongkan dulu, diisi nanti di Phase 5.
4. Deploy. Cek tab **Deployments → Build Logs** — itu jadi "test run"
   utama kita karena tidak ada Node.js lokal di HP.

## 3. Setup Supabase

1. Buat project baru di supabase.com.
2. Ambil `Project URL` dan `anon public key` dari **Project Settings →
   API** → isi ke `NEXT_PUBLIC_SUPABASE_URL` dan
   `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
3. Ambil `service_role key` (jangan pernah expose ke frontend) → isi ke
   `SUPABASE_SERVICE_ROLE_KEY` (hanya di Vercel env var, server-side).
4. Redeploy di Vercel setelah env var diisi.

## 4. Jalankan Database Schema (Phase 3)

1. Buka project Supabase kamu → menu **SQL Editor** (ikon `>_` di
   sidebar) → **New query**.
2. Buka file `supabase/schema.sql` dari zip ini, copy semua isinya.
3. Paste ke SQL Editor → tap **Run**.
4. Kalau sukses, cek di menu **Table Editor** — harus muncul 6 tabel:
   `profiles`, `categories`, `products`, `orders`, `order_items`,
   `payments`. Tabel `categories` & `products` sudah keisi data
   (4 kategori, 8 produk) dari seed.
5. Script ini aman dijalankan ulang kalau perlu (tabel pakai
   `if not exists`, policy/trigger di-drop dulu sebelum dibuat ulang).

**Untuk jadi admin:** setelah kamu daftar/login pertama kali (nanti di
bagian Auth Phase 2), buka **Table Editor → profiles**, cari baris
kamu, ubah kolom `role` dari `customer` ke `admin` manual lewat UI
Supabase.

## Uji Phase 1 + Landing Page (tanpa perlu run lokal)

Setelah deploy berhasil, buka URL Vercel-nya dan cek:

- [ ] Navbar sticky, drawer mobile buka/tutup mulus (sudah lolos ✅)
- [ ] Hero tampil, tombol "Lihat Semua Produk" & chip kategori kelihatan
      (klik-nya 404 dulu, itu wajar — halaman /products belum ada)
- [ ] Grid kategori (4 kartu) tampil dengan animasi fade-up saat scroll
      masuk viewport
- [ ] Section "Produk Populer" & "Produk Terbaru" tampil, masing-masing
      4 kartu produk dengan harga format Rupiah
- [ ] Promo banner tampil di antara dua section produk
- [ ] Section "Kenapa Veltapedia?" — klik "Kenapa Veltapedia?" di hero
      harus scroll smooth ke section ini
- [ ] FAQ — tap salah satu pertanyaan, jawaban expand/collapse dengan
      animasi, panah berputar 180°
- [ ] Tidak ada error merah di Vercel Build Logs

Kalau build gagal, error paling mungkin: env var Supabase belum diisi
(halaman tetap build sukses karena baru dipakai di Phase 3, tapi kalau
ada typo di kode akan kelihatan di build log — kirim log errornya ke
saya, saya bantu perbaiki tanpa rombak struktur yang sudah jalan).

## Uji halaman /products (grid pilih game)

- [ ] Klik "Lihat Semua Produk" di hero atau "Produk" di menu hamburger
      → masuk ke `/products`
- [ ] Muncul grid 3 kolom kartu game (Mobile Legends, Free Fire, Roblox,
      Genshin Impact) — datanya dari Supabase, bukan mock lagi
- [ ] Badge bulat kecil di antara gambar & nama game tampil rapi
- [ ] Klik salah satu kartu game → 404 dulu, itu wajar (halaman detail
      per game/SKU belum dibuat — itu langkah berikutnya)
- [ ] Kalau koneksi Supabase belum benar, harus muncul pesan error
      merah "Gagal memuat daftar game", bukan halaman putih kosong

## Uji halaman /products/[slug] (detail per game)

- [ ] Dari `/products`, tap salah satu kartu game (mis. Mobile Legends)
      → masuk `/products/mobile-legends`, bukan 404 lagi
- [ ] Muncul tombol "← Semua Game" di atas, nama game jadi judul
      halaman, dan grid kartu produk (86 Diamonds, 172 Diamonds, dst)
      dengan harga format Rupiah, terurut dari termurah
- [ ] Klik "← Semua Game" balik ke `/products`
- [ ] Coba akses game yang nggak ada, mis. `/products/game-ngasal` →
      harus muncul halaman 404 standar (bukan halaman kosong/error)
- [ ] Kartu produk masih display doang, belum bisa diklik buat beli —
      itu wajar, checkout baru Phase 4

## 5. Setup Auth (Phase 2 — Login/Register)

**WAJIB dicek dulu di Supabase, kalau tidak email konfirmasi bakal
ngelink ke `localhost` dan rusak:**

1. Buka Supabase project → **Authentication → URL Configuration**.
2. **Site URL** → ganti dari default `http://localhost:3000` jadi
   `https://veltapedia.id` (domain kamu).
3. **Redirect URLs** → tambahkan `https://veltapedia.id/**`.

**Soal konfirmasi email** — defaultnya Supabase mewajibkan user klik
link konfirmasi di email sebelum bisa login. Kalau mau simpel dulu
buat testing (skip email), bisa dimatikan di **Authentication →
Sign In / Providers → Email → matikan toggle "Confirm email"**. Tapi
untuk versi yang bakal dipakai user asli, lebih aman dibiarkan
menyala. Kode yang saya kirim sudah menangani dua-duanya (ada
route `/auth/confirm` buat proses link email kalau fiturnya nyala).

## Uji Auth (register, login, logout)

- [ ] `/auth/register` → isi form → submit → diarahkan ke
      `/auth/login` dengan pesan "Registrasi berhasil..."
- [ ] Kalau "Confirm email" nyala: cek email, klik link konfirmasi →
      harus diarahkan balik ke situs (bukan localhost, bukan 404)
- [ ] `/auth/login` → isi email/password yang baru didaftar → submit
      → balik ke halaman utama, dan Navbar berubah: bukan lagi
      tombol "Masuk", tapi muncul email kamu + tombol "Keluar"
- [ ] Coba login pakai password salah → balik ke `/auth/login` dengan
      pesan error dari Supabase (bukan halaman putih/crash)
- [ ] Tap "Keluar" → balik ke beranda, Navbar balik nampilin "Masuk"
- [ ] Buka Supabase → Table Editor → `profiles` → harus otomatis ada
      baris baru dengan `full_name` sesuai yang diisi pas daftar

## Selanjutnya

Halaman `/profile` (data akun, riwayat transaksi/top up — masih
kosong sampai fitur order dibuat).
