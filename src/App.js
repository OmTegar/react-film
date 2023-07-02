import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Header from "./layouts/header";
import Footer from "./layouts/footer";
import moviesData from "./data/movies.json";
import NontonPage from "./pages/NontonPage";
import VideoPlayerPage from "./pages/VideoPlayerPage";
import LoginPage from "./pages/LoginUsers";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
      <Outlet disableBackForRoute={true} />
        <Header />
        <Routes>
          <Route path="/" element={<FeaturedFilms />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/nonton/:slug" element={<NontonPage />} />
          <Route path="/Video/:slug/:video" element={<VideoPlayerPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

function FeaturedFilms() {
  return (
    <section className="featured-films">
      <div className="container">
        <h2>Film Pilihan</h2>
        <div className="row">
          {moviesData.map((movie, index) => (
            <div className="col-md-4" key={index}>
              <div className="card">
                <img
                  src={movie.image_url}
                  className="card-img-top"
                  alt={movie.title}
                />
                <div className="card-body">
                  <h5 className="card-title">{movie.title}</h5>
                  <Link to={`/nonton/${movie.slug}`} className="btn btn-primary">
                    Tonton Sekarang
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default App;
