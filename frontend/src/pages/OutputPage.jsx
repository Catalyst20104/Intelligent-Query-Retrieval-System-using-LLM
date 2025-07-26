import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./OutputPage.css";

export default function OutputPage() {
  const { state } = useLocation();
  const navigate = useNavigate();

  return (
    <div className="output-container">
      <h1>Processing Results</h1>
      <div className="output-card">
        <p><strong>Uploaded File:</strong> {state?.fileName || "No file"}</p>
        <p><strong>Query:</strong> {state?.query || "No query"}</p>
        <p><strong>Result:</strong> AI processing result will be shown here...</p>
        <button onClick={() => navigate("/")}>Go Back</button>
      </div>
    </div>
  );
}
