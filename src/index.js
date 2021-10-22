import React, { useState, useReducer, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import Button from '@mui/material/Button';

const initialResults = {A: 0, B: 0, C: 0, D: 0};

const data = [
  {
    page: 1,
    question: 'What is your favorite fruit?',
    answer: {
      A: 'https://www.miffy.com/assets/img/icons/og-image-200x200.png',
      B: 'https://www.miffy.com/assets/img/icons/og-image-200x200.png',
      C: 'https://www.miffy.com/assets/img/icons/og-image-200x200.png',
      D: 'https://www.miffy.com/assets/img/icons/og-image-200x200.png'
    }
  },
  {
    page: 2,
    question: 'What is your favourite cuisine?',
    answer: {
      A: 'https://is4-ssl.mzstatic.com/image/thumb/Purple125/v4/7b/27/20/7b2720a6-f75e-21c7-6338-8dc0df961cc5/AppIcon-0-0-1x_U007emarketing-0-0-0-10-0-0-sRGB-0-0-0-GLES2_U002c0-512MB-85-220-0-0.png/200x200bb.png',
      B: 'https://is4-ssl.mzstatic.com/image/thumb/Purple125/v4/7b/27/20/7b2720a6-f75e-21c7-6338-8dc0df961cc5/AppIcon-0-0-1x_U007emarketing-0-0-0-10-0-0-sRGB-0-0-0-GLES2_U002c0-512MB-85-220-0-0.png/200x200bb.png',
      C: 'https://is4-ssl.mzstatic.com/image/thumb/Purple125/v4/7b/27/20/7b2720a6-f75e-21c7-6338-8dc0df961cc5/AppIcon-0-0-1x_U007emarketing-0-0-0-10-0-0-sRGB-0-0-0-GLES2_U002c0-512MB-85-220-0-0.png/200x200bb.png',
      D: 'https://is4-ssl.mzstatic.com/image/thumb/Purple125/v4/7b/27/20/7b2720a6-f75e-21c7-6338-8dc0df961cc5/AppIcon-0-0-1x_U007emarketing-0-0-0-10-0-0-sRGB-0-0-0-GLES2_U002c0-512MB-85-220-0-0.png/200x200bb.png',
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
      <div className='imgBtnGrp'>{Object.entries(item.answer).map(([key, value]) => <input type='image' className='imgBtn' src={value} onClick={handleClick} value={key}></input>)}</div> 
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

