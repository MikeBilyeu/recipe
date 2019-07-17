import React from "react";
import { Field, reduxForm } from "redux-form";

// import validation
import { ValidateTitle } from "./RecipeValidation";

import ImageUpload from "./renderFields/ImageUpload";
import TextInput from "./inputs/TextInput";
import RenderImage from "./renderFields/RenderImage";

const TitleAndImage = props => {
  const capitalize = value => {
    return (
      value &&
      value
        .toLowerCase()
        .split(" ")
        .map(s => s.charAt(0).toUpperCase() + s.substring(1))
        .join(" ")
    );
  };
  const titleParse = value => {
    let strArr = value.match(/[\w -]{0,55}/) || [""];
    return value && strArr[0];
  };

  return (
    <div>
      <Field
        addClass={"full-input"}
        name="title"
        component={TextInput}
        label="Title"
        placeholder="The Best Homemade Pizza"
        normalize={capitalize}
        parse={titleParse}
      />
      <div style={{ textAlign: "center", marginTop: "3rem" }}>
        Include a photo for the recipe
      </div>
      <Field name="image" component={ImageUpload} />
      <RenderImage />
    </div>
  );
};

export default reduxForm({
  form: "newRecipe",
  destroyOnUnmount: false,
  validate: ValidateTitle
})(TitleAndImage);