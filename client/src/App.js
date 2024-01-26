// React Tools
import React, { createContext, useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// Plugins
import axios from "axios";
// Components
import Home from "./pages/Home";
import Log from "./pages/Log";
import Flags from "./pages/Flags";
import Game from "./pages/Game";
import Layout from "./components/layout/Layout";
import Profil from "./pages/Profil";
import Leaderboard from "./pages/Leaderboard";
// CSS Framework
import "bootstrap/dist/css/bootstrap.min.css";
// Context
export const AppContext = createContext(null);

const App = () => {
  // Context Variables
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [loginOrSignup, setLoginOrSignup] = useState(true);
  const [darkMode, setDarkMode] = useState("light");
  const [dataOfFlags, setDataOfFlags] = useState([]);

  // Call to the extern API to get flags data
  useEffect(() => {
    axios
      .get(
        "https://restcountries.com/v3.1/all?fields=name,capital,region,population,flags,translations"
      )
      .then((res) => setDataOfFlags(res.data));
  }, []);

  return (
    <AppContext.Provider
      value={{
        sidebarOpen,
        setSidebarOpen,
        loginOrSignup,
        setLoginOrSignup,
        darkMode,
        setDarkMode,
        dataOfFlags,
        setDataOfFlags,
      }}
    >
      <BrowserRouter>
        <Layout />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Log />}></Route>
          <Route path="/flags" element={<Flags />}></Route>
          <Route path="/game" element={<Game />}></Route>
          <Route path="/profil" element={<Profil />}></Route>
          <Route path="/leaderboard" element={<Leaderboard />}></Route>
          <Route path="*" element={<Home />}></Route>
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  );
};

export default App;
