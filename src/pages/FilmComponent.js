import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import moviesData from "../data/movies.json";
import BreadcrumbComponent from "../components/Breadcrumb";

const NontonPage = () => {
  const { slug } = useParams();

  const [movie, setMovie] = useState(null);
  const [similarMovies, setSimilarMovies] = useState([]);

  useEffect(() => {
    const movie = moviesData.find((item) => item.slug === slug);

    if (!movie) {
      console.log("Film tidak ditemukan");
      return;
    }

    setMovie(movie);

    // Cari film-film serupa berdasarkan genre
    const similarMovies = moviesData.filter(
      (item) =>
        item.slug !== slug &&
        item.genre.some((genre) => movie.genre.includes(genre))
    );
    setSimilarMovies(similarMovies);
  }, [slug]);

  useEffect(() => {
    const setProductItemBackground = () => {
      const productItem = document.querySelector(".anime__details__pic");
      if (productItem && movie) {
        const bg = movie.image_url;
        productItem.style.backgroundImage = `url(${bg})`;
      }
    };

    setProductItemBackground();
  }, [movie]);

  // const breadcrumbElement = <BreadcrumbComponent />;

  const descriptionElements = movie?.description.map((desc, index) => (
    <p key={index}>
      {desc}
      {index !== movie.description.length - 1 && <br />}
    </p>
  ));

  const countEpisode = (slug) => {
    const movie = moviesData.find((m) => m.slug === slug);
    return movie ? movie.files.length : 0;
  };

  const GenreItem = ({ genre }) => {
    const maxGenreLength = 3;

    if (genre.length <= maxGenreLength) {
      return genre.map((g, index) => (
        <li key={index} className="mx-1">
          {g}
        </li>
      ));
    } else {
      return (
        <>
          {genre.slice(0, maxGenreLength).map((g, index) => (
            <li key={index} className="mx-1" style={{ lineHeight: "15px" }}>
              {g}
            </li>
          ))}
          <li className="mx-1 genre-hovered">
            +{genre.length - maxGenreLength}
          </li>
        </>
      );
    }
  };

  const similarMoviesElements = similarMovies
  .sort((a, b) => {
    // Sort similar movies based on the number of matching genres
    const aMatchingGenres = a.genre.filter((genre) =>
      movie.genre.includes(genre)
    );
    const bMatchingGenres = b.genre.filter((genre) =>
      movie.genre.includes(genre)
    );

    return bMatchingGenres.length - aMatchingGenres.length;
  })
  .slice(0, 3)
  .map((similarMovie) => (
    <a href={`/${similarMovie.slug}`} key={similarMovie.slug}>
      <div
        className="product__sidebar__view__item set-bg"
        style={{ backgroundImage: `url(${similarMovie.image_url})` }}
      >
        <div className="ep">
          {countEpisode(similarMovie.slug)} / {countEpisode(similarMovie.slug)}
        </div>
        <div className="view">
          <i className="fa fa-eye"></i> {similarMovie.views}
        </div>
        <h5
          className="text-white text-decoration-none"
          style={{ fontWeight: 700, lineHeight: "26px", bottom: "40px" }}
        >
          {similarMovie.title}
        </h5>
        <div className="product__item__text" style={{ bottom: 0, position:"absolute", fontWeight: 700, lineHeight: "26px",width: "100%", padding: "0 30px 0 20px", }}>
          <ul className="genre">
            <GenreItem genre={similarMovie.genre} />
          </ul>
        </div>
      </div>
    </a>
  ));


  if (!movie) {
    // Display message or handle the case when movie is not found
    return <div>Film tidak ditemukan</div>;
  }

  return (
    <div>
      <BreadcrumbComponent />;
      <section className="anime-details spad">
        <div className="container">
          <div className="anime__details__content">
            <div className="row">
              <div className="col-lg-3">
                <div
                  className="anime__details__pic set-bg"
                  data-setbg={movie.image_url}
                >
                  <div className="comment">
                    <i className="fa fa-comments"></i> 11
                  </div>
                  <div className="view">
                    <i className="fa fa-eye"></i> 9141
                  </div>
                </div>
              </div>
              <div className="col-lg-9">
                <div className="anime__details__text">
                  <div className="anime__details__title">
                    <h3>{movie.title}</h3>
                    <span>
                      {movie.subtitle} フェイト／ステイナイト, TDmovies -{" "}
                      {movie.title} - {movie.quality} Quality
                    </span>
                  </div>
                  {descriptionElements}
                  <div className="anime__details__widget">
                    <div className="row">
                      <div className="col-lg-6 col-md-6">
                        <ul>
                          <li>
                            <span>Studios:</span>
                            {movie.studios.join(", ")}
                          </li>
                          <li>
                            <span>release date:</span>
                            {movie.release_date}
                          </li>
                          <li>
                            <span>Genre:</span>
                            {movie.genre.join(", ")}
                          </li>
                        </ul>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <ul>
                          <li>
                            <span>Scores:</span> {movie.scores}
                          </li>
                          <li>
                            <span>Duration:</span> {movie.duration}
                          </li>
                          <li>
                            <span>Quality:</span> {movie.quality}
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="anime__details__btn">
                    <a
                      href={`/${movie.slug}/${movie.files[0]}`}
                      className="watch-btn"
                    >
                      <span>Watch Now</span>{" "}
                      <i className="fa fa-angle-right"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-8 col-md-8">
              <div className="anime__details__form">
                <div className="section-title">
                  <h5>Your Comment</h5>
                </div>
                <form action="#">
                  <textarea placeholder="Your Comment"></textarea>
                  <button type="submit">
                    <i className="fa fa-location-arrow"></i> Review
                  </button>
                </form>
              </div>
            </div>

            <div className="col-lg-4 col-md-4">
              <div className="anime__details__sidebar">
                <div className="section-title">
                  <h5>you might like...</h5>
                </div>
                {similarMoviesElements}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NontonPage;
