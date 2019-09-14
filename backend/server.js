const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;
const createUser = require("./queries/createUser").createUser;
const userLogin = require("./queries/userLogin").userLogin;
const createRecipe = require("./queries/createRecipe").createRecipe;
const getRecipe = require("./queries/getRecipe").getRecipe;
const voteRecipe = require("./queries/voteRecipe").voteRecipe;
const saveRecipe = require("./queries/saveRecipe").saveRecipe;
const getSavedRecipes = require("./queries/getSavedRecipes").getSavedRecipes;
const getMyRecipes = require("./queries/getMyRecipes").getMyRecipes;
const getBrowseRecipes = require("./queries/getBrowseRecipes").getBrowseRecipes;
const getSearchRecipes = require("./queries/getSearchRecipes").getSearchRecipes;
const getUsernames = require("./queries/getUsernames").getUsernames;
const getEmails = require("./queries/getEmails").getEmails;
const editProfile = require("./queries/editProfile").editProfile;
const passport = require("passport");

// Parse middleware
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true
  })
);

// Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);

// routes
app.post("/register", createUser);

app.post("/login", userLogin);

app.post(
  "/profile/create-recipe",
  passport.authenticate("jwt", { session: false }),
  createRecipe
);

app.get("/recipe", getRecipe);

//post route for Liked_recips
app.post(
  "/recipe/vote",
  passport.authenticate("jwt", { session: false }),
  voteRecipe
);

// post route for saved recipes
app.post(
  "/save-recipe",
  passport.authenticate("jwt", { session: false }),
  saveRecipe
);

// get saved recipes
app.get(
  "/save-recipe",
  passport.authenticate("jwt", { session: false }),
  getSavedRecipes
);

// get my recipes
app.get(
  "/my-recipe",
  passport.authenticate("jwt", { session: false }),
  getMyRecipes
);

// get Browse recipes
app.get("/browse-recipe", getBrowseRecipes);

// get Search recipes
app.get("/search-recipe", getSearchRecipes);

// Check if username is available
app.get("/usernames", getUsernames);

// Check if email is in use
app.get("/emails", getEmails);

// Check if email is in use
app.post(
  "/edit-profile",
  passport.authenticate("jwt", { session: false }),
  editProfile
);

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}.`);
});
