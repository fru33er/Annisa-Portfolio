# Antislop Follow-up Report #001 (2026-11-23)

- **Audit rujukan:** `anti-slop/audit-001-2026-11-23.md`
- **Item disetujui untuk diperbaiki:** `#1`, `#2`, `#3`, `#4`, `#5`, `#6`, dan `#13` (semua HIGH + #13)
- **Item tidak disentuh (sesuai instruksi):** `#7`, `#8`, `#9`, `#10`, `#11`, `#12`, `#14`, `#15`

---

## Ringkasan Perbaikan per Nomor

1. **`#1` [R-02] Hapus seluruh em dash (`—`)** -> **FIXED**
   - Menghapus seluruh karakter `—` dari `index.html`, `src/data/content.ts`, serta komentar kode di `src/App.tsx` dan `src/styles/index.css`.
   - Verifikasi scan: `0` kemunculan `\u2014` di `index.html` dan seluruh folder `src/`.

2. **`#2` [R-25, R-34] Perbaiki kontras `--text-muted` di Dark & Light Mode** -> **FIXED**
   - Dark Mode (`src/styles/index.css`): `#8a747c` -> `#a8929a` (`6.90:1` di atas base, `6.52:1` di atas card, `5.73:1` di atas card+orb).
   - Light Mode (`src/styles/index.css`): `#876e76` -> `#6e565e` (`6.01:1` di atas base, `6.47:1` di atas card, `5.92:1` di atas card+orb).
   - Seluruh pasangan warna teks kini lolos WCAG AA `>= 4.5:1` di kedua tema.

3. **`#3` [R-03] Target sentuh minimal 44x44px** -> **FIXED**
   - `src/components/Navbar.tsx`: tombol toggle `ID`/`EN` (`min-h-[44px] min-w-[44px]`), toggle tema (`h-11 w-11`), tombol menu mobile (`h-11 w-11`), tautan navigasi & CTA (`min-h-[44px]`), serta item drawer mobile (`min-h-[44px]`).
   - `src/components/SectionSnapNav.tsx`: setiap anchor titik section ditingkatkan ke `h-11 w-11` (`44x44px`).
   - `src/App.tsx`: tombol/link aksi hero, kontak, dan pause latar memakai `min-h-[44px]`.

4. **`#4` [R-32, R-26] Fokus keyboard visible, `Escape` untuk menu mobile, dan skip link** -> **FIXED**
   - `src/styles/index.css`: menambahkan `:focus-visible` global (`outline: 2px solid var(--maroon-bright); outline-offset: 3px`, kontras `6.43:1` Dark / `8.29:1` Light).
   - `src/components/SectionSnapNav.tsx`: melepas `focus:outline-none` dan menampilkan label tooltip saat `group-focus-visible`.
   - `src/components/Navbar.tsx`: menambahkan skip link (`#main-content`) serta handler tombol `Escape` yang menutup drawer mobile dan mengembalikan fokus ke tombol pemicu (`menuButtonRef`).

5. **`#5` [R-39, R-26] Semantik navigasi, `cursor: pointer`, `aria-hidden`, dan kontrol pause animasi >5 detik** -> **FIXED**
   - `src/styles/index.css`: menambahkan aturan `cursor: pointer` / `cursor: not-allowed` pada `@layer base`; mematikan `.status-dot-pulse` dan `.glass-reveal-surface::after` di `@media (prefers-reduced-motion: reduce)`; menambahkan kelas `.aurora-paused`.
   - `src/components/Navbar.tsx` & `src/components/SectionSnapNav.tsx`: mengubah navigasi section dari `<button>` menjadi `<a href="#...">` lengkap dengan `aria-current="location"`.
   - `src/components/Navbar.tsx` & `src/App.tsx`: menambahkan `aria-hidden="true"` pada seluruh ikon dekoratif Lucide.
   - `src/App.tsx` & `src/data/content.ts`: menambahkan tombol kontrol jeda/putar animasi latar (`Jeda animasi latar` / `Pause background`) di footer dengan `aria-pressed`.

6. **`#6` [R-35] Bersihkan kode mati & catat status verifikasi** -> **FIXED**
   - Menghapus blok JSX nomor HP yang dikomentari di `src/App.tsx` dan properti tak terpakai `phoneDisplay`/`phoneHref` di `src/data/content.ts`.
   - Typecheck dan build (`tsc -b && vite build`) lolos tanpa error.
   - Verifikasi klik elemen interaktif dilakukan lewat inspeksi kode karena Chrome remote debugging (`DevToolsActivePort`) belum aktif di perangkat pengguna.

7. **`#13` [R-16, R-02] Hapus buzzword `effortless`, slogan AI, dan meta-copy footer** -> **FIXED**
   - `src/data/content.ts`:
     - `"effortless with clients"` -> `"warm with clients"`
     - `"Where business instinct meets data precision."` -> `"Commercial instinct backed by clean spreadsheets."`
     - `"Battle-tested across 9 national business & startup stages."` -> `"9 national business plan and startup competition finishes."`
     - Footer meta `"Bento Glassmorphism Portfolio · ID / EN · Dark & Light"` -> `"Client Relations · CRM · Business Operations"`

---

## Verifikasi Build & Kontrol (Evidence)

- **Build (`npm run build`):** `tsc -b && vite build` PASS (0 errors, 1598 modules).
- **Em dash scan:** `0` kemunculan `\u2014` di `index.html` dan `src/**`.
- **Contrast check (WCAG 2.x):** seluruh pasangan teks Dark & Light Mode >= `5.34:1` (PASS 4.5:1 normal text), focus ring `6.43:1` (Dark) & `8.29:1` (Light) (PASS 3:1 UI).
- **Verifikasi interaktif (inspeksi kode karena Chrome remote debugging tidak aktif):**
  - Skip link (`#main-content`) -> fokus lompat ke `<main id="main-content">`.
  - Brand & Nav links (`#hero`, `#experience`, `#skills`, `#awards`, `#contact`) & SectionSnapNav (`#hero`..`#contact`) -> real `<a href="#...">` dengan `scrollIntoView` smooth + `aria-current="location"`.
  - Language switcher (`ID` / `EN`) -> ubah `lang`, simpan `localStorage`, update `<html lang>` dan seluruh teks termasuk tombol `Pause background` / `Jeda animasi latar`.
  - Theme toggle -> ubah `data-theme="dark"|"light"`, simpan `localStorage`.
  - Mobile menu button -> buka/tutup `#mobile-nav-drawer`, tekan `Escape` -> tutup & kembalikan fokus ke tombol menu.
  - Tombol `Résumé↗` (Navbar desktop/mobile, Hero, Contact) -> buka `/CV-Annisa-Noviana.pdf` di tab baru (`target="_blank" rel="noopener noreferrer"`).
  - Tombol copy email di Hero -> salin `annisanv16@gmail.com` dan tampilkan toast status `role="status"`.
  - Link `mailto:` dan LinkedIn -> target nyata dengan `rel="noreferrer"`.
  - Tombol `Jeda animasi latar` / `Pause background` di footer -> toggle kelas `.aurora-paused` dengan `aria-pressed` untuk menjeda animasi aurora dan status pulse.
