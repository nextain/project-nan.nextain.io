Tab ini mengelola berbagai saluran pesan yang terhubung ke aplikasi (Discord, Slack, Google Chat, Telegram, dll.).

![Channels Tab](channels-tab.png)

## Melihat Daftar Saluran
Anda dapat melihat semua saluran yang terhubung dan status setiap akun secara sekilas.

- **Lencana Status**: Menampilkan status seperti `connected`, `disconnected`, atau `error`.
- **Segarkan**: Klik tombol segarkan di kanan atas untuk mendapatkan status terbaru.

## Login Saluran (Kode QR)
Anda dapat memulai login web untuk menghubungkan saluran tertentu.
Dengan memberitahu avatar AI di obrolan, "Start Discord web login," ia akan menampilkan kode QR atau masuk ke status menunggu autentikasi jika diperlukan.

## Integrasi Bot Discord

Masuk dengan akun Discord Anda di [naia.nextain.io](https://naia.nextain.io) untuk secara otomatis menautkan akun Anda. Setelah tertaut, Anda dapat mengobrol langsung dengan avatar AI di Discord.

### Cara Menggunakan
1. **Masuk dengan Discord** di naia.nextain.io
2. Klik tautan undangan bot di halaman **Pengaturan > Integrasi**
3. **Pilih server** untuk menambahkan bot → setujui izin
4. **@sebut bot** di server atau **mulai DM** untuk mengobrol
5. Kredit secara otomatis dipotong dari akun naia.nextain.io Anda

### Fitur
- **Deteksi Sebutan/DM**: AI merespons ketika Anda menyebut bot atau mengirim DM
- **Integrasi Kredit**: Kredit dari akun naia.nextain.io Anda digunakan secara otomatis
- **Panduan Pengguna yang Belum Terdaftar**: Pengguna tanpa akun tertaut menerima instruksi penyiapan
- **Pembatasan Tingkat**: Batas 10 pesan per menit untuk melindungi kredit Anda

## Integrasi Google Chat

Masuk dengan akun Google Anda di naia.nextain.io untuk mengobrol dengan avatar AI melalui Google Chat.

### Cara Menggunakan
1. **Masuk dengan Google** di naia.nextain.io
2. Administrator Google Workspace **mendaftarkan aplikasi obrolan Naia**
3. Tambahkan aplikasi di Google Chat dan mulai mengobrol
4. Kredit secara otomatis dipotong dari akun naia.nextain.io Anda

## Notifikasi Messenger (Webhook)
Naia OS mewarisi sistem saluran canggih OpenClaw.
Dengan memasukkan URL Webhook Slack, Discord, atau Google Chat Anda di menu **Pengaturan > Alat > Webhook** atau selama layar orientasi awal, avatar AI dapat mengirimi Anda pesan dengan hasil tugas penting.

> **Tip:** "Beri tahu saya di Discord saat pencadangan file ini selesai sepenuhnya!"

## Lanjutan: Membangun Bot Otonom 24/7
Dengan memanfaatkan alat perintah terminal (`execute_command`), Anda dapat mengubah avatar AI menjadi agen otonom 24/7 yang berada di Telegram atau Discord, tidak hanya di desktop Anda.

Perintahkan avatar AI di obrolan seperti ini:
> "Token bot Telegram saya adalah `1234:ABC...`. Jalankan `openclaw channels add --channel telegram --token 1234:ABC...` untuk memulai bot Telegram saya."

Sekarang, meskipun Anda menutup aplikasi desktop, Anda dapat mengobrol dengan avatar AI dan menetapkan tugas kapan saja melalui Telegram di ponsel Anda via OpenClaw Gateway yang berjalan di latar belakang.