## Backend BNMO
Sebuah backend yang dibuat oleh seseorang yang sedang mengikuti seleksi Laboratorium Programming dengan niat untuk mengerjakan tugas dari awal diberikan, tetapi pada kenyataannya malah lebih mengaret dari frontendnya

## How to Install
- Pastikan sudah install semua aplikasi di list berikut
  - [Node JS](https://nodejs.org/en/)
  - [Git](https://git-scm.com/)
  - [Docker](https://docs.docker.com/desktop/)
  - [redis](https://redis.io/docs/getting-started/)
- Clone repo ini
```
git clone https://github.com/msyahrulsp/labpro-be.git labpro-be
cd labpro-be
npm install
```

## How to Use
Silahkan pilih metode yang ingin digunakan. Menjalankan sepenuhnya secara lokal menggunakan docker. Ataupun menjalankan secara lokal, tetapi terhubung dengan database dan redis yang telah di deploy
### Run with Docker
- Ubah file .env.development menjadi .env
- Isi field yang kosong dengan ketentuan berikut
  - `DATABASE_PASSWORD`: Isi dengan password root MySQL/MariaDB
  - `DATABASE_HOST`: Isi dengan IP dari container docker<br>
    * Cara mendapatkan IP terkait ialah dengan menjalankan perintah `cd ~ | cat /etc/resolv.conf` pada terminal
    * Jalankan di [WSL](https://docs.microsoft.com/en-us/windows/wsl/install) jika menggunakan Windows
  - `JWT_SECRET`: Isi dengan karakter random sesuai dengan keinginan
- Isi juga `MYSQL_ROOT_PASSWORD` pada file `docker-compose.yml` dengan password root MySQL
- Jalankan perintah `docker-compose up`
- Backend akan berjalan di http://localhost:5000 dengan database dan redis di container docker
> Database akan terinisiasi jika container database dimulai untuk pertama kali

### Connect to Deployed Database and redis
- Ubah file .env.production menjadi .env
- Isi `JWT_SECRET` dengan karakter random sesuai dengan keinginan
- Jalankan perintah `npm run dev`
- Backend akan berjalan di http://localhost:5000 dengan database dan redis yang telah di deploy

## API Endpoint

| Endpoint                | Method    | Access          |
|-------------------------|-----------|-----------------|
| /register               | POST      | All             |
| /login                  | POST      | All             |
| /login                  | GET       | Customer, Admin |
| /transfer               | POST      | Customer        |
| /history/{username}     | GET       | Customer        |
| /verifications/requests | POST      | Customer        |
| /verifications/accounts | PUT, GET  | Admin           |
| /verifications/requests | PUT, GET  | Admin           |
| /users                  | GET       | Admin           |

## API Documentation
Untuk melihat dokumentasi API terkait, silahkan pergi ke link berikut
> https://app.swaggerhub.com/apis-docs/MSSP892/lab-pro/1.0.0

## Design Pattern
Pada backend ini, saya menggunakan beberapa design pattern. Design pattern yang saya maksud ialah:
- Chain of Responsibility<br>
Pada salah satu endpoint, digunakan sebuah middleware, multer. Ini digunakan untuk menyimpan file terlebih dahulu pada backend untuk sementara sebelum di upload pada Google Drive. Jika file valid, maka akan dilanjutkan pada controller selanjutnya

- Factory<br>
Pada Express JS, penginisiasian variabel yang membutuhkan library, hanya dibutuhkan 1 line, yaitu assignment itu sendiri. Namun, jika diliat dibelakang, penginisiasian ini memanggil method-method lain untuk menginisiasi variabel terkait

- Observer<br>
Pada backend ini terdapat beberapa endpoint. Untuk membuat fungsi-fungsi pada backend terpanggil, disubscribe lah fungsi-fungsi tersebut pada tiap endpoint yang ada. Jadi, ketika publisher (frontend) memanggil endpoint, fungsi yang mensubscribe pada endpoint tersebut akan tereksekusi  

- Proxy<br>
Setiap memanggil API exchangerate, availibilitas pemanggilan API tersebut akan berkurang. Belum ditambah response time yang menambah karena ada tambahan pemanggilan API. Oleh karena itu, digunakanlah Proxy design pattern dengan cara mengimplementasikan redis. Alhasil, backend hanya akan memanggil API exchangerate ketika currency yang diingkan belum pernah dipanggil sama sekali. Namun, jika pernah dipanggil dengan currency yang sama, backend hanya akan mengambil nilai yang telah di cached 

## Tech Stack
- NodeJS <sub>v16.14.2</sub>
- ExpressJS <sub>v4.18.1</sub>
- Typescript <sub>v4.7.4</sub>
- MySQL/MariaDB <sub>v2.18.1</sub>
- TypeORM <sub>v0.3.7</sub>
- redis <sub>v4.2.0</sub>
