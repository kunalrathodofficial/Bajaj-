const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// File handling setup
const upload = multer({ storage: multer.memoryStorage() });

// Helper functions
const isPrime = (num) => {
  if (num < 2) return false;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false;
  }
  return true;
};

const processRequest = (data) => {
  const numbers = [];
  const alphabets = [];
  const lowercaseAlphabets = [];

  data.forEach((item) => {
    if (!isNaN(item)) {
      numbers.push(item);
    } else if (/^[a-zA-Z]$/.test(item)) {
      alphabets.push(item);
      if (item >= "a" && item <= "z") {
        lowercaseAlphabets.push(item);
      }
    }
  });

  return {
    numbers,
    alphabets,
    highestLowercaseAlphabet: lowercaseAlphabets.length
      ? [lowercaseAlphabets.sort().pop()]
      : [],
    isPrimeFound: numbers.some((num) => isPrime(Number(num))),
  };
};

// Routes
// GET route
app.get("/bfhl", (req, res) => {
  res.status(200).json({ operation_code: 1 });
});

// POST route
app.post("/bfhl", upload.single("file_b64"), (req, res) => {
  const { data, file_b64 } = req.body;

  if (!data || !Array.isArray(data)) {
    return res.status(400).json({ is_success: false, message: "Invalid input" });
  }

  const processedData = processRequest(data);
  const file = req.file;

  res.status(200).json({
    is_success: true,
    user_id: "kunal_123", 
    email: "kunal@xyz.com", 
    roll_number: "ABCD123", 
    ...processedData,
    file_valid: file ? true : false,
    file_mime_type: file ? file.mimetype : null,
    file_size_kb: file ? (file.size / 1024).toFixed(2) : null,
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
