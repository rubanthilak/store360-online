import React from "react";
import "./style.scss"

function Bounce(props) {
  return (
    <div className={`spinner ${props.className}`}>
      <div className="bounce1"></div>
      <div className="bounce2"></div>
      <div className="bounce3"></div>
    </div>
  );
}

export default Bounce;
