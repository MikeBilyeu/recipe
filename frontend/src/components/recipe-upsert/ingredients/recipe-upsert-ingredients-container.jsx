import React from "react";
import { Field } from "redux-form";
import Input from "../../form-inputs/input";
import Button from "../../button";
import { ReactComponent as Remove } from "../../../assets/images/removeDark.svg";
import { numberParse, validIngredientRegEx } from "../utils/input-parse";
import styles from "../recipe-upsert.module.scss";

class Ingredients extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredient: "",
      activeField: null,
      error: null,
      touched: false
    };
  }

  handleChange = e => {
    this.setState({ ingredient: e.target.value, error: null });
  };

  handleKeyDown = e => {
    if (e.key === "Enter") {
      if (!validIngredientRegEx.test(this.state.ingredient)) {
        this.setState({
          error: "Ingredient is not in a valid format: Amount, Unit, Ingredient"
        });
      } else {
        this.props.fields.push(this.state.ingredient);
        this.setState({ ingredient: "" });
      }
    }
  };

  handleFocus = index => {
    this.setState({ activeField: index });
  };

  handleRemoveClick = (index, event) => {
    event.stopPropagation();
    this.setState({ activeField: null });
    this.props.fields.remove(index);
  };

  render() {
    return (
      <div className={styles.ingredientsContainer}>
        <Field
          name="servings"
          component={Input}
          label="Yield"
          placeholder="2"
          type="number"
          pattern="[0-9]*"
          normalize={numberParse}
          className={styles.yield}
        />
        <ul>
          {this.props.fields.map((ingredient, index, arr) => {
            const active = this.state.activeField === index;
            const unactive = this.state.activeField !== index;
            return (
              <li key={index} onClick={() => this.handleFocus(index)}>
                {// display if field is selected
                active && (
                  <Button
                    onClick={event => this.handleRemoveClick(index, event)}
                  >
                    <Remove style={{ width: "1rem" }} />
                  </Button>
                )}
                <Field
                  name={`ingredients[${index}]`}
                  type="text"
                  component={Input}
                  label=""
                  className={`${styles.ingredientInput} ${active &&
                    styles.active} ${
                    this.state.activeField !== null && unactive
                      ? styles.unactive
                      : ""
                  }`}
                />
              </li>
            );
          })}
        </ul>
        <Input
          label="Click enter to add Ingredient"
          input={{
            value: this.state.ingredient,
            onChange: this.handleChange,
            onKeyDown: this.handleKeyDown
          }}
          placeholder="1 1/2 Tablespoon Onion (Chopped)"
          meta={{ error: this.state.error, touched: true }}
        />
      </div>
    );
  }
}

export default Ingredients;
