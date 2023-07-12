import React, { useEffect, useState, useRef } from "react";
import moviesData from "../data/movies.json";
import mixitup from "mixitup";
/* eslint-disable react-hooks/exhaustive-deps */


const HomeSidebar = () => {
  const containerRef = useRef(null);
  const [mixitupInstance, setMixitupInstance] = useState(null);
  const [currentFilter, setCurrentFilter] = useState("*");
  
  useEffect(() => {
    setProductItemBackground();
    initializeMixitup();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return () => {
      if (mixitupInstance) {
        mixitupInstance.destroy();
      }
    };
  }, []);

  const setProductItemBackground = () => {
    const productItems = containerRef.current.querySelectorAll(
      ".product__sidebar__view__item"
    );
    productItems.forEach((item) => {
      const bg = item.getAttribute("data-setbg");
      item.style.backgroundImage = `url(${bg})`;
    });
  };

  const countEpisode = (slug) => {
    const movie = moviesData.find((m) => m.slug === slug);
    return movie ? movie.files.length : 0;
  };

  const initializeMixitup = () => {
    const containerEl = containerRef.current;
    const instance = mixitup(containerEl);
    setMixitupInstance(instance);
  };

  const handleFilterClick = (filter) => {
    setCurrentFilter(filter);
  };

  const latestMovies = moviesData.slice(0, 4); // Ambil 5 item terbaru

  return (
    <div className="col-lg-4 col-md-6 col-sm-8">
      <div className="product__sidebar">
        <div className="product__sidebar__view">
          <div className="section-title">
            <h5>Recently Update</h5>
          </div>
          <ul className="filter__controls">
            <li
              className={currentFilter === "*" ? "active" : ""}
              onClick={() => handleFilterClick("*")}
              data-filter="*"
            >
              Day
            </li>
            <li
              className={currentFilter === ".week" ? "active" : ""}
              onClick={() => handleFilterClick(".week")}
              data-filter=".week"
            >
              Week
            </li>
            <li
              className={currentFilter === ".month" ? "active" : ""}
              onClick={() => handleFilterClick(".month")}
              data-filter=".month"
            >
              Month
            </li>
            <li
              className={currentFilter === ".years" ? "active" : ""}
              onClick={() => handleFilterClick(".years")}
              data-filter=".years"
            >
              Years
            </li>
          </ul>
          <div className="filter__gallery" ref={containerRef}>
            {latestMovies.map((movie, index) => (
              <div
                className={`product__sidebar__view__item set-bg mix ${currentFilter}`}
                data-setbg={movie.image_url}
                key={index}
              >
                <div className="ep">
                  {countEpisode(movie.slug)} / {countEpisode(movie.slug)}
                </div>
                <div className="view">
                  <i className="fa fa-eye"></i> 9141
                </div>
                <h5>
                  <a href={`/${movie.slug}`}>{movie.title}</a>
                </h5>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeSidebar;
