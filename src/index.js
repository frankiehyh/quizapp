import React, { useState, useReducer, useEffect } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import data from "./data.js";
import reducer from "./reducer.js";
import Header from "./Header.js";
import Footer from "./Footer.js";
import Question from "./Question.js";
import Answer from "./Answer.js";
import Results from "./Results.js";

const initialResults = { A: 0, B: 0, C: 0, D: 0 };

function App() {
  const [currentPage, setNextPage] = useState(1);
  const [results, setResults] = useReducer(reducer, initialResults);
  const handleClick = (e) => {
    setResults({ type: e.target.value });
    setNextPage(currentPage + 1);
  };
  function pageNumber() {
    return data.filter((item) => item.page === currentPage);
  }

  return (
    <div className={`main${currentPage === data.length + 1 ? "Results" : ""}`}>
      <Header />
      <Question pageNumber={pageNumber()} />
      <Answer pageNumber={pageNumber()} handleClick={handleClick} />
      {currentPage === data.length + 1 ? <Results results={results} /> : ""}
      <Footer />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
