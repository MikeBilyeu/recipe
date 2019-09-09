import React from "react";
import { connect } from "react-redux";

import SortBy from "./SortBy";
import { Loading } from "../../loading/Loading";
import RecipeDisplayMini from "../../recipes/recipe-display/RecipeDisplayMini";
import { ReactComponent as Sort } from "../../browse/header/sort-button/SortIcon.svg";

import "./sr-styles.css";
// action Creator
import {
  getSavedRecipes,
  toggleSortButton
} from "../../../actions/recipeActions";

class SavedRecipes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sortActive: false
    };
  }

  componentDidMount() {
    const user_id = this.props.auth.isAuthenticated
      ? this.props.auth.user.user_id
      : null;
    this.props.getSavedRecipes(user_id);
  }

  renderRecipeList = () => {
    return this.props.savedRecipes.recipes.map((recipe, i) => {
      return <RecipeDisplayMini key={i} recipe={recipe} />;
    });
  };

  handleClick = () => {
    this.props.toggleSortButton();
  };

  render() {
    const { isFetching, toggleSortButton } = this.props.savedRecipes;
    console.log(this.props.savedRecipes.recipes);
    if (isFetching) {
      return <Loading />;
    }

    return (
      <div>
        {toggleSortButton ? <SortBy /> : null}
        <div
          className={
            "sr-header" + (toggleSortButton ? " remove-btm-border" : "")
          }
        >
          <Sort
            style={{ fill: toggleSortButton ? "#0172C4" : "#676767" }}
            onClick={this.handleClick}
            className={"arrowStyle" + (toggleSortButton ? " sortActive" : "")}
          />
        </div>
        <h3 style={{ textAlign: "center" }}>Saved Recipes</h3>

        <ul className="saved-recipes">{this.renderRecipeList()}</ul>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  savedRecipes: state.savedRecipes
});

export default connect(
  mapStateToProps,
  { getSavedRecipes, toggleSortButton }
)(SavedRecipes);
