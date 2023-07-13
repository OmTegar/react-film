import React from "react";
import mylogo from "../components/img/logo1-Footer.png";

const Footer = () => {
  const scrollToTop = () => {
    const c = document.documentElement.scrollTop || document.body.scrollTop;
    if (c > 0) {
      window.requestAnimationFrame(scrollToTop);
      window.scrollTo(0, c - c / 8);
    }
  };

  return (
    <footer className="footer">
      <div className="page-up">
        <a href="#scrollToTopButton" onClick={scrollToTop}>
          <span className="arrow_carrot-up"></span>
        </a>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-lg-3">
            <div className="footer__logo">
              <a href="/">
                <img src={mylogo} alt="" />
              </a>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="footer__nav">
              <ul>
                <li className="active">
                  <a href="/">Homepage</a>
                </li>
                <li>
                  <a href="/categories">Categories</a>
                </li>
                <li>
                  <a href="/blog">Our Blog</a>
                </li>
                <li>
                  <a href="/contact">Contacts</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-3">
            <p>
              &copy; {new Date().getFullYear()} All rights reserved | This template is made with{" "}
              <i className="fa fa-heart" aria-hidden="true"></i> by{" "}
              <a href="https://omtegar.me" target="_blank" rel="noopener noreferrer" className="mx-1">
                Omtegar
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
