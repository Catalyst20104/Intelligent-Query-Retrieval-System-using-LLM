import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import InputPage from "./pages/InputPage";
import OutputPage from "./pages/OutputPage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<InputPage />} />
        <Route path="/output" element={<OutputPage />} />
      </Routes>
    </Router>
  );
}
