import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [search, setSearch] = useState("");
  const [info, setInfo] = useState([]);

  useEffect(() => {
    if (!search) {
      setInfo([]);
      return;
    }

    async function fetchData() {
      const response = await fetch(
        `https://pixabay.com/api/?key=17555297-46a99d3dc7abf78679ec9e640&q=${encodeURI(
          search
        )}&image_type=photo&pretty=true&per_page=6`
      );
      const { hits: data } = await response.json();
      setInfo(data);
    }
    fetchData();
  }, [search]);

  return (
    <div className="App">
      <input
        type="text"
        placeholder="search..."
        onChange={(event) => setSearch(event.target.value)}
      />
      <div>
        {info.map((el) => (
          <img key={el.id} src={el.webformatURL} alt={el.tags} />
        ))}
      </div>
    </div>
  );
}

export default App;
