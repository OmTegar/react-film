import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import moviesData from "../data/movies.json";
import BreadcrumbComponent from "../components/Breadcrumb";

const NontonPage = () => {
  const { slug } = useParams();

  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const movie = moviesData.find((item) => item.slug === slug);

    if (!movie) {
      console.log("Film tidak ditemukan");
      return;
    }

    setMovie(movie);
  }, [slug]);

  useEffect(() => {
    const setProductItemBackground = () => {
      const productItems = document.querySelectorAll(".anime__details__pic");
      productItems.forEach((item) => {
        const bg = item.getAttribute("data-setbg");
        item.style.backgroundImage = `url(${bg})`;
      });
    };

    setProductItemBackground();
  }, [movie]);

  if (!movie) {
    // Display message if movie is not found
    return <div>Film tidak ditemukan</div>;
  }

  const breadcrumbElement = <BreadcrumbComponent />;

  const descriptionElements = movie.description.map((desc, index) => (
    <p key={index}>
      {desc}
      {index !== movie.description.length - 1 && <br />}
    </p>
  ));

  return (
    <div>
      {breadcrumbElement}
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
                      {movie.subtitle} フェイト／ステイナイト, TDmovies - {movie.title} - {movie.quality } Quality
                    </span>
                  </div>
                  {descriptionElements}
                  <div className="anime__details__widget">
                    <div className="row">
                      <div className="col-lg-6 col-md-6">
                        <ul>
                          <li>
                            <span>Studios:</span>
                            {movie.studios}
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
                            <span>Quality:</span> {movie.quality }
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
                <div
                  className="product__sidebar__view__item set-bg"
                  data-setbg={movie.image_url}
                >
                  <div className="ep">18 / ?</div>
                  <div className="view">
                    <i className="fa fa-eye"></i> 9141
                  </div>
                  <h5>
                    <a href="/">Boruto: Naruto next generations</a>
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NontonPage;
