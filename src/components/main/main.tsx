import React from "react";
import { Routes, Route } from "react-router-dom";
import "./main.css";
import Jobs from "../../pages/jobs/jobs";
import Favourites from "../../pages/favourites/favourites";

const Main = () => {
  return (
    <main className="main">
      <Routes>
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/favourites" element={<Favourites />} />
      </Routes>
    </main>
  );
};

export default Main;
