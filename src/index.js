import React, { useState, useReducer, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Button from '@mui/material/Button';

const initialResults = {A: 0, B: 0, C: 0, D: 0};

const data = [
  {
    page: 1,
    question: 'What is your favorite fruit?',
    answer: {
      A: 'Banana',
      B: 'Cherry',
      C: 'Apple',
      D: 'Watermelon'
    }
  },
  {
    page: 2,
    question: 'What is your favourite cuisine?',
    answer: {
      A: 'Japanese',
      B: 'Thai',
      C: 'European',
      D: 'American',
    }
  },
  {
    page: 3,
    question: 'It is Sunday. What will you be doing?',
    answer: {
      A: 'Reading news',
      B: 'Outdoor adventure',
      C: 'Catching up on sleep!',
      D: 'Out in town to shop :-)'
    }
  },
  {
    page: 4,
    question: 'When it comes to tailoring, you are looking for...',
    answer: {
      A: 'Service',
      B: 'Quality',
      C: 'Fit',
      D: 'Convenience'
    }
  },
];

function Question({pageNumber}) { 
  return pageNumber.map(item => {
  return (
    <div key={item.page}>
      <h1>{item.question}</h1>
    </div>
  )
})
}

function Answer({pageNumber, handleClick}) {
  return pageNumber.map(item => {
    return (
      Object.entries(item.answer).map(([key, value]) => <Button variant='contained' onClick={handleClick} value={key}>{value}</Button>) 
    )
  })
}

function reducer(state, action) {
  switch (action.type) {
    case 'A':
      return {...state, A: state.A + 1,};
    case 'B':
      return {...state, B: state.B + 1,};
    case 'C':
      return {...state, C: state.C + 1,};
    case 'D':
      return {...state, D: state.D + 1,};
    default: 
      throw new Error();
  }
}

function Results({results}) {
  let personality = `You are `;
  for (let [key, value] of Object.entries(results)) {
    switch (key) {
      case 'A':
        key = 'Romantic';
        break;
      case 'B':
        key = 'Classic';
        break;
      case 'C':
        key = 'Sartorial';
        break;
      case 'D':
        key = 'Natural';
        break;
    }
    let percentage = (value/(data.length)) * 100
    personality += `${percentage}% ${key} ` 
  }
  return (
  <>
  <h1>{personality}</h1>
  </>
  )
}

function App() {
  const [currentPage, setNextPage] = useState(1);
  const [results, setResults] = useReducer(reducer, initialResults);

  const handleClick = e => {
    setResults(({type: e.target.value}), );
    setNextPage(currentPage + 1);
  }

  function pageNumber() {
    return data.filter(item => item.page === currentPage);
  }

  return (
    <div>
      <Question pageNumber={pageNumber()} />
      <Answer pageNumber={pageNumber()} handleClick={handleClick} />
      {currentPage === data.length + 1 ? (<Results results={results} />) : ''}
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))