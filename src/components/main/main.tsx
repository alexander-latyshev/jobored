import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./main.css";
import JobsPage from "../../pages/jobsPage/jobsPage";
import FavoritesPage from "../../pages/favoritesPage/favoritesPage";
import JobPage from "../../pages/vacancyPage/vacancyPage";

const Main = () => {
  return (
    <main className="main">
      <Routes>
        <Route path="/" element={<Navigate to="/jobs" />} />
        <Route path="/jobs" element={<JobsPage />} />
        <Route path="/favourites" element={<FavoritesPage />} />
        <Route path="/:category/:jobID" element={<JobPage />} />
      </Routes>
    </main>
  );
};

export default Main;
