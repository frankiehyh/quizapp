import React, { useState, useReducer, useEffect } from "react";
import ReactDOM from "react-dom";
import "./index.css";

const initialResults = { A: 0, B: 0, C: 0, D: 0 };

const data = [
  {
    page: 1,
    question: "At the museum, you will gravitate to..",
    answer: {
      A: "/assets/images/qA1.png",
      B: "/assets/images/qB1.png",
      C: "/assets/images/qC1.png",
      D: "/assets/images/qD1.png",
    },
  },
  {
    page: 2,
    question: "Your style icon resembles..",
    answer: {
      A: "assets/images/qA2.png",
      B: "assets/images/qB2.png",
      C: "assets/images/qC2.png",
      D: "assets/images/qD2.png",
    },
  },
  {
    page: 3,
    question: "The color palette that attracts you..",
    answer: {
      A: "assets/images/qA3.png",
      B: "assets/images/qB3.png",
      C: "assets/images/qC3.png",
      D: "assets/images/qD3.png",
    },
  },
  {
    page: 4,
    question: "The perfect place for a date..",
    answer: {
      A: "assets/images/qA4.png",
      B: "assets/images/qB4.png",
      C: "assets/images/qC4.png",
      D: "assets/images/qD4.png",
    },
  },
  {
    page: 5,
    question: "Your dressing for a show at the Esplanade..",
    answer: {
      A: "assets/images/qA5.png",
      B: "assets/images/qB5.png",
      C: "assets/images/qC5.png",
      D: "assets/images/qD5.png",
    },
  },
  {
    page: 6,
    question: "You have interest in..",
    answer: {
      A: "assets/images/qA6.png",
      B: "assets/images/qB6.png",
      C: "assets/images/qC6.png",
      D: "assets/images/qD6.png",
    },
  },
  {
    page: 7,
    question: "You would travel to..",
    answer: {
      A: "assets/images/qA7.png",
      B: "assets/images/qB7.png",
      C: "assets/images/qC7.png",
      D: "assets/images/qD7.png",
    },
  },
  {
    page: 8,
    question: "It's the weekends and you are found..",
    answer: {
      A: "assets/images/qA8.jpg",
      B: "assets/images/qB8.png",
      C: "assets/images/qC8.png",
      D: "assets/images/qD8.png",
    },
  },
];

function Header() {
  return (
    <div className="header">
      <h1>CYC</h1>
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
  let mainTrait;
  let youAre = "You are: ";
  let personality = [];
  let sortedResults = Object.fromEntries(
    Object.entries(results).sort(([, a], [, b]) => b - a)
  );
  console.log(sortedResults);
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
  }
  const personalityResult = personality.map((results) => <p>{results}</p>);
  return (
    <div className="results">
      <h3>{youAre}</h3>
      <b>{personalityResult}</b>
      <hr />
      <p>Your main personality is: {mainTrait}</p>
    </div>
  );
}

function App() {
  const useSemiPersistantState = (key, initialState) => {
    const [value, setValue] = useState(
      localStorage.getItem(key) || initialState
    );
    useEffect(() => {
      localStorage.setItem(key, value);
    }, [value, key]);
    return [value, setValue];
  };
  // const [loggedIn, setLogin] = useSemiPersistantState("loggedIn", false);
  // const [name, setName] = useSemiPersistantState('name', 'Guest');
  const [name, setName] = useState("");
  // const changes = (e) => setName(e.name);
  // const responseFacebook = (response) => {
  //   changes(response);
  //   setLogin(true);
  //   setName(response.name);
  // };
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
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
