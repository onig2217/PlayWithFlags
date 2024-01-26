import React, {
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";
// import "../styles/pages/game.css";
import { AppContext } from "../../App";

const Playwithflags = (props) => {
  // Context State
  const { dataOfFlags } = useContext(AppContext);
  // Component State
  const [gameState, setGameState] = useState(false);
  const [currentFlagSrc, setCurrentFlagSrc] = useState("");
  const [userInput, setUserInput] = useState("");
  const [currentFlagTimer, setCurrentFlagTimer] = useState(10);
  const [globalTimer, setGlobalTimer] = useState(0);
  const [randomArrayOfFlags, setRandomArrayOfFlags] = useState([]);
  const [currentFlagIndex, setCurrentFlagIndex] = useState(0);
  const [currentFlag, setCurrentFlag] = useState("");
  const [arrLength] = useState(parseInt(props.value));

  const userInputRef = useRef(null);

  // Function to pick multiple ramdom items in an array
  function pickSomeRandomItems(arr, n) {
    let result = new Array(n),
      len = arr.length,
      taken = new Array(len);
    if (n > len)
      throw new RangeError("getRandom: more elements taken than available");
    while (n--) {
      var x = Math.floor(Math.random() * len);
      result[n] = arr[x in taken ? taken[x] : x];
      taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
  }

  // Function to move on the next flag
  const showNextFlag = useCallback(() => {
    setCurrentFlag(randomArrayOfFlags[currentFlagIndex]);
    setCurrentFlagSrc(randomArrayOfFlags[currentFlagIndex].flags.png);
    setUserInput("");
  }, [randomArrayOfFlags, currentFlagIndex]);

  // Effect to init the game
  useEffect(() => {
    const initGameValues = function () {
      const randomArr = pickSomeRandomItems(dataOfFlags, arrLength).map(
        (item) => {
          let test = { ...item, answer: false };
          return test;
        }
      );
      setGameState(true);
      setRandomArrayOfFlags(randomArr);
      setCurrentFlag(randomArr[currentFlagIndex]);
      setCurrentFlagSrc(randomArr[currentFlagIndex].flags.png);
    };
    if (currentFlagIndex === 0) {
      initGameValues();
    }
  }, [dataOfFlags, currentFlagIndex, arrLength]);

  // Effect to control the timers of the game
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentFlagTimer((previousTimer) => previousTimer - 1);
      setGlobalTimer((previousTimer) => previousTimer + 1);
    }, 1000);

    if (gameState === false) {
      clearInterval(timer);
      return;
    }

    if (currentFlagTimer === 0) {
      clearInterval(timer);
      setCurrentFlagIndex((previousIndex) => previousIndex + 1);
      setCurrentFlagTimer(10);
    }
    return () => clearInterval(timer);
  }, [currentFlagTimer, gameState]);

  // Effect to trigger the showNextFlag function when the currentFlagIndex is updated
  useEffect(() => {
    if (currentFlagIndex === arrLength) {
      gameEnd();
      return;
    }
    if (currentFlagIndex > 0) {
      showNextFlag();
    }
  }, [currentFlagIndex, showNextFlag, arrLength]);

  // Function to check if the user find the name of the flag
  function verifyUserInput() {
    let guess = userInput
      .normalize("NFD")
      .replace(/\p{Diacritic}/gu, "")
      .toUpperCase();
    let currentFlagCommonName = currentFlag.name.common
      .normalize("NFD")
      .replace(/\p{Diacritic}/gu, "")
      .toUpperCase();
    let arrOfAnswer = [];
    arrOfAnswer.push(currentFlagCommonName);
    for (let item in currentFlag.translations) {
      arrOfAnswer.push(
        currentFlag.translations[item].common
          .normalize("NFD")
          .replace(/\p{Diacritic}/gu, "")
          .toUpperCase()
      );
    }

    if (arrOfAnswer.includes(guess)) {
      userInputRef.current.style.borderStyle = "solid";
      userInputRef.current.style.borderColor = "green";

      setRandomArrayOfFlags((previousData) => {
        const changeAnswerValue = previousData.map((item) => {
          if (
            currentFlagCommonName ===
            item.name.common
              .normalize("NFD")
              .replace(/\p{Diacritic}/gu, "")
              .toUpperCase()
          ) {
            item.answer = true;
          }
          return item;
        });
        return changeAnswerValue;
      });
      setCurrentFlagIndex((previousIndex) => previousIndex + 1);
      setUserInput("");
      // showNextFlag(); Not needed because it's triggered on the useEffect
      setCurrentFlagTimer(10);
    } else {
      userInputRef.current.style.borderStyle = "solid";
      userInputRef.current.style.borderColor = "red";
      setUserInput("");
    }
  }
  function skipFlag() {
    setGlobalTimer((previousTimer) => previousTimer + currentFlagTimer);
    setCurrentFlagIndex((previousIndex) => previousIndex + 1);
    setCurrentFlagTimer(10);
  }

  // Function to end the game
  function gameEnd() {
    setGameState(false);
    console.log("end of the game!");
  }

  return (
    <>
      {gameState ? (
        // UI For the game
        <div className="game-presentation">
          <div className="bloc">
            {/* Logo PWF */}
            <div className="game-logo">
              <img src="./logo-brand4.png" alt="" />
            </div>
            {/* Information of the state of the game */}
            <div className="game-info">
              <p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  className="bi bi-stopwatch"
                  viewBox="0 0 16 16"
                >
                  <path d="M8.5 5.6a.5.5 0 1 0-1 0v2.9h-3a.5.5 0 0 0 0 1H8a.5.5 0 0 0 .5-.5V5.6z" />
                  <path d="M6.5 1A.5.5 0 0 1 7 .5h2a.5.5 0 0 1 0 1v.57c1.36.196 2.594.78 3.584 1.64a.715.715 0 0 1 .012-.013l.354-.354-.354-.353a.5.5 0 0 1 .707-.708l1.414 1.415a.5.5 0 1 1-.707.707l-.353-.354-.354.354a.512.512 0 0 1-.013.012A7 7 0 1 1 7 2.071V1.5a.5.5 0 0 1-.5-.5zM8 3a6 6 0 1 0 .001 12A6 6 0 0 0 8 3z" />
                </svg>
                {currentFlagTimer < 10 ? "0" : null}
                {currentFlagTimer}/10s
              </p>
              <p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  className="bi bi-flag"
                  viewBox="0 0 16 16"
                >
                  <path d="M14.778.085A.5.5 0 0 1 15 .5V8a.5.5 0 0 1-.314.464L14.5 8l.186.464-.003.001-.006.003-.023.009a12.435 12.435 0 0 1-.397.15c-.264.095-.631.223-1.047.35-.816.252-1.879.523-2.71.523-.847 0-1.548-.28-2.158-.525l-.028-.01C7.68 8.71 7.14 8.5 6.5 8.5c-.7 0-1.638.23-2.437.477A19.626 19.626 0 0 0 3 9.342V15.5a.5.5 0 0 1-1 0V.5a.5.5 0 0 1 1 0v.282c.226-.079.496-.17.79-.26C4.606.272 5.67 0 6.5 0c.84 0 1.524.277 2.121.519l.043.018C9.286.788 9.828 1 10.5 1c.7 0 1.638-.23 2.437-.477a19.587 19.587 0 0 0 1.349-.476l.019-.007.004-.002h.001M14 1.221c-.22.078-.48.167-.766.255-.81.252-1.872.523-2.734.523-.886 0-1.592-.286-2.203-.534l-.008-.003C7.662 1.21 7.139 1 6.5 1c-.669 0-1.606.229-2.415.478A21.294 21.294 0 0 0 3 1.845v6.433c.22-.078.48-.167.766-.255C4.576 7.77 5.638 7.5 6.5 7.5c.847 0 1.548.28 2.158.525l.028.01C9.32 8.29 9.86 8.5 10.5 8.5c.668 0 1.606-.229 2.415-.478A21.317 21.317 0 0 0 14 7.655V1.222z" />
                </svg>
                {currentFlagIndex + 1}/{arrLength}
              </p>
            </div>
            {/* The game flag */}
            <div className="game-flag">
              <img id="gamefla" src={currentFlagSrc} alt="" />
            </div>
            {/* The game inputs */}
            <div className="game-inputs">
              <input
                ref={userInputRef}
                onChange={(e) => {
                  userInputRef.current.style.borderStyle = "hidden";
                  setUserInput(e.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    verifyUserInput();
                  }
                }}
                spellCheck="false"
                placeholder="Guess here"
                type="text"
                name="gameinput"
                id="user-input"
                value={userInput}
                autoComplete="off"
                className="my-5"
              />
              <button onClick={() => skipFlag()} className="game-btn">
                Skip
              </button>
            </div>
          </div>
        </div>
      ) : (
        // UI For the end of the game
        <div className="game-presentation">
          <div>Global time spend to find all the flags : {globalTimer}</div>
          <div className="d-flex flags-bloc">
            {randomArrayOfFlags.map((item, index) => (
              <div className="card" key={index} country={item.name.common}>
                <img className="card-flag" src={item.flags.png} alt="" />
                <div className="card-country my-2">{item.name.common}</div>
                {item.answer ? (
                  <div className="good-answer">Good Answer !</div>
                ) : (
                  <div className="bad-answer">Bad Answer !</div>
                )}
              </div>
            ))}
          </div>
          <button className="game-btn">New Game</button>
        </div>
      )}
    </>
  );
};

export default Playwithflags;
