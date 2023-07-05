import React from "react";

const HeroLogin = () => {
  return (
    <section
      className="normal-breadcrumb set-bg"
      style={{
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "top center",
        backgroundImage: `url(${process.env.PUBLIC_URL}/img/normal-breadcrumb.jpg)`,
      }}
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-12 text-center">
            <div className="normal__breadcrumb__text">
              <h2>Login</h2>
              <p>Welcome to the official Anime blog.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroLogin;
