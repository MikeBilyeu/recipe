const db = require("../../db");
module.exports = async (req, res) => {
  const { recipe_id } = req.query;
  const { user_id } = req.user; // Get user_id from auth
  try {
    // Delete saved recipe from db
    await db.query(
      `DELETE
          FROM "RECIPES_SAVES"
          WHERE user_id = $1
            AND recipe_id = $2`,
      [user_id, recipe_id]
    );
    res.status(200).send("unsaved");
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};
