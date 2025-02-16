import express from "express"; // Use ES module syntax
import axios from "axios";
import cors from "cors";

const app = express(); // Initialize the Express app
const PORT = 5000;

app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON request bodies

// Root route
app.get("/", (req, res) => {
  res.send("Backend server is running!");
});

// Summarize route
app.post("/summarize", async (req, res) => {
  const { text } = req.body;
  const API_URL =
    "https://api-inference.huggingface.co/models/facebook/bart-large-cnn";
  const API_TOKEN = "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";

  try {
    const response = await axios.post(
      API_URL,
      { inputs: text },
      {
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = response.data;
    res.json({ summary: data[0]?.summary_text || "Error summarizing text" });
  } catch (error) {
    console.error("API Error:", error.response?.data || error.message);
    res.status(500).json({ error: error.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
