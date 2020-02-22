import React from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import MediaQuery from "react-responsive";
import Header from "./header";
import HeaderDesktop from "../header_desktop";
import RecipeDetails from "./RecipeDetails";
import Ingredients from "./ingredients";
import Directions from "./directions";
import Review from "./review";
import More from "./more";
import { getRecipe, submitEditRecipe } from "../../actions/recipe";
import convertTime from "../../selectors/time-selector";
import Loading from "../loading";
import Edit from "./edit";
import "./recipe.scss";

class Recipe extends React.Component {
  componentDidMount() {
    const recipe_id = this.props.match.params.recipe_id;
    const user_id = this.props.user_id;
    this.props.getRecipe(recipe_id, user_id);
  }

  handleSubmit = values => {
    this.props.submitEditRecipe(values);
  };

  handleBackClick = () => {
    this.props.history.location.key
      ? this.props.history.goBack()
      : this.props.history.push("/");
  };

  render() {
    const recipe_id = this.props.match.params.recipe_id;
    const user_id = this.props.user_id;
    const {
      reviewOpen,
      showMoreOpen,
      isFetching,
      editRecipe,
      recipe: { image_url, directions, footnote, time, title, username }
    } = this.props.recipeData;
    document.title = !title ? document.title : `${title} |  Zipiwisk`;

    // display loading if isFetching
    if (isFetching) {
      return <Loading />;
    }

    if (editRecipe) {
      return <Edit />;
    }

    if (reviewOpen) {
      return <Review recipe_id={recipe_id} />;
    }

    return (
      <div className="recipe">
        <MediaQuery maxDeviceWidth={649}>
          <Header
            recipe_id={recipe_id}
            user_id={user_id}
            handleBackClick={this.handleBackClick}
          />
          {showMoreOpen ? <More className="recipe-more" /> : null}
          <img
            className="recipe__img"
            href="recipe photo"
            alt=""
            src={image_url}
          />

          <div className="recipe__container">
            <RecipeDetails time={time} />
            <Ingredients />
            <Directions
              directions={directions}
              time={time}
              footnote={footnote}
            />
            <div className="recipe__created-by">
              Recipe by {username.toLowerCase()}
            </div>
          </div>
        </MediaQuery>

        <MediaQuery minDeviceWidth={650}>
          <HeaderDesktop
            isAuth={this.props.isAuth}
            user_img={this.props.user_img}
          >
            <div className="recipe__d-back-btn" onClick={this.handleBackClick}>
              Go back
            </div>
            <More className="header-d-more" />
          </HeaderDesktop>
          <Ingredients />

          <div className="recipe__container">
            <RecipeDetails time={time} />
            <Directions
              directions={directions}
              time={time}
              footnote={footnote}
            />
            <img
              className="recipe__img"
              href="recipe photo"
              alt=""
              src={image_url}
            />
            <div className="recipe__created-by">
              Recipe by {username.toLowerCase()}
            </div>
          </div>
        </MediaQuery>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  recipeData: {
    ...state.recipe,
    recipe: { ...state.recipe.recipe, time: convertTime(state) }
  },
  user_id: state.auth.user.user_id,
  isAuth: state.auth.isAuthenticated,
  user_img: state.auth.user.image_url
});
Recipe = connect(
  mapStateToProps,
  { getRecipe, submitEditRecipe }
)(Recipe);

export default withRouter(Recipe);
