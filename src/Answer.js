import React from "react";

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

export default Answer;
