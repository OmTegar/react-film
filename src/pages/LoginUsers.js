import React, { useState } from "react";
import usersData from "../data/users.json";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLoginSuccess = () => {
    //Tampilkan popup untuk  import folder dan import foto
    // console.log("Import folder", folder);
    alert("Login berhasil");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validasi login dengan data JSON
    const user = usersData.find((user) => user.username === username && user.password === password);

    if (user) {
      // Login berhasil
      setErrorMessage("");
      handleLoginSuccess();
    } else {
      // Login gagal
      setErrorMessage("Username atau password salah");
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center">Login Page</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
