const fs = require("fs");
const path = require("path");

// Tentukan direktori folder film
const moviesDirectory = path.join(__dirname, "public/movies");
const movies = [];

// Fungsi untuk mengubah judul menjadi slug
function createSlug(title) {
  return title.replace(/\s+/g, "-").toLowerCase();
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
        return fileExtension === ".mp4"; // Ubah format sesuai kebutuhan
      });

      // Buat objek untuk film dan tambahkan ke dalam array movies
      if (movieFilesFiltered.length > 0) {
        const movieTitle = item;
        const movie = {
          title: movieTitle,
          slug: createSlug(movieTitle),
          image_url: `img/${createSlug(movieTitle)}.png`,
          files: movieFilesFiltered,
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
