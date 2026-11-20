# Subscriber Usage

Aplikasi untuk mencatat dan melihat pemakaian subscriber (menit telepon, jumlah SMS, dan data dalam MB).

- **Backend:** Laravel 13 (PHP 8.3+), REST API
- **Frontend:** React 19 + Vite
- **Database:** MySQL 8

## Struktur folder

```
subscriber_usage/
├── backend/    # Q1 API + Q2 command snapshot & cleanup
├── frontend/   # Q1 tampilan form dan tabel
├── sql/        # Q3 schema.sql & queries.sql
└── q4/         # Q4 perbaikan getTotalUsageMB + test + penjelasan
```

## Kebutuhan

- PHP 8.3+ dan Composer
- MySQL 8
- Node.js 20.19+ atau 22.12+, dan npm

## Setup backend

```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
```

Atur koneksi database di `backend/.env`:

```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=subscriber_usage
DB_USERNAME=root
DB_PASSWORD=
```

Buat database, lalu jalankan migration dan seeder (subscriber SUB01-SUB06 dan 8 data usage dari soal):

```bash
mysql -u root -p -e "CREATE DATABASE IF NOT EXISTS subscriber_usage"
php artisan migrate --seed
php artisan serve
```

API berjalan di `http://127.0.0.1:8000/api`.

## Setup frontend

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

Buka `http://localhost:5173`. Kalau backend berjalan di port lain, ubah `VITE_API_URL` di `frontend/.env`.

## API

Base URL: `http://127.0.0.1:8000/api`

Request dan response memakai JSON. Nama field di API memakai camelCase, sedangkan kolom di database memakai snake_case.

| Method | Endpoint | Keterangan |
|---|---|---|
| GET | `/subscribers` | Daftar subscriber |
| POST | `/subscribers` | Tambah subscriber baru (ID dibuat otomatis) |
| GET | `/usages` | Daftar usage, yang terbaru di atas. Filter opsional: `?subscriberId=SUB01` |
| POST | `/usages` | Catat usage baru |
| GET | `/usages/{id}` | Detail satu usage |

### POST /usages

```bash
curl -X POST http://127.0.0.1:8000/api/usages \
  -H "Content-Type: application/json" \
  -d '{"subscriberId":"SUB01","callMinutes":15,"smsCount":3,"dataUsageMB":250}'
```

| Field | Aturan |
|---|---|
| `subscriberId` | wajib, harus ada di tabel subscribers |
| `callMinutes`, `smsCount`, `dataUsageMB` | wajib, bilangan bulat >= 0 |
| `timestamp` | opsional, contoh `2025-08-01 08:00:00`. Kalau kosong, memakai waktu sekarang (WIB) |

Response `201`:

```json
{
  "message": "Usage recorded",
  "data": {
    "id": 9,
    "subscriberId": "SUB01",
    "subscriberName": "Amir",
    "callMinutes": 15,
    "smsCount": 3,
    "dataUsageMB": 250,
    "timestamp": "2026-11-20 10:00:00"
  }
}
```

`GET /usages` dan `GET /usages/{id}` mengembalikan data dengan format yang sama di dalam `data`.

### POST /subscribers

```bash
curl -X POST http://127.0.0.1:8000/api/subscribers \
  -H "Content-Type: application/json" \
  -d '{"name":"Fajar","plan":"Basic","activationDate":"2024-01-24"}'
```

| Field | Aturan |
|---|---|
| `name` | wajib, maksimal 100 karakter |
| `plan` | wajib, salah satu dari `Basic`, `Premium`, `Family` |
| `activationDate` | wajib, format `YYYY-MM-DD` |

Response `201`:

```json
{
  "message": "Subscriber created",
  "data": { "id": "SUB07", "name": "Fajar", "plan": "Basic", "activationDate": "2024-01-24" }
}
```

ID dibuat otomatis dari nomor ID terbesar + 1 (`SUB06` menjadi `SUB07`).

### Error

`422` kalau validasi gagal. Detail per field ada di `errors`:

```json
{
  "message": "The call minutes field must be an integer.",
  "errors": { "callMinutes": ["The call minutes field must be an integer."] }
}
```

`404` kalau usage tidak ditemukan:

```json
{ "message": "Usage not found" }
```

## Automation (Q2)

Semua command dijalankan dari folder `backend`.

### Snapshot CSV

```bash
php artisan usage:snapshot
```

File disimpan di `backend/storage/app/snapshots/` dengan format nama:

```
usage_snapshot_YYYYMMDD_HHmm.csv
```

Contoh: `usage_snapshot_20261120_0800.csv` adalah snapshot tanggal 20 November 2026 jam 08:00 WIB. Waktu di nama file selalu WIB, jadi kalau diurutkan berdasarkan nama, file juga urut sesuai waktu.

Kolom CSV: `subscriberId, subscriberName, callMinutes, smsCount, dataUsageMB, timestamp`.

### Hapus CSV lama

```bash
php artisan usage:cleanup-snapshots              # hapus file yang lebih dari 30 hari
php artisan usage:cleanup-snapshots --dry-run    # hanya tampilkan file yang akan dihapus
php artisan usage:cleanup-snapshots --days=7     # ubah batas hari
```

Umur file dihitung dari tanggal di nama file, bukan dari tanggal modifikasi file. File lain di folder itu tidak disentuh.

### Jadwal

Jadwal diatur di `backend/routes/console.php` dengan timezone `Asia/Jakarta`:

| Command | Jadwal |
|---|---|
| `usage:snapshot` | setiap hari jam 08:00, 12:00, dan 15:00 WIB |
| `usage:cleanup-snapshots` | setiap hari jam 01:00 WIB |

Cek daftar jadwal:

```bash
php artisan schedule:list
```

Untuk development, jalankan scheduler di terminal dan biarkan terbuka:

```bash
php artisan schedule:work
```

Untuk server, cukup tambahkan satu baris ini ke crontab (`crontab -e`):

```
* * * * * cd /path/ke/subscriber_usage/backend && php artisan schedule:run >> /dev/null 2>&1
```

Cron menjalankan Laravel setiap menit, lalu Laravel yang menentukan command mana yang sudah waktunya jalan. Output command dicatat di `backend/storage/logs/schedule.log`.

Catatan macOS: kalau project ada di folder Desktop atau Documents, `cron` butuh izin Full Disk Access (System Settings > Privacy & Security > Full Disk Access, lalu tambahkan `/usr/sbin/cron`).

## SQL (Q3)

- `sql/schema.sql`: membuat tabel `subscribers` dan `usages` beserta data contoh dari soal.
- `sql/queries.sql`: jawaban 5 soal Q3.

```bash
mysql -u root -p < sql/schema.sql
mysql -u root -p < sql/queries.sql
```

> `schema.sql` memakai database yang sama dengan Laravel (`subscriber_usage`) dan akan menghapus lalu membuat ulang tabelnya. Setelah selesai mencoba SQL, kembalikan data aplikasi dengan `php artisan migrate:fresh --seed` di folder `backend`.

Hasil yang diharapkan:

| No | Hasil |
|---|---|
| 1-2 | Fajar (`SUB07`) masuk sebagai Basic, lalu berubah menjadi Premium |
| 3 | Total data Premium `16800` MB (Sari 11800, Rian 5000, Fajar 0) |
| 4 | Sari 11800, Dewi 9000, Rian 5000 |
| 5 | Budi (20.00) dan Nia (25.00) |

## Q4

Penjelasan bug, perbaikan, dan cara mencegahnya ada di [q4/README.md](q4/README.md).

```bash
node --test q4/
```

## Catatan

- Nama tabel `usages`, bukan `usage`, karena `USAGE` adalah reserved word di MySQL.
- Timezone aplikasi `Asia/Jakarta`, jadi semua waktu di API dan CSV dalam WIB.
- ID subscriber dibuat di level aplikasi (model `Subscriber`). Untuk test ini sudah cukup, tapi kalau ada banyak request bersamaan, ID bisa bentrok.
- API belum memakai autentikasi karena tidak diminta di soal.
- Untuk production, set `APP_DEBUG=false` di `.env`.
