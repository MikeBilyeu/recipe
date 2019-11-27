import React from "react";

const Directions = props => {
  const renderTime = () => {
    const { hours, minutes } = props.time;
    const hr = hours ? `${hours}Hr` : "";
    const min = minutes ? `${minutes}Min` : "";
    return `${hr} ${min}`;
  };

  const renderFootnote = () => {
    if (props.footnote !== null) {
      return (
        <div className="footnote">
          <p>
            <span style={{ fontWeight: "900", fontStyle: "normal" }}>
              {"Footnote: "}
            </span>
            {props.footnote}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="directions">
      <h2>Directions</h2>
      <div className="time">{renderTime()}</div>
      <p id="directions">{props.directions}</p>
      {renderFootnote()}
    </div>
  );
};

export default Directions;
