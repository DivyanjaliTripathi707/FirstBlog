const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5001;
const API_PATH = "/api/blogs";

const allowedOrigins = [process.env.FRONTEND_ORIGIN || 'http://localhost:5173', 'http://localhost:5176'];
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error('CORS policy: origin not allowed'));
    },
  })
);
app.use(express.json());

const blogs = [
  {
    id: 1,
    title: "Sherlock Holmes",
    category: "Mystery",
    content: "The world's greatest detective solving impossible mysteries.",
  },
  {
    id: 2,
    title: "Charles Dickens",
    category: "Victorian",
    content: "Stories from Victorian England.",
  },
  {
    id: 3,
    title: "Power of Silence",
    category: "Mindset",
    content: "Silence helps improve focus and confidence.",
  },
  {
    id: 4,
    title: "Launchpad",
    category: "Books",
    content: "Books that change your mindset.",
  },
];

app.get(API_PATH, (req, res) => {
  res.json(blogs);
});

app.use((req, res) => {
  res.status(404).json({ error: "Not found" });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Internal server error" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}${API_PATH}`);
});