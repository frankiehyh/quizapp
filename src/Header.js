import React from "react";

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

export default Header;
