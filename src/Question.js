import React from "react";

function Question({ pageNumber }) {
  return pageNumber.map((item) => {
    return (
      <div key={item.page} className="question">
        <h3>{item.question}</h3>
      </div>
    );
  });
}

export default Question;
