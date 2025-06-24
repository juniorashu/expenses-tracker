// src/pages/AiPage.jsx
import React, { useState } from "react";
import "./deepseek.css"; // We'll create this CSS file next

const AiPage = () => {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

const handleAskAI = async () => {
  if (!prompt.trim()) return;
  setLoading(true);
  setResponse("");

  try {
    const token = localStorage.getItem("token");
    console.log("Token being sent:", token); // ✅ Debug line

    const res = await fetch("https://expenses-tracker-jn6x.onrender.com/api/ai/summary", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ prompt }),
    });

    const data = await res.json();
    setResponse(data.summary || data.error);
  } catch (err) {
    setResponse(`❌ Failed to fetch AI response: ${err.message}`);
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="ai-container">
      <div className="ai-card">
        <h2 className="ai-title">🤖 Ask the AI Anything</h2>
        <textarea
          className="ai-input"
          placeholder="Type your question..."
          rows="5"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        ></textarea>
        <button className="ai-button" onClick={handleAskAI} disabled={loading}>
          {loading ? "Thinking..." : "Ask AI"}
        </button>

        <div className="ai-output">
          {response && (
            <>
              <h4 className="ai-response-title">📢 AI Response:</h4>
              <p className="ai-response-text">{response}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AiPage;
