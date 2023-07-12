import React, { useEffect, useRef, useState, useCallback } from "react";
import moviesData from "../data/movies.json";
import HomeSidebar from "../components/HomeSidebar";

const Home = () => {
  const productItemsRef = useRef([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const getCurrentMovie = useCallback(
    (index) => {
      const startIndex = (currentPage - 1) * itemsPerPage;
      const movieIndex = startIndex + index;
      return moviesData[movieIndex];
    },
    [currentPage, itemsPerPage]
  );

  const setProductItemBackground = useCallback(() => {
    const productItems = productItemsRef.current;
    if (productItems) {
      productItems.forEach((item, index) => {
        const movie = getCurrentMovie(index);
        if (movie) {
          const bg = movie.image_url;
          item.setAttribute("data-setbg", bg);
          item.style.backgroundImage = `url(${bg})`;
        }
      });
    }
  }, [productItemsRef, getCurrentMovie]);

  useEffect(() => {
    setProductItemBackground();
  }, [currentPage, setProductItemBackground]);
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
            <li key={index} className="mx-1">
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

  const handleClickNext = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handleClickPrev = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  // Menyortir data berdasarkan ID
  const sortedMoviesData = moviesData.sort((a, b) => a.id - b.id);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedMoviesData.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const truncateTitle = (title, limit) => {
    if (title.length <= limit) {
      return title;
    }
    return title.slice(0, limit) + (title.length > limit ? "..." : "");
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
                {currentItems.map((movie, index) => (
                  <div className="col-lg-4 col-md-6 col-sm-6 mb-5" key={index}>
                    <a href={`/${movie.slug}`} className="product__item">
                      <div
                        className="product__item__pic set-bg"
                        data-setbg={movie.image_url}
                        ref={(el) => (productItemsRef.current[index] = el)}
                      >
                        <div className="ep">
                          {countEpisode(movie.slug)} /{" "}
                          {countEpisode(movie.slug)}
                        </div>
                        <div className="comment">
                          <i className="fa fa-comments mx-1"></i>0
                        </div>
                        <div className="view">
                          <i className="fa fa-eye mx-2"></i>
                          103.5k
                        </div>
                      </div>
                      <div className="product__item__text">
                        <ul className="genres">
                          <GenreItem genre={movie.genre} />
                        </ul>
                        <h5>
                          <a href={`/${movie.slug}`}>{truncateTitle(movie.title, 26)}</a>
                        </h5>
                      </div>
                    </a>
                  </div>
                ))}
              </div>
              <div className="pagination d-flex justify-content-center">
                <button
                  className="pagination__prev mx-4 text-center btn btn-outline-info"
                  onClick={handleClickPrev}
                  disabled={currentPage === 1}
                >
                  <i className="fa fa-chevron-left"></i> Prev
                </button>
                <button
                  className="pagination__next mx-4 text-center btn btn-outline-info"
                  onClick={handleClickNext}
                  disabled={indexOfLastItem >= sortedMoviesData.length}
                >
                  Next <i className="fa fa-chevron-right"></i>
                </button>
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
