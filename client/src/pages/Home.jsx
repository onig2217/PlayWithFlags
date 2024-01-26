import React, { useContext } from "react";
import "../styles/pages/home.css";
import { AppContext } from "../App";
import { NavLink } from "react-router-dom";

const Home = () => {
  const { sidebarOpen } = useContext(AppContext);
  return (
    // Home Page
    <section className="home">
      {/* Home content */}
      <div className="home-content">
        {/* Home PWF image */}
        <div className="img-bloc">
          <img className="img-heart" src="logo-pwf.png" alt="" />
        </div>
        {/* Home PLAY button */}
        <NavLink className="playBut" to="/game">
          <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="213.7px"
            height="213.7px"
            viewBox="0 0 213.7 213.7"
            enableBackground="new 0 0 213.7 213.7"
          >
            <polygon
              className="triangle"
              id="XMLID_18_"
              fill="none"
              strokeWidth="7"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeMiterlimit="10"
              points="
            73.5,62.5 148.5,105.8 73.5,149.1 "
            />

            <circle
              className="circle"
              id="XMLID_17_"
              fill="none"
              strokeWidth="7"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeMiterlimit="10"
              cx="106.8"
              cy="106.8"
              r="103.3"
            />
          </svg>
        </NavLink>
      </div>
    </section>
  );
};

export default Home;
