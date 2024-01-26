import React, { useContext } from "react";
import "../styles/pages/log.css";
import { AppContext } from "../App";

const Log = () => {
  const logValues = {
    email: "",
    password: "",
    pseudo: "",
  };
  const { loginOrSignup, setLoginOrSignup } = useContext(AppContext);
  return (
    // Log Page
    <section className="log">
      {loginOrSignup ? (
        // Login form
        <div className="log-form log-animation-in">
          <div className="log-form-logo">
            <img src="logo-brand4.png" alt="" />
          </div>
          <form>
            <div className="log-form-inputs my-3">
              <label htmlFor="email">E-mail </label>
              <input
                onChange={(e) => (logValues.email = e.target.value)}
                type="email"
                name="email"
                id="email"
                required
              />
            </div>
            <div className="log-form-inputs my-3">
              <label htmlFor="password">Password</label>
              <input
                onChange={(e) => (logValues.password = e.target.value)}
                type="password"
                name="password"
                id="password"
                required
              />
            </div>

            <button
              onClick={() => console.log(logValues)}
              className="log-form-btn-enter my-5"
            >
              LOGIN
            </button>
            <a
              onClick={() => setLoginOrSignup(false)}
              className="log-form-link"
              href="#"
            >
              You don't have an account ?
            </a>
          </form>
        </div>
      ) : (
        // Signup form
        <div className="log-form log-animation-out">
          <div className="log-form-logo">
            <img src="logo-brand4.png" alt="" />
          </div>
          <form>
            <div className="log-form-inputs">
              <label htmlFor="nickname">Nickname</label>
              <input
                onChange={(e) => (logValues.pseudo = e.target.value)}
                type="text"
                name="nickname"
                id="nickname"
                required
              />
            </div>
            <div className="log-form-inputs my-3">
              <label htmlFor="email">E-mail </label>
              <input
                onChange={(e) => (logValues.email = e.target.value)}
                type="email"
                name="email"
                id="email"
                required
              />
            </div>
            <div className="log-form-inputs my-3">
              <label htmlFor="password">Password</label>
              <input
                onChange={(e) => (logValues.password = e.target.value)}
                type="password"
                name="password"
                id="password"
                required
              />
            </div>
            <button
              onClick={() => console.log(logValues)}
              className="log-form-btn-enter my-4"
            >
              REGISTER
            </button>
            <a
              onClick={() => setLoginOrSignup(true)}
              className="log-form-link"
              href="#"
            >
              You already have an account ?
            </a>
          </form>
        </div>
      )}
    </section>
  );
};

export default Log;
