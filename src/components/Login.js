import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import usersData from "../data/users.json";
import "./css/login.css";
import HeroLogin from "./HeroLogin";

const Login = ({ handleLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLoginClick = () => {
    const user = usersData.users.find(
      (user) => user.username === username && user.password === password
    );

    if (user) {
      handleLogin();
      navigate("/admin"); // Navigate to admin page on successful login
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div>
      <HeroLogin />
      <section className="login spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="login__form">
                <h3>Login</h3>
                <form>
                {error && <p className="text-danger">{error}</p>}
                  <div className="input__item">
                    <input
                      type="text"
                      className="form-control"
                      id="floatingInput"
                      placeholder="Username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                    <span className="icon_profile"></span>
                  </div>
                  <div className="input__item">
                    <input
                      type="password"
                      className="form-control"
                      id="floatingPassword"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <span className="icon_lock"></span>
                  </div>
                  <button  type="button" onClick={handleLoginClick} className="site-btn">
                    Login Now
                  </button>
                </form>
                <a href="/login" className="forget_pass">
                  Forgot Your Password?
                </a>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="login__register">
                <h3>Dont’t Have An Account?</h3>
                <a href="/login" className="primary-btn">
                  Register Now
                </a>
              </div>
            </div>
          </div>
          <div className="login__social">
            <div className="row d-flex justify-content-center">
              <div className="col-lg-6">
                <div className="login__social__links">
                  <span>or</span>
                  <ul>
                    <li>
                      <a href="/login" className="facebook">
                        <i className="fa fa-facebook"></i> Sign in With Facebook
                      </a>
                    </li>
                    <li>
                      <a href="/login" className="google">
                        <i className="fa fa-google"></i> Sign in With Google
                      </a>
                    </li>
                    <li>
                      <a href="/login" className="twitter">
                        <i className="fa fa-twitter"></i> Sign in With Twitter
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
