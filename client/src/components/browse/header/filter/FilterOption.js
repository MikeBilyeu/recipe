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
      /\S/.test(browseData.search)
    ) {
      props.getBrowseRecipes(browse);
    }
  };

  return (
    <div
      key={option}
      style={{
        color:
          Object.values(browseData).indexOf(option) > 0 &&
          !/\S/.test(browseData.search)
            ? "#0172C4"
            : "#464646"
      }}
      className="filter-option"
      onClick={() => {
        handleClick(option);
      }}
    >
      {option}
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
