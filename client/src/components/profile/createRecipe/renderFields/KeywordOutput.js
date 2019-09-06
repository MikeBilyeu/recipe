import React from "react";
import { connect } from "react-redux";
import { formValueSelector } from "redux-form";
import { ReactComponent as Remove } from "../../../../images/remove.svg";

const KeywordOutput = props => {
  console.log(props.keywords);

  const handleClick = i => {
    let modKeywords = [...props.keywords];
    modKeywords.splice(i, 1);
    props.change(`keywords`, modKeywords);
  };
  return (
    <div>
      {props.keywords.map((keyword, i) => {
        return (
          <div
            key={keyword + i}
            style={{
              backgroundColor: "#535662",
              padding: ".5rem 1.5rem",
              color: "#FFF",
              textAlign: "center",
              display: "inline-grid",
              gridAutoFlow: "column",
              placeItems: "center",
              margin: ".5rem 1rem",
              borderRadius: "5rem",
              cursor: "pointer"
            }}
            onClick={() => {
              handleClick(i);
            }}
          >
            <span>{keyword}</span>
            <Remove
              style={{ width: ".8rem", height: ".8rem", marginLeft: ".8rem" }}
            />
          </div>
        );
      })}
    </div>
  );
};

const selector = formValueSelector("newRecipe");

const mapSateToProps = state => {
  return {
    keywords: selector(state, "keywords")
  };
};

export default connect(mapSateToProps)(KeywordOutput);