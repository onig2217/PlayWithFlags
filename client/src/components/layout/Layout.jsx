import React, { useContext } from "react";
import Sidebar from "../navigation/Sidebar";
import "../../styles/navigation/sidebar.css";
import Topbar from "../navigation/Topbar";
import { useState } from "react";
import Footer from "../footer/Footer";
import { AppContext } from "../../App";

const Layout = () => {
  const { sidebarOpen, setSidebarOpen } = useContext(AppContext);
  // const theme = useContext(AppContext);
  // const [sidebarOpen, setSidebarOpen] = useContext(AppContext);
  // const { sidebarOpen, setSidebarOpen } = useContext(AppContext);
  return (
    <div id="layout">
      <Topbar value={sidebarOpen} changeValue={setSidebarOpen} />
      <Sidebar value={sidebarOpen} />
      {/* <h1>{theme}</h1> */}
      <Footer />
    </div>
  );
};

export default Layout;
