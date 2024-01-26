import React, { useContext, useEffect } from "react";
import "../../styles/theme/theme.css";
import { AppContext } from "../../App";

const Theme = () => {
  const { darkMode, setDarkMode } = useContext(AppContext);

  const ChangeTheme = () => {
    if (darkMode === "light") {
      setDarkMode("dark");
    } else {
      setDarkMode("light");
    }
  };

  useEffect(() => {
    document.body.className = darkMode;
  }, [darkMode]);
  return (
    <div className="toggle">
      <input onChange={ChangeTheme} type="checkbox" id="toggle" />
      <label htmlFor="toggle"></label>
    </div>
  );
};

export default Theme;
