const axios = require("axios");
const cheerio = require("cheerio");

const {
  searchData,
  findRecipe,
  formatData,
  formatHTMLData
} = require("./utils");

module.exports = async (req, res) => {
  try {
    const { user_id } = req.user;
    const { url } = req.query;
    const { data: html } = await axios.get(url);

    const $ = await cheerio.load(html);

    let recipeData = {};
    $("script[type='application/ld+json']").each((i, e) => {
      const data = JSON.parse($(e).get()[0].children[0].data);

      recipeData = findRecipe(data);
      if (recipeData) {
        // recipe found now exit .each loop with false
        return false;
      }
    });

    if (Object.keys(recipeData).length) {
      const recipe = formatData(recipeData);
      res.status(200).json(recipe);
      return;
    } else {
      const recipe = formatHTMLData(html, url);
      res.status(200).json(recipe);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};
