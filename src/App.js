import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "bootstrap/dist/js/bootstrap.min.js";
import "./App.css";
import Login from "./components/Login";
import AdminPage from "./pages/AdminPage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import AddFilm from "./pages/AddFilm";
import FilmComponent from "./pages/FilmComponent";
import VideoPlayerPage from "./pages/VideoPlayerPage";
import BlogPage from "./pages/BlogPage";
import ContactPage from "./pages/ContactPage";


// CSS Custom Templaete
import "./components/css/bootstrap.min.css";
import "./components/css/font-awesome.min.css";
import "./components/css/elegant-icons.css";
import "./components/css/plyr.css";
import "./components/css/style.css";
// import "./components/css/nice-select.css";
// import "./components/css/owl.carousel.min.css";
// import "./components/css/slicknav.min.css";

const App = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [showLoader, setShowLoader] = useState(true); // State untuk mengontrol apakah loader ditampilkan atau tidak

  useEffect(() => {
    const loggedInStatus = localStorage.getItem("isLoggedIn");
    if (loggedInStatus === "true") {
      setLoggedIn(true);
    }

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  useEffect(() => {
    if (isLoading) {
      setShowLoader(true);
    }
  }, [isLoading]);

  const handleLogin = () => {
    setLoggedIn(true);
    localStorage.setItem("isLoggedIn", "true");

    setTimeout(() => {
      setLoggedIn(false);
      localStorage.setItem("isLoggedIn", "false");
    }, 5 * 60 * 60 * 1000);
  };

  const handleLogout = () => {
    setLoggedIn(false);
    localStorage.setItem("isLoggedIn", "false");
  };

  useEffect(() => {
    if (!isLoading) {
      setShowLoader(false);
    }
  }, [isLoading]);

  if (showLoader) {
    return (
      <div id="preloader">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/:slug" element={<FilmComponent />} />
        <Route path="/:slug/:video" element={<VideoPlayerPage />} />
        <Route
          path="/login"
          element={
            isLoggedIn ? (
              <Navigate to="/admin" />
            ) : (
              <Login handleLogin={handleLogin} />
            )
          }
        />
        <Route
          path="/admin"
          element={isLoggedIn ? <AdminPage /> : <Navigate to="/login" />}
        />
        <Route path="/admin/add" element={<AddFilm />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;