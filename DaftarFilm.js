const fs = require("fs");
const path = require("path");

// Tentukan direktori folder film
const moviesDirectory = path.join(__dirname, "public/movies");
const movies = [];

// Fungsi untuk mengubah judul menjadi slug
function createSlug(title) {
  return title.replace(/\s+/g, "-").toLowerCase();
}

// Fungsi untuk membaca isi file genre.txt
function readGenreFile(folderPath) {
  const genreFilePath = path.join(folderPath, "genre.txt");
  if (fs.existsSync(genreFilePath)) {
    const genreData = fs.readFileSync(genreFilePath, "utf-8");
    return genreData.trim().split("\r\n"); // Memisahkan genre berdasarkan baris baru
  }
  return null;
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

      // Buat objek untuk film dan tambahkan ke dalam array movies
      if (movieFilesFiltered.length > 0) {
        const movieTitle = item;
        const movieGenre = readGenreFile(itemPath);
        const movie = {
          title: movieTitle,
          slug: createSlug(movieTitle),
          image_url: `img/${createSlug(movieTitle)}.png`,
          files: movieFilesFiltered,
          genre: movieGenre,
          date_modified: dateModified,
        };
        movies.push(movie);
      }
    }
  });
}

// Panggil fungsi rekursif untuk membaca folder film
readMovieFolder(moviesDirectory);

// Ubah array movies menjadi JSON
const moviesJSON = JSON.stringify(movies, null, 2);

console.log(moviesJSON);

// Simpan JSON ke dalam file
const outputFilePath = path.join(__dirname, "src/data/movies.json");
fs.writeFileSync(outputFilePath, moviesJSON);

console.log("movies.json berhasil dibuat.");