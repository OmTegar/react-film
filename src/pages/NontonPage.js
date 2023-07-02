// NontonPage.js
import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import moviesData from "../data/movies.json";

const NontonPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);
  const [sameSlugMovies, setSameSlugMovies] = useState([]);

  useEffect(() => {
    const movie = moviesData.find((item) => item.slug === slug);

    if (!movie) {
      console.log("Film tidak ditemukan");
      return;
    }

    const sameSlugMovies = moviesData.filter(
      (item) => item.slug === slug && item.title === movie.title
    );

    setMovie(movie);
    setSameSlugMovies(sameSlugMovies);
  }, [slug]);

  const handleVideoChange = (video) => {
    const encodedVideo = encodeURIComponent(video);
    navigate(`/Video/${slug}/${encodedVideo}`);
  };

  if (!movie) {
    // Display message if movie is not found
    return <div>Film tidak ditemukan</div>;
  }

  const LanjutkanFilm = () => {
    return (
      <div className="mt-4">
        <h3>Daftar Episode</h3>
        <ul className="list-group" style={{ height: "100%", marginBottom: 70 }}>
          {sameSlugMovies.map((item, index) =>
            item.files.map((file, fileIndex) => (
              <li key={`${index}-${fileIndex}`} className="list-group-item">
                <Link
                  to={`/Video/${item.slug}/${encodeURIComponent(file)}`}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  {file}
                </Link>
              </li>
            ))
          )}
        </ul>
      </div>
    );
  };
  

  return (
    <div className="nonton-page">
      <div className="row justify-content-center">
        <div className="col-12">
          <div
            className="d-flex justify-content-center align-items-center"
            style={{
              backgroundColor: "#f2f2f2",
              minHeight: "100vh",
              padding: "0 15px",
            }}
          >
            <div className="container">
              <div className="row">
                <div className="col-md-5">
                  <LanjutkanFilm />
                </div>
                <div className="col-md-7 d-flex flex-column justify-content-center align-items-center">
                  <h2 className="movie-title mt-4">{movie.title}</h2>
                  <img
                    src={`../${movie.image_url}`}
                    className="card-img-top mb-3 rounded mx-auto d-block mt-5"
                    alt={movie.title}
                    style={{ width: 400, height: 500 }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NontonPage;
