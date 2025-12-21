# Quick Start Guide - Laravel Admin Dashboard

Panduan cepat untuk menjalankan dashboard admin Laravel TailAdmin dalam bahasa Indonesia.

## Persyaratan Sistem

- PHP 8.2 atau lebih tinggi
- Composer
- Node.js 18.x atau lebih baru
- Database (SQLite, MySQL, atau PostgreSQL)

## Instalasi Cepat

### 1. Masuk ke direktori Laravel
```bash
cd laravel-admin
```

### 2. Install Dependencies PHP
```bash
composer install
```

### 3. Install Dependencies Node.js
```bash
npm install
```

### 4. Konfigurasi Environment
File `.env` sudah dikonfigurasi secara default dengan SQLite. Jika ingin menggunakan MySQL, edit file `.env`:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=laravel_admin
DB_USERNAME=root
DB_PASSWORD=
```

### 5. Jalankan Migrasi Database
```bash
php artisan migrate
```

### 6. Build Assets (CSS & JavaScript)
```bash
npm run build
```

### 7. Jalankan Server Development
```bash
php artisan serve
```

Aplikasi akan berjalan di: `http://localhost:8000`

## Membuat User Pertama

### Opsi 1: Via Tinker
```bash
php artisan tinker
```

Kemudian jalankan:
```php
User::create([
    'name' => 'Admin',
    'email' => 'admin@example.com',
    'password' => Hash::make('password'),
    'email_verified_at' => now(),
]);
```

### Opsi 2: Via Registrasi Web
Kunjungi: `http://localhost:8000/register`

### User Demo yang Sudah Dibuat
- **Email:** admin@example.com
- **Password:** password123

## Development Mode

Untuk development dengan hot reload:

```bash
# Terminal 1 - Laravel server
php artisan serve

# Terminal 2 - Vite dev server untuk hot reload
npm run dev
```

## Fitur yang Tersedia

✅ **Dashboard** - Halaman utama dengan statistik dan grafik
✅ **Tables** - Tabel data dengan aksi
✅ **Charts** - Grafik bar, line, dan area
✅ **UI Elements** - Komponen UI (buttons, alerts, forms)
✅ **Calendar** - Kalender interaktif dengan FullCalendar
✅ **Profile** - Manajemen profil user
✅ **Authentication** - Login, register, forgot password
✅ **Dark Mode** - Mode gelap/terang

## Struktur Halaman

- `/dashboard` - Halaman dashboard utama
- `/tables` - Halaman tabel data
- `/charts` - Halaman grafik
- `/ui-elements` - Halaman komponen UI
- `/calendar` - Halaman kalender
- `/profile` - Halaman profil user

## Troubleshooting

### Error: "No application encryption key has been specified"
```bash
php artisan key:generate
```

### Error: Permission denied (storage/logs)
```bash
chmod -R 775 storage bootstrap/cache
```

### Error: npm packages not found
```bash
rm -rf node_modules package-lock.json
npm install
```

### Error: Vite manifest not found
```bash
npm run build
```

## Customisasi

### Mengubah Warna Tema
Edit file `resources/css/app.css`:
```css
@layer base {
  :root {
    --primary: 59 130 246; /* Blue */
    --success: 16 185 129; /* Green */
  }
}
```

### Menambah Halaman Baru
1. Buat view di `resources/views/nama-halaman.blade.php`
2. Tambah route di `routes/web.php`
3. Tambah method di controller jika perlu
4. Tambah link di sidebar (`resources/views/layouts/admin.blade.php`)

## Production Deployment

### 1. Optimize Konfigurasi
```bash
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

### 2. Build Assets Production
```bash
npm run build
```

### 3. Set Environment Production
Edit `.env`:
```env
APP_ENV=production
APP_DEBUG=false
```

### 4. Optimize Autoloader
```bash
composer install --optimize-autoloader --no-dev
```

## Teknologi yang Digunakan

- **Backend:** Laravel 11.x
- **Frontend:** Blade Templates
- **Styling:** Tailwind CSS V4
- **Build Tool:** Vite
- **Authentication:** Laravel Breeze
- **Charts:** ApexCharts
- **Calendar:** FullCalendar
- **Dark Mode:** Alpine.js

## Bantuan & Support

Untuk dokumentasi lengkap, lihat:
- [README Laravel](README-LARAVEL.md)
- [README Utama](../README.md)
- [Dokumentasi Laravel](https://laravel.com/docs)
- [Dokumentasi Tailwind CSS](https://tailwindcss.com/docs)

## Lisensi

MIT License - Bebas digunakan untuk proyek pribadi dan komersial.
