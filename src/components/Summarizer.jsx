import React, { useState } from "react";
import axios from "axios"; // Import Axios

const Summarizer = () => {
  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");

  const handleSummarize = async () => {
    try {
      const response = await axios.post("http://localhost:5000/summarize", {
        text,
      });
      setSummary(response.data.summary);
    } catch (error) {
      console.error("Error summarizing text:", error);
      setSummary("Error summarizing text");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <textarea
        className="w-full max-w-2xl p-4 mb-4 border border-gray-300 rounded-lg shadow-sm"
        rows="10"
        placeholder="Enter text to summarize..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      ></textarea>
      <button
        className="px-6 py-2 mb-4 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
        onClick={handleSummarize}
      >
        Summarize
      </button>
      {summary && (
        <div className="w-full max-w-2xl p-4 bg-white border border-gray-300 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold">Summary:</h2>
          <p>{summary}</p>
        </div>
      )}
    </div>
  );
};

export default Summarizer;
