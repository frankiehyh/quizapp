import React, { useState, useReducer, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import Button from '@mui/material/Button';

const initialResults = {A: 0, B: 0, C: 0, D: 0};

const data = [
  {
    page: 1,
    question: 'At the museum, you will gravitate to..',
    answer: {
      A: '/assets/images/qA1.jpg',
      B: '/assets/images/qB1.jpg',
      C: '/assets/images/qC1.jpg',
      D: '/assets/images/qD1.jpg',
    }
  },
  {
    page: 2,
    question: 'Your style icon resembles..',
    answer: {
      A: 'assets/images/qA2.jpg',
      B: 'assets/images/qB2.jpg',
      C: 'assets/images/qC2.jpg',
      D: 'assets/images/qD2.jpg',
    }
  },
  {
    page: 3,
    question: 'The color palette that attracts you..',
    answer: {
      A: 'assets/images/qA3.jpg',
      B: 'assets/images/qB3.jpg',
      C: 'assets/images/qC3.jpg',
      D: 'assets/images/qD3.jpg',
    }
  },
  {
    page: 4,
    question: 'The perfect place for a date..',
    answer: {
      A: 'assets/images/qA4.jpg',
      B: 'assets/images/qB4.jpg',
      C: 'assets/images/qC4.jpg',
      D: 'assets/images/qD4.jpg',
    }
  },
  {
    page: 5,
    question: 'Your dressing for a show at the Esplanade..',
    answer: {
      A: 'assets/images/qA5.jpg',
      B: 'assets/images/qB5.jpg',
      C: 'assets/images/qC5.jpg',
      D: 'assets/images/qD5.jpg',
    }
  },
  {
    page: 6,
    question: 'You have interest in..',
    answer: {
      A: 'assets/images/qA6.jpg',
      B: 'assets/images/qB6.jpg',
      C: 'assets/images/qC6.jpg',
      D: 'assets/images/qD6.jpg',
    }
  },
  {
   page: 7,
   question: 'You would travel to..',
   answer: {
     A: 'assets/images/qA7.jpg',
     B: 'assets/images/qB7.jpg',
     C: 'assets/images/qC7.jpg',
     D: 'assets/images/qD7.jpg',
   } 
  },
  {
    page: 8,
    question: 'It\'s the weekends and you are found..',
    answer: {
      A: 'assets/images/qA8.jpg',
      B: 'assets/images/qB8.jpg',
      C: 'assets/images/qC8.jpg',
      D: 'assets/images/qD8.jpg',
    }
  }
];

function Question({pageNumber}) { 
  return pageNumber.map(item => {
  return (
    <div key={item.page} className='question'>
      <h3>{item.question}</h3>
    </div>
  )
})
}

function Answer({pageNumber, handleClick}) {
  return pageNumber.map(item => {
    return (
      <div className='imgBtnGrp' key={item.pageNumber}>{Object.entries(item.answer).map(([key, value]) => <input type='image' key={key} className='imgBtn' src={value} onClick={handleClick} value={key}></input>)}</div> 
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
  let mainTrait;
  let youAre = 'You are: ';
  let personality = [];
  let sortedResults = Object.fromEntries(Object.entries(results).sort(([, a], [, b]) => b - a))
  console.log(sortedResults);
  for (let [key, value] of Object.entries(sortedResults)) {
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
    let percentage = +(((value/(data.length)) * 100).toFixed(0));
    if (personality.length === 0) {
      mainTrait = key;
    }
    if (percentage === 0) {
      continue
    };
    personality.push(`${percentage}% ${key}`); 
  }
  const personalityResult = personality.map(results => <p>{results}</p>)
  return (
  <div className='results'>
    <h3>{youAre}</h3>
    <b>{personalityResult}</b>
    <hr/>
    <p>Your main personality is: {mainTrait}</p>
  </div>
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
    <div className={`main${currentPage === data.length + 1 ? 'Results': ''}`}>
      <Question pageNumber={pageNumber()} />
      <Answer pageNumber={pageNumber()} handleClick={handleClick} />
      {currentPage === data.length + 1 ? (<Results results={results} />) : ''}
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))

