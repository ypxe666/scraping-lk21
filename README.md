# Dokumentasi API Scraping LK21 & NontonDrakor

Dokumentasi resmi untuk REST API Scraping LK21 dan NontonDrakor. API ini menyediakan endpoint untuk mengambil data film (movies) dan serial TV (series) melalui teknik web scraping.

---

## Ringkasan Proyek

- Nama Proyek: scraping-lk21
- Versi: 1.0.0
- Lingkungan Runtime: Node.js (ES Module)
- Bahasa Pemrograman: TypeScript
- Framework Web: Express v5
- Library Utama: Axios, Cheerio, CORS, Morgan, dotenv

---

## Konfigurasi Lingkungan (Environment Variables)

Sebelum menjalankan proyek, buat file `.env` di direktori utama dan tentukan variabel berikut:

```env
PORT=3000
LK21_BASE_URL=https://lk21-url-anda.com
ND_BASE_URL=https://nontondrakor-url-anda.com
```

---

## Panduan Instalasi dan Penggunaan

1. Menginstall Dependensi
   ```bash
   npm install
   ```

2. Mode Pengembang (Development)
   ```bash
   npm run dev
   ```

3. Kompilasi Kode (Build)
   ```bash
   npm run build
   ```

4. Menjalankan Produksi (Production)
   ```bash
   npm start
   ```

---

## Struktur Folder Proyek

```
scraping-lk21/
├── src/
│   ├── app.ts                 # Konfigurasi aplikasi Express
│   ├── server.ts              # Entry point penjalan server HTTP
│   ├── types.ts               # Definisi antarmuka TypeScript
│   ├── controllers/
│   │   ├── movie.ts           # Logika penanganan rute film
│   │   └── series.ts          # Logika penanganan rute serial TV
│   ├── routes/
│   │   └── routes.ts          # Pemetaan endpoint rute API
│   ├── scrapers/
│   │   ├── movie.ts           # Logika scraping HTML film
│   │   └── series.ts          # Logika scraping HTML serial TV
│   └── util/
│       ├── axios-instance.ts  # Konfigurasi instance Axios
│       └── clean-text.ts      # Fungsi pembersih teks HTML
├── .env                       # Konfigurasi variabel lingkungan
├── package.json               # Dependensi dan skrip proyek
├── tsconfig.json              # Konfigurasi TypeScript
└── tsup.config.ts             # Konfigurasi tsup bundler
```

---

## Dokumentasi Endpoint API

Base URL API: `http://localhost:3000` (atau sesuai konfigurasi PORT)

### 1. Endpoint Umum

#### Cek Status API
- Method: `GET`
- Endpoint: `/`
- Respon Suksess (200 OK):
  ```json
  {
    "message": "Berhasil Terhubung!"
  }
  ```

---

### 2. Endpoint Film (Movies)

#### Film Terbaru
- Method: `GET`
- Endpoint: `/movies/latest`
- Query Parameter:
  - `page` (optional, default: 1): Nomor halaman.
- Contoh Respon (200 OK):
  ```json
  {
    "message": "Latest Movies",
    "data": [
      {
        "_id": "film-slug-example",
        "type": "movie",
        "title": "Judul Film",
        "poster": "https://image-link.com/poster.jpg",
        "year": 2023,
        "rating": "8.5",
        "genre": ["Action", "Adventure"]
      }
    ]
  }
  ```

#### Rating Film Tertinggi
- Method: `GET`
- Endpoint: `/movies/rating`
- Query Parameter:
  - `page` (optional, default: 1)

#### Film Populer
- Method: `GET`
- Endpoint: `/movies/populer`
- Query Parameter:
  - `page` (optional, default: 1)

#### Detail Film
- Method: `GET`
- Endpoint: `/movies/:id`
- Path Parameter:
  - `id`: Slug/ID dari film.
- Contoh Respon (200 OK):
  ```json
  {
    "message": "Movie Details",
    "data": {
      "title": "Judul Film",
      "director": "Nama Sutradara",
      "cast": ["Pemain 1", "Pemain 2"],
      "description": "Sinopsis film...",
      "duration": "2j 15m",
      "similar": [
        {
          "_id": "similar-movie-slug",
          "type": "movie",
          "title": "Judul Film Terkait",
          "poster": "https://image-link.com/poster.jpg"
        }
      ]
    }
  }
  ```

#### Link Streaming Film
- Method: `GET`
- Endpoint: `/movies/:id/stream`
- Path Parameter:
  - `id`: Slug/ID dari film.
- Contoh Respon (200 OK):
  ```json
  {
    "message": "Movie Details",
    "data": [
      {
        "provider": "Server 1",
        "link": "https://stream-provider-link.com/embed/123"
      }
    ]
  }
  ```

#### Filter Film Berdasarkan Genre
- Method: `GET`
- Endpoint: `/movies/genre/:param`
- Path Parameter:
  - `param`: Nama genre (contoh: `action`, `drama`).
- Query Parameter:
  - `page` (optional, default: 1)

#### Filter Film Berdasarkan Negara
- Method: `GET`
- Endpoint: `/movies/country/:param`
- Path Parameter:
  - `param`: Kode/nama negara (contoh: `japan`, `united-states`).
- Query Parameter:
  - `page` (optional, default: 1)

---

### 3. Endpoint Serial TV (Series)

#### Serial TV Terbaru
- Method: `GET`
- Endpoint: `/series/latest`
- Query Parameter:
  - `page` (optional, default: 1)

#### Serial TV Populer
- Method: `GET`
- Endpoint: `/series/populer`
- Query Parameter:
  - `page` (optional, default: 1)

#### Rating Serial TV Tertinggi
- Method: `GET`
- Endpoint: `/series/rating`
- Query Parameter:
  - `page` (optional, default: 1)

#### Serial TV Ongoing
- Method: `GET`
- Endpoint: `/series/ongoing`
- Query Parameter:
  - `page` (optional, default: 1)

#### Detail Serial TV
- Method: `GET`
- Endpoint: `/series/:id`
- Path Parameter:
  - `id`: Slug/ID dari serial TV.
- Contoh Respon (200 OK):
  ```json
  {
    "message": "Series Details",
    "data": {
      "title": "Judul Series",
      "type": "series",
      "description": "Sinopsis series...",
      "director": "Nama Sutradara",
      "cast": ["Pemain 1", "Pemain 2"],
      "episodes": [
        {
          "season": 1,
          "title": "Episode 1",
          "slug": "series-slug-season-1-episode-1"
        }
      ]
    }
  }
  ```

#### Link Streaming Serial TV
- Method: `GET`
- Endpoint: `/series/:id/stream`
- Path Parameter:
  - `id`: Slug/ID dari episode serial TV.
- Contoh Respon (200 OK):
  ```json
  {
    "message": "Series Details",
    "data": [
      {
        "provider": "Server 1",
        "link": "https://stream-provider-link.com/embed/456"
      }
    ]
  }
  ```

#### Filter Serial TV Berdasarkan Genre
- Method: `GET`
- Endpoint: `/series/genre/:param`
- Path Parameter:
  - `param`: Nama genre.
- Query Parameter:
  - `page` (optional, default: 1)

#### Filter Serial TV Berdasarkan Negara
- Method: `GET`
- Endpoint: `/series/country/:param`
- Path Parameter:
  - `param`: Kode/nama negara.
- Query Parameter:
  - `page` (optional, default: 1)
