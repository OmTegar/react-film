const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const moviesDirectory = path.join(__dirname, '../public/movies');

// Fungsi untuk mengubah judul menjadi slug
function createSlug(title) {
  return title.replace(/\s+/g, '-').toLowerCase();
}

// Middleware untuk parsing body permintaan
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Route untuk membuat file JSON movies
app.get('/api/movies', (req, res) => {
  // ... kode untuk membuat file movies.json ...
});

// Route untuk login
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  // Lakukan validasi login sesuai dengan aturan bisnis Anda
  // Misalnya, Anda dapat membandingkan username dan password dengan data pengguna yang ada di database

  // Contoh validasi sederhana
  if (username === 'admin' && password === 'admin123') {
    // Login berhasil
    res.status(200).json({ message: 'Login berhasil' });
  } else {
    // Login gagal
    res.status(401).json({ message: 'Username atau password salah' });
  }
});

// Jalankan server pada port tertentu
app.listen(3001, () => {
  console.log('Server berjalan di http://localhost:3001');
});
