const filterBy = {
  mealOptions: [
    "All Meals",
    "Breakfast",
    "Lunch",
    "Dinner",
    "Appetizer",
    "Dessert",
    "Drink"
  ],
  dietOptions: ["None", "Vegetarian", "Vegan"],
  sortOptions: ["Top Rated", "A-Z", "Time", "Newest"]
};

export const filterOptions = buttonToggled => {
  let options = filterBy.mealOptions;
  let type = null;

  switch (buttonToggled) {
    case "Meal":
      options = filterBy.mealOptions;
      type = "meal";
      break;
    case "Diet":
      options = filterBy.dietOptions;
      type = "diet";
      break;
    case "Sort":
      options = filterBy.sortOptions;
      type = "sort";
      break;
    default:
      break;
  }
  return { options, type };
};