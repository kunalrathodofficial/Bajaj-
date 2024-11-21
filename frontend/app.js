import React, { useState } from "react";
import axios from "axios";

function App() {
  const [jsonInput, setJsonInput] = useState("");
  const [response, setResponse] = useState(null);
  const [filter, setFilter] = useState([]);

  const handleSubmit = async () => {
    try {
      const res = await axios.post("https://your-backend-url.com/bfhl", JSON.parse(jsonInput));
      setResponse(res.data);
    } catch (error) {
      alert("Invalid JSON or Server Error");
    }
  };

  const filteredResponse = () => {
    if (!response) return null;
    const filtered = {};
    if (filter.includes("Alphabets")) filtered.alphabets = response.alphabets;
    if (filter.includes("Numbers")) filtered.numbers = response.numbers;
    if (filter.includes("Highest Lowercase Alphabet"))
      filtered.highestLowercaseAlphabet = response.highestLowercaseAlphabet;
    return filtered;
  };

  return (
    <div>
      <h1>Your Roll Number</h1>
      <textarea
        placeholder="Enter JSON here"
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
      />
      <button onClick={handleSubmit}>Submit</button>

      {response && (
        <>
          <div>
            <label>Filter Response:</label>
            <select multiple onChange={(e) => setFilter(Array.from(e.target.selectedOptions, (opt) => opt.value))}>
              <option value="Alphabets">Alphabets</option>
              <option value="Numbers">Numbers</option>
              <option value="Highest Lowercase Alphabet">Highest Lowercase Alphabet</option>
            </select>
          </div>
          <pre>{JSON.stringify(filteredResponse(), null, 2)}</pre>
        </>
      )}
    </div>
  );
}

export default App;
