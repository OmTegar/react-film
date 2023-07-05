import React, { useEffect } from "react";
// import "../components/css/Home.css";
import moviesData from "../data/movies.json";
import HomeSidebar from "../components/HomeSidebar";

const Home = () => {
  useEffect(() => {
    setProductItemBackground();
  }, []);

  const setProductItemBackground = () => {
    const productItems = document.querySelectorAll(".product__item__pic");
    productItems.forEach((item) => {
      const bg = item.getAttribute("data-setbg");
      item.style.backgroundImage = `url(${bg})`;
    });
  };

  const countEpisode = (slug) => {
    const movie = moviesData.find((m) => m.slug === slug);
    return movie ? movie.files.length : 0;
  };

  return (
    <section className="product spad">
      <div className="container">
        <div className="row">
          <div className="col-lg-8">
            <div className="popular__product">
              <div className="row">
                <div className="col-lg-8 col-md-8 col-sm-8">
                  <div className="section-title">
                    <h4>Popular Shows</h4>
                  </div>
                </div>
                <div className="col-lg-4 col-md-4 col-sm-4">
                  <div className="btn__all">
                    <a href="/" className="primary-btn">
                      View All <span className="arrow_right"></span>
                    </a>
                  </div>
                </div>
              </div>
              <div className="row">
                {moviesData.map((movie, index) => (
                  <div className="col-lg-4 col-md-6 col-sm-6 mb-5" key={index}>
                    <a href={`/${movie.slug}`} className="product__item">
                      <div
                        className="product__item__pic set-bg"
                        data-setbg={movie.image_url}
                      >
                        <div className="ep">
                          {countEpisode(movie.slug)} /{" "}
                          {countEpisode(movie.slug)}
                        </div>
                        <div className="comment">
                          <i className="fa fa-comments mx-1"></i> 
                          0
                        </div>
                        <div className="view">
                          <i className="fa fa-eye mx-2"></i> 
                          103.5k
                        </div>
                      </div>
                      <div className="product__item__text">
                        <ul>
                          {movie.genre.map((genre, genreIndex) => (
                            <li key={genreIndex} className="mx-1">{genre}</li>
                          ))}
                        </ul>
                        <h5>
                          <a href={`/${movie.slug}`}>{movie.title}</a>
                        </h5>
                      </div>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
            <HomeSidebar />
        </div>
      </div>
    </section>
  );
};

export default Home;
