import React from "react";
import { Route, Switch, Link } from "react-router-dom";
import { connect } from "react-redux";

// Actions
import {
  getMyRecipes,
  getSavedRecipes,
  toggleSortButton
} from "../../actions/recipeActions";
import { getUser } from "../../actions/authActions";

// Components
import RecipeContainer from "./RecipeContainer";
import SortBy from "./SortBy";
import { SortButton } from "../sort-button/SortButton";
import EditProfile from "./edit-profile/EditProfile";
import CreateRecipe from "./createRecipe/CreateRecipe";
import { Button } from "../Button";
import { ReactComponent as UserIcon } from "../../images/userProfile.svg";
import { ReactComponent as WhiskIcon } from "../../images/WhiskIcon.svg";
import { ReactComponent as SavedIcon } from "../../images/savedRecipes.svg";
import { ReactComponent as MyRecipesIcon } from "../../images/myRecipes.svg";

// Styles
import "./profile-styles.css";

class Profile extends React.Component {
  //add state to toggle saved / my recipes
  constructor(props) {
    super(props);
    this.state = {
      page: "saved"
    };
  }

  componentDidMount() {
    this.props.getUser();
    const user_id = this.props.auth.isAuthenticated
      ? this.props.auth.user.user_id
      : null;
    this.props.getMyRecipes(user_id);
    this.props.getSavedRecipes(user_id);
  }

  handleClick = page => {
    this.setState({ page });
  };

  render() {
    const page = this.state.page;
    const { sortActive, sortBy } = this.props.savedRecipes;

    const savedActive = page === "saved" ? "active" : "";
    const myRecipesActive = page === "myRecipes" ? "active" : "";
    return (
      <Switch>
        <Route path="/profile/edit" component={EditProfile} />
        <Route path="/profile/create-recipe" component={CreateRecipe} />
        <Route
          component={() => {
            return (
              <div className="profile">
                <div
                  style={{
                    display: "grid",
                    placeItems: "cetner",
                    backgroundColor: "#FFF",
                    position: "fixed",
                    width: "100%",
                    height: "2.1rem"
                  }}
                >
                  <WhiskIcon
                    style={{
                      width: "5rem",
                      margin: ".2rem auto"
                    }}
                  />
                </div>
                <div className="profile-header">
                  <Link
                    style={{
                      display: "grid",
                      placeItems: "center"
                    }}
                    to="/profile/edit"
                    className="profile-edit"
                  >
                    <UserIcon style={{ width: "3.5rem" }} />
                    <div
                      style={{
                        color: "#0172C4",
                        fontSize: "1rem",
                        margin: ".3rem"
                      }}
                    >
                      Edit
                    </div>
                  </Link>
                  <h2
                    style={{
                      fontSize: "1.5rem",
                      fontWeight: "900",
                      margin: 0,
                      marginBottom: "1rem",
                      color: "#313131"
                    }}
                  >
                    {this.props.username.toLowerCase()}
                  </h2>
                </div>

                <div className="s-mr-toggle">
                  <Button
                    className={`authButton ${savedActive}`}
                    onClick={() => this.handleClick("saved")}
                  >
                    <SavedIcon style={{ width: "1.5rem" }} />
                  </Button>

                  <Button
                    className={`authButton ${myRecipesActive}`}
                    onClick={() => this.handleClick("myRecipes")}
                  >
                    <MyRecipesIcon style={{ width: "1.5rem" }} />
                  </Button>
                </div>
                <div>
                  {page === "saved" ? (
                    <RecipeContainer
                      recipes={this.props.savedRecipes.recipes}
                      containerName="Saved Recipes"
                    >
                      {sortActive && <SortBy />}
                      <div
                        className={
                          "sr-header" + (sortActive ? " remove-btm-border" : "")
                        }
                      >
                        <SortButton
                          onClick={this.props.toggleSortButton}
                          sortActive={sortActive}
                          sortBy={sortBy}
                        />
                      </div>
                    </RecipeContainer>
                  ) : (
                    <RecipeContainer
                      recipes={this.props.myRecipes.recipes}
                      containerName="My Recipes"
                    >
                      <Link to="/profile/create-recipe">
                        <div
                          style={{
                            backgroundColor: "#0172C4",
                            color: "#FFF",
                            padding: ".7rem 5rem",
                            margin: "1.5rem",
                            fontWeight: "bold",
                            borderRadius: "10rem",
                            textAlign: "center"
                          }}
                        >
                          Create Recipe
                        </div>
                      </Link>
                    </RecipeContainer>
                  )}
                </div>
              </div>
            );
          }}
        />
      </Switch>
    );
  }
}

const mapStateToProps = state => ({
  username: state.userData.user.username,
  auth: state.auth,
  savedRecipes: state.savedRecipes,
  myRecipes: state.myRecipes
});
export default connect(
  mapStateToProps,
  { getUser, getMyRecipes, getSavedRecipes, toggleSortButton }
)(Profile);
