import React from "react";
import { connect } from "react-redux";
import MediaQuery from "react-responsive";
import { withRouter } from "react-router-dom";
import Header from "./header";
import HeaderDesktop from "../../header_desktop";
import RecipeUpsert from "../../recipe_upsert";
import { createRecipe } from "../../../actions/recipe";

import "./profile-create_recipe.scss";

class CreateRecipe extends React.Component {
  componentDidMount() {
    document.title = "Zipiwhisk | Create Recipe";
  }

  handleSubmit = values => {
    this.props.createRecipe(values, this.props.history);
  };

  handleBackClick = () => {
    this.props.history.goBack();
  };

  render() {
    const initialValues = {
      categories: [],
      imageFile: null
    };
    return (
      <div className="create-recipe">
        <MediaQuery maxDeviceWidth={649}>
          <Header onClick={this.handleBackClick} />
        </MediaQuery>
        <MediaQuery minDeviceWidth={650}>
          <HeaderDesktop isAuth={true} user_img={this.props.user_img} />
        </MediaQuery>
        <h1 className="create-recipe__title">Create Recipe</h1>
        <RecipeUpsert
          initialValues={initialValues}
          destroyOnUnmount={false}
          submitText="Save"
          onSubmit={this.handleSubmit}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user_img: state.auth.user.image_url
});
export default withRouter(
  connect(
    mapStateToProps,
    { createRecipe }
  )(CreateRecipe)
);
