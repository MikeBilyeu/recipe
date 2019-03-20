const Pool = require("pg").Pool;

const keys = require("../config/keys");

// Connect to pool
const pool = new Pool({
  user: keys.user,
  host: keys.host,
  database: keys.database,
  password: keys.password,
  port: keys.port
});

const getRecipe = (request, response) => {
  const recipe_id = request.query.recipe_id;

  // promise - checkout a client
  pool.connect().then(client => {
    let recipeData = {};
    let created_by = "";

    return client
      .query("SELECT * FROM recipes WHERE recipe_id = $1", [recipe_id])
      .then(res => {
        recipeData = res.rows[0];
        created_by = res.rows[0].created_by;
      })
      .then(() => {
        client
          .query("SELECT username FROM users WHERE user_id = $1", [created_by])
          .then(res => {
            recipeData = { ...recipeData, username: res.rows[0].username };
            response.status(200).json(recipeData);
            client.release();
          });
      })
      .catch(err => {
        client.release();
        console.log(err.stack);
      });
  });
};

module.exports = {
  getRecipe
};
