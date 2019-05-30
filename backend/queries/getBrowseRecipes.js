const Pool = require("pg").Pool;

const keys = require("../config/keys");

const pool = new Pool({
  user: keys.user,
  host: keys.host,
  database: keys.database,
  password: keys.password,
  port: keys.port
});

const getBrowseRecipes = (request, response) => {
  console.log(request.query);
  let { meal, diet, cuisine, sort } = JSON.parse(
    request.query.browseData.toLowerCase()
  );

  diet = diet === "none" ? null : diet;
  cuisine = cuisine === "all" ? null : cuisine;

  const numOfCats = !diet && !cuisine ? 1 : !diet || !cuisine ? 2 : 3;

  //connect pool
  pool.connect().then(client => {
    // query the recipe table
    return client
      .query(
        `SELECT r.recipe_id, r.title, r.total_time_mins, r.image_url,
        r.created_at, CASE WHEN count(lr.*) + count(dr.*) = 0 THEN 0
        ELSE (count(lr.*) / CAST (count(lr.*) + count(dr.*) AS FLOAT)) * 5
        END
        AS rating,
        CAST(count(lr.*) + count(dr.*) AS INTEGER) AS votes FROM recipes r LEFT JOIN
        liked_recipes lr ON r.recipe_id = lr.recipe_liked LEFT JOIN
        disliked_recipes dr ON r.recipe_id = dr.recipe_disliked WHERE
        r.recipe_id in
        ( SELECT recipe FROM recipes_join_categories
          WHERE
          CASE
          WHEN $2 != '' AND $3 != '' THEN
            category = (SELECT category_id FROM categories
            WHERE category_name = $1)
            OR
            category = (SELECT category_id
            FROM categories WHERE category_name = $2)
            OR
            category = (SELECT category_id
            FROM categories WHERE category_name = $3)
          WHEN $2 != '' THEN
            category = (SELECT category_id FROM categories
            WHERE category_name = $1)
            OR
            category = (SELECT category_id
            FROM categories WHERE category_name = $2)
          WHEN $3 != '' THEN
            category = (SELECT category_id FROM categories
            WHERE category_name = $1)
            OR
            category = (SELECT category_id
            FROM categories WHERE category_name = $3)
          ELSE
            category = (SELECT category_id FROM categories
            WHERE category_name = $1)
          END
          GROUP BY recipe HAVING COUNT(*) = $4 )
        GROUP BY r.recipe_id
        ORDER BY
          CASE WHEN $5 = 'a-z' THEN LOWER(r.title) END ASC,
          CASE WHEN $5 = 'time' THEN r.total_time_mins END ASC,
          CASE WHEN $5 = 'newest' THEN r.created_at END DESC,
        rating DESC, votes DESC;
`,
        [meal, diet, cuisine, numOfCats, sort]
      )
      .then(res => {
        client.release();
        response.status(200).json(res.rows);
      })

      .catch(err => {
        client.release();
        console.log(err.stack);
      });
  });
};

module.exports = {
  getBrowseRecipes
};