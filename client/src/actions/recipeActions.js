import axios from "axios";
import {
  GET_ERRORS,
  GET_RECIPE,
  GET_RECIPE_REQUEST,
  LIKED_RECIPE,
  DISLIKED_RECIPE,
  VOTE_CLICKED
} from "./types";

import { reset } from "redux-form";

// Create Recipe
export const createRecipe = (recipeData, history) => dispatch => {
  axios
    .post("/profile/create-recipe", recipeData)
    .then(res => {
      //clear the recipe form after successful submit
      dispatch(reset("newRecipe"));
      let recipe_id = res.data.recipe_id;
      // redirect to home after successful submit
      return history.push(`/recipe/${recipe_id}`);
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const getRecipe = (recipe_id, user_id) => dispatch => {
  dispatch({ type: GET_RECIPE_REQUEST });
  axios
    .get("/recipe", { params: { recipe_id, user_id } })
    .then(res => {
      dispatch({ type: GET_RECIPE, payload: res.data });
      if (res.data.vote === "liked") {
        dispatch({ type: LIKED_RECIPE });
      } else if (res.data.vote === "disliked") {
        dispatch({ type: DISLIKED_RECIPE });
      }
      // else if diliked displach disliked
    })
    .catch(err => dispatch({ type: GET_ERRORS, payload: err }));
};

// This is an action creator for when a user likes a recipe
export const likeRecipe = (recipe_id, user_id) => dispatch => {
  const vote = "liked";
  dispatch({ type: VOTE_CLICKED });
  if (user_id !== null) {
    dispatch({ type: LIKED_RECIPE });
    console.log(recipe_id, user_id, vote);
    axios
      .post("/recipe/vote", { user_id, recipe_id, vote })
      .then(res => {
        console.log("User Liked the recipe");
      })
      .catch(err => console.log(err));
  }
};

export const dislikeRecipe = (recipe_id, user_id) => dispatch => {
  const vote = "disliked";
  dispatch({ type: VOTE_CLICKED });
  if (user_id !== null) {
    dispatch({ type: DISLIKED_RECIPE });
    console.log(recipe_id, user_id, vote);
    axios
      .post("/recipe/vote", { user_id, recipe_id, vote })
      .then(res => {
        console.log("User disliked the recipe");
      })
      .catch(err => console.log(err));
  }
};
