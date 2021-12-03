import React, { useState, useReducer, useEffect } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import data from "./data.js";
import { FacebookShareButton, WhatsappShareButton } from "react-share";
import { FacebookIcon, WhatsappIcon } from "react-share";
const initialResults = { A: 0, B: 0, C: 0, D: 0 };

function Header() {
  return (
    <div className="header">
      {/* <h1>CYC</h1> */}
      <h4 className="headerChild">
        <a href="https://cyctailor.com">
          <img className="cycLogo" src="../cycLogo.png" />
        </a>
      </h4>
      <h4>CYC Personality Quiz</h4>
    </div>
  );
}

function Footer() {
  return (
    <div className="footer">
      <h5 className="footerChild">Ⓒ 2021 CYC Company Pte Ltd</h5>
    </div>
  );
}

function Question({ pageNumber }) {
  return pageNumber.map((item) => {
    return (
      <div key={item.page} className="question">
        <h3>{item.question}</h3>
      </div>
    );
  });
}

function Answer({ pageNumber, handleClick }) {
  return pageNumber.map((item) => {
    return (
      <div className="imgBtnGrp" key={item.pageNumber}>
        {Object.entries(item.answer).map(([key, value]) => (
          <input
            type="image"
            key={key}
            className="imgBtn"
            src={value}
            onClick={handleClick}
            value={key}
          ></input>
        ))}
      </div>
    );
  });
}

function reducer(state, action) {
  switch (action.type) {
    case "A":
      return { ...state, A: state.A + 1 };
    case "B":
      return { ...state, B: state.B + 1 };
    case "C":
      return { ...state, C: state.C + 1 };
    case "D":
      return { ...state, D: state.D + 1 };
    default:
      throw new Error();
  }
}

function Results({ results }) {
  let sideText;
  let mainTrait;
  let personalityText;
  let youAre = "You are: ";
  let personality = [];
  let sortedResults = Object.fromEntries(
    Object.entries(results).sort(([, a], [, b]) => b - a)
  );
  let sideTrait = Object.entries(sortedResults)[1][0];
  switch (sideTrait) {
    case "A":
      sideTrait = "Romantic";
      break;
    case "B":
      sideTrait = "Classic";
      break;
    case "C":
      sideTrait = "Sartorial";
      break;
    case "D":
      sideTrait = "Natural";
      break;
    default:
      throw new Error();
  }
  for (let [key, value] of Object.entries(sortedResults)) {
    switch (key) {
      case "A":
        key = "Romantic";
        break;
      case "B":
        key = "Classic";
        break;
      case "C":
        key = "Sartorial";
        break;
      case "D":
        key = "Natural";
        break;
      default:
        throw new Error();
    }
    let percentage = +((value / data.length) * 100).toFixed(0);
    if (personality.length === 0) {
      mainTrait = key;
    }
    if (percentage === 0) {
      continue;
    }
    personality.push(`${percentage}% ${key}`);
    switch (mainTrait) {
      case "Romantic":
        personalityText =
          "You are a Romantic personality. Expressive, often showcasing your personality\
        through the lens of your clothings. There is no one favourite color as your dressing\
        style differs with your mood.";
        break;
      case "Classic":
        personalityText =
          "You are a Classic personality who dress himself sharp and according to\
        social conventions. Your favourite color is white and navy.";
        break;
      case "Sartorial":
        personalityText =
          "You have a Sartorial personality. You are often dressed sharply, and pay meticulous attention to details.";
        break;
      case "Natural":
        personalityText =
          "You have a Natural personality. You favor colors that goes well with each other, typically earthy tones as\
        they showcase the simplicity of your dresing.";
        break;
      default:
        throw new Error();
    }
    switch (sideTrait) {
      case "Romantic":
        sideText =
          " You are also an expressive romantic, often showcasing your personality\
        through the lens of your clothings. There is no one favourite color as your dressing\
        style differs with your mood.";
        break;
      case "Classic":
        sideText =
          " Also, you are a classic person who dress himself sharp and according to\
        social conventions. Your favourite color is white and navy.";
        break;
      case "Sartorial":
        sideText =
          " Also, your sartorial style means that you are often dressed sharply, and pay meticulous attention to details.";
        break;
      case "Natural":
        sideText =
          " Also,your natural side favor colors that goes well with each other, typically earthy tones as\
        they showcase the simplicity of your dresing.";
        break;
      default:
        throw new Error();
    }
  }
  const personalityResult = personality.map((results) => <p>{results}</p>);
  return (
    <div className="results">
      <h3>{youAre}</h3>
      <b className="personalityResults">{personalityResult}</b>
      <p>
        Your main personality is <b>{mainTrait}</b>, and your secondary
        personality is <b>{sideTrait}</b>.
      </p>
      <p className="personalityText">
        {personalityText}

        {sideText}
      </p>
      <br />
      <br />
      <FacebookShareButton
        className="fbShare"
        url={"https://quiz.cyctailor.com"}
        quote={`My personality is ${mainTrait}! Find out yours with CYC!`}
      >
        <FacebookIcon size={32} round />
        <p>Share on Facebook</p>
      </FacebookShareButton>
      <WhatsappShareButton
        className="waShare"
        title={"Find out your personality with CYC: "}
        url={"https://quiz.cyctailor.com"}
        separator={" "}
      >
        <WhatsappIcon size={32} round />
        <p>Share on WhatsApp</p>
      </WhatsappShareButton>
    </div>
  );
}

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
