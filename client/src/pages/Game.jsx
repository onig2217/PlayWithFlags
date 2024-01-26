import React, { useContext, useState } from "react";
import "../styles/pages/game.css";
import { AppContext } from "../App";
import Playwithflags from "../components/section/Playwithflags";

const Game = () => {
  // Context State
  const { dataOfFlags } = useContext(AppContext);
  const [gameOn, setGameOn] = useState(false);
  const [numberOfFlags, setNumberOfFlags] = useState("10");

  // Function to pick a random item in an array
  function pickOneRandomItem(arr) {
    return [arr[Math.floor(Math.random() * arr.length)]];
  }

  return (
    <section className="game">
      {gameOn ? (
        <Playwithflags value={numberOfFlags} />
      ) : (
        <div className="game-presentation">
          <div className="game-logo">
            <img src="./logo-brand4.png" alt="" />
          </div>
          <div className="game-text">
            Welcome on our game
            <br /> "<strong>Play with Flags</strong>"
            <br />
            <br />
            <p>
              The goal is to find the name of the flags.
              <br />
              You have 10 seconds on each flag to find the name.
              <br />
              Good Luck and have fun with flags ! (:
            </p>
          </div>

          {dataOfFlags.length > 0 &&
            pickOneRandomItem(dataOfFlags).map((item, index) => (
              <div className="game-flag-bloc" key={index}>
                <div className="game-flag">
                  <img src={item.flags.png} alt="" />
                </div>
                <div className="my-3">
                  <label htmlFor="number-select">Number of flags : </label>
                  <select
                    value={numberOfFlags}
                    onChange={(e) => setNumberOfFlags(e.target.value)}
                    name="number"
                    id="number-select"
                  >
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                  </select>
                </div>
                <button onClick={() => setGameOn(!gameOn)} className="game-btn">
                  START
                </button>
              </div>
            ))}
        </div>
      )}
    </section>
  );
};

export default Game;
