const fs = require("fs");
const path = require("path");

// Tentukan direktori folder film
const moviesDirectory = path.join(__dirname, "public/movies");
const movies = [];

// Fungsi untuk mengubah judul menjadi slug
function createSlug(title) {
  return title.replace(/\s+/g, "-").toLowerCase();
}

// Fungsi untuk membaca isi file equipment.txt
function readEquipmentFile(folderPath) {
  const equipmentFilePath = path.join(folderPath, "equipment.txt");
  if (fs.existsSync(equipmentFilePath)) {
    const equipmentData = fs.readFileSync(equipmentFilePath, "utf-8");
    return JSON.parse(equipmentData);
  }
  return getDefaultEquipmentData();
}

// Fungsi untuk mendapatkan data equipment default jika equipment.txt tidak ada
function getDefaultEquipmentData() {
  return {
    genre: ["Unknown"],
    description: ["Description Belum Tersedia Di Database Kami, Silahkan Tunggu Update Selanjutnya. Terima Kasih :) "],
    studios: ["TDFILM STUDIO"],
    release_date: ["Coming Soon"],
    scores: ["-"],
    duration: ["Unknown"],
    quality: ["720p Min-Quality"],
  };
}

// Rekursif: Fungsi untuk membaca folder secara rekursif
function readMovieFolder(folderPath) {
  // Baca isi direktori folder film
  fs.readdirSync(folderPath).forEach((item) => {
    const itemPath = path.join(folderPath, item);

    // Periksa apakah item dalam folder merupakan direktori
    if (fs.statSync(itemPath).isDirectory()) {
      const movieFiles = fs.readdirSync(itemPath);

      // Filter file-file film berdasarkan format (misalnya, mp4)
      const movieFilesFiltered = movieFiles.filter((file) => {
        const fileExtension = path.extname(file).toLowerCase();
        return fileExtension === ".mp4" || fileExtension === ".mkv" || fileExtension === ".avi";
        // Ubah format sesuai dengan ekstensi file yang ingin Anda sertakan
      });

      // Dapatkan waktu modifikasi folder film
      const folderStat = fs.statSync(itemPath);
      const dateModified = folderStat.mtime.toISOString();

      // Baca file equipment.txt atau gunakan data default jika tidak ada
      const equipmentData = readEquipmentFile(itemPath);

      // Buat objek untuk film dan tambahkan ke dalam array movies
      if (movieFilesFiltered.length > 0) {
        const movieTitle = item;
        const movie = {
          id: movies.length + 1, // Generate unique ID based on array length
          title: movieTitle,
          movies_bank:createSlug(movieTitle),
          slug: createSlug(movieTitle),
          image_url: `https://movies-bank-omtegar.sgp1.cdn.digitaloceanspaces.com/img/${createSlug(movieTitle)}.png`,
          files: movieFilesFiltered,
          genre: equipmentData.genre,
          description: equipmentData.description,
          studios: equipmentData.studios,
          release_date: equipmentData.release_date,
          scores: equipmentData.scores,
          duration: equipmentData.duration,
          quality: equipmentData.quality,
          date_modified: dateModified,
        };
        movies.push(movie);
      }
    }
  });
}

// Panggil fungsi rekursif untuk membaca folder film
readMovieFolder(moviesDirectory);

// Urutkan array movies berdasarkan date_modified
movies.sort((a, b) => new Date(b.date_modified) - new Date(a.date_modified));

// Assign IDs based on the sorted order
movies.forEach((movie, index) => {
  movie.id = index + 1;
});

// Ubah array movies menjadi JSON
const moviesJSON = JSON.stringify(movies, null, 2);

console.log(moviesJSON);

// Simpan JSON ke dalam file
const outputFilePath = path.join(__dirname, "src/data/movies.json");
fs.writeFileSync(outputFilePath, moviesJSON);

console.log("movies.json berhasil dibuat.");
