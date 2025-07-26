import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UploadPage from "./pages/InputPage";
import OutputPage from "./pages/OutputPage";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<UploadPage />} />
      <Route path="/output" element={<OutputPage />} />
    </Routes>
  </BrowserRouter>
);
