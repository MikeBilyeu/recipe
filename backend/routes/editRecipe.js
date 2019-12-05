const Router = require("express-promise-router");
const db = require("../db");
const router = new Router();
const passport = require("passport");
module.exports = router;

router.put(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (request, response) => {
    const { user_id } = request.user; // Get user_id from auth
    const {
      recipe_id,
      created_by,
      time,
      servings,
      ingredients,
      directions,
      footnote,
      categories,
      keywords
    } = request.body;
    const title = request.body.title.trim();

    const timeHours = time.hours > 0 ? time.hours : 0;
    const timeMinutes = time.minutes > 0 ? parseInt(time.minutes) : 0;
    const total_time_mins = timeHours * 60 + timeMinutes;

    if (user_id !== created_by) {
      response.status(401).send("You can't edit this recipe");
    }

    try {
      await db.query(
        `UPDATE recipes
       SET title = $1, servings = $2, ingredients = $3, directions = $4,
        footnote = $5, categories = $6, keywords = $7, total_time_mins = $8
       WHERE recipe_id = $9`,
        [
          title,
          servings,
          ingredients,
          directions,
          footnote,
          categories,
          keywords,
          total_time_mins,
          recipe_id
        ]
      );
      response.status(200).send("Changes saved!");
    } catch (err) {
      response.status(500).json(err);
    }
  }
);