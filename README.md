CandleCraft Academy

Cara menjalankan: buka index.html di browser (tanpa server, tanpa internet). Progress disimpan di LocalStorage browser dan tidak tersinkron antarperangkat; gunakan Settings untuk Export dan Import JSON.

Urutan skrip: config, curriculum, progress, chart-engine, quiz-engine, practice-engine, app, router.
Semua data chart adalah simulasi, bukan data pasar. Materi untuk pendidikan, bukan sinyal trading.

Fitur tambahan: tema terang dan efek suara opsional (Settings), zoom chart dengan tombol, Ctrl/Shift + roda mouse, atau cubit dua jari.

Deploy: situs ini statis (HTML, CSS, JavaScript tanpa backend). Unggah seluruh folder ke hosting statis apa pun (Netlify, Vercel, GitHub Pages, Cloudflare Pages) dengan index.html di root. Tidak ada build step dan tidak ada environment variable. Gunakan HTTPS agar LocalStorage dan fitur browser berjalan normal.

Cakupan: Level 0 sampai 8, 46 materi, 108 soal, Chart Lab, Backtest Lab, Progress Report, Achievements, Export/Import progress.

Akun dan database (Supabase)
1. Buat project di supabase.com. Buka SQL Editor, jalankan isi supabase/schema.sql (membuat tabel progress dengan Row Level Security: tiap pengguna hanya bisa membaca dan menulis barisnya sendiri).
2. Authentication > Providers: pastikan Email aktif. Authentication > URL Configuration: isi Site URL dengan alamat situs Anda dan tambahkan alamat yang sama di Redirect URLs (dipakai untuk konfirmasi email dan reset password).
3. Project Settings > API: salin Project URL dan anon (publishable) key ke js/supabase-config.js. Jangan pernah memakai service_role key di sisi klien.
4. Opsional: set REQUIRE_LOGIN:true agar semua halaman mewajibkan login. Default false: pengguna tamu tetap bisa belajar secara lokal.
5. Deploy folder ini ke hosting statis (HTTPS).

Cara kerja sinkronisasi: progress tetap ditulis ke LocalStorage lalu dikirim ke tabel progress (jeda 1,5 detik). Saat login pertama, progress lokal digabung dengan data akun (gabungan, bukan menimpa). Jika browser dipakai akun lain, data lokal akun sebelumnya tidak digabung. Keluar akan menghapus data lokal. Data dari server selalu divalidasi ulang sebelum dipakai.

Catatan keamanan: anon key memang publik dan aman selama RLS aktif. Progress dihitung di sisi klien, sehingga pengguna yang ahli dapat mengubah data miliknya sendiri; itu tidak memengaruhi pengguna lain. Aktifkan konfirmasi email dan batasi rate limit auth di dashboard Supabase untuk produksi.

Market Lab: halaman latihan membaca data pasar nyata (kripto lewat Binance Public Data, endpoint data-api.binance.vision). Mode Live memperbarui candle tiap 30 detik dan hanya memakai candle yang sudah tutup. Mode Replay membuka candle riwayat satu per satu tanpa look-ahead. Ini bukan sinyal trading. Perlu koneksi internet; jika Binance tidak dapat dijangkau, halaman menampilkan pesan dan tombol coba lagi.
