import React from "react";
import { connect } from "react-redux";

// import the actions
import { getBrowseRecipes } from "../../../../actions/browseActions";

let FilterOption = props => {
  const { option, browseData, filterType } = props;
  const handleClick = option => {
    // make filterType an array of options, clear search
    let browse = { ...browseData, [filterType]: option, search: "" };
    // call action if browse != browse or if search != ''
    if (
      JSON.stringify(browse) !== JSON.stringify(browseData) ||
      /\S/.test(props.browseData.search)
    ) {
      props.getBrowseRecipes(browse);
    }
  };

  let style = {
    color: "#464646",
    cursor: "pointer",
    margin: "0 1rem",
    width: "100%",
    whiteSpace: "nowrap",
    textAlign: "center",
    userSelect: "none",
    transition: "all .1s ease-out"
  };

  // check if option is in the browseData values to apply styles
  if (
    Object.values(props.browseData).indexOf(props.option) > 0 &&
    !/\S/.test(props.browseData.search)
  ) {
    style.color = "#0172C4";
    style.fontWeight = "bold";
  }

  return (
    <div
      key={props.option}
      style={style}
      onClick={() => {
        handleClick(props.option);
      }}
    >
      {props.option}
    </div>
  );
};

const mapSateToProps = state => {
  return {
    browseData: state.browseRecipes.browseData
  };
};

export default connect(
  mapSateToProps,
  { getBrowseRecipes }
)(FilterOption);
