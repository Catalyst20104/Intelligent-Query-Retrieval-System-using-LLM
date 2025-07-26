import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./InputPage.css";

export default function InputPage() {
  const [file, setFile] = useState(null);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send file and query to backend later
    navigate("/output", { state: { fileName: file?.name, query } });
  };

  return (
    <div className="input-container">
      <h1>Data Processing Platform</h1>
      <p>Upload your data and transform it into actionable insights</p>
      <form className="input-card" onSubmit={handleSubmit}>
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          required
        />
        <input
          type="text"
          placeholder="Enter your question..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          required
        />
        <button type="submit">Process</button>
      </form>
    </div>
  );
}
