# Restfull API and Middleware

## Kontributor
Husnia Munzayana

## Penjelasan Ringkas Program
Repositori ini berisi implementasi program untuk pembuatan endpoint Restfull API, Authentication Middleware, Logging, dan API Documentation dengan Swagger

## Pre-Requisite
- Express JS
- dotenv
- jsonwebtoken
- morgan
- nodemon
- pg
- swagger-jsdoc
- swagger-ui-express

## Cara Menjalankan Program
1. Clone repository ini :
   ``git clone https://github.com/munzayanahusn/restfullAPI-middleware.git``
2. Lakukan setup database dengan meng-import file pada ./database/movies-database.sql
3. Lakukan penyesuaian konfigurasi database pada file ./database/pool.js
4. Buka terminal dan arahkan ke directory tempat clone
5. Lakukan instalasi setiap pre-requisite package : ```npm install <package>```
6. Jalankan program : ```npm run start```
7. Lakukan pengujian endpoint melalui browser atau Postman
8. Buka dokumentasi dengan mengakses : `http://localhost:3000/api-docs/`
