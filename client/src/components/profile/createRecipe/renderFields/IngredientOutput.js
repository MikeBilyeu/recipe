import React from "react";
import { connect } from "react-redux";
import { formValueSelector, Field, getFormSyncErrors } from "redux-form";

import TextInput from "../inputs/TextInput";
const selector = formValueSelector("newRecipe");

//convert to class component
//track state for remove and edit toggle
//if remove state true render a button next to the ingredietns
// handleremoveIng will change form state at i to ''

const IngredientEditInput = ({
  input,
  label,
  meta: { touched, error, warning, active },
  placeholder,
  type = "text",
  pattern = null,
  addClass
}) => {
  const className = `field ${addClass} ${error && touched ? "error" : ""} ${
    active ? "input-active" : ""
  }`;
  return (
    <div className={className}>
      <label>{label}</label>
      <input
        {...input}
        autoComplete="off"
        type={type}
        placeholder={placeholder}
        pattern={pattern}
      />
      {error ? <span className="error">*{error}</span> : null}
    </div>
  );
};

class IngredientOutput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { toggleEdit: false };
  }

  handleEditClick = () => {
    this.setState(prevState => {
      if (this.props.syncErrors.ingredients) {
        return { toggleEdit: true };
      }
      return { toggleEdit: !prevState.toggleEdit };
    });
  };

  handleDeleteClick = i => {
    let modIngredients = [...this.props.ingredients];
    modIngredients.splice(i, 1);
    this.props.change(`ingredients`, modIngredients);
  };

  render() {
    return (
      <div>
        <div onClick={this.handleEditClick}>Edit</div>
        <div>
          {this.props.ingredients.map((ingredient, i, arr) => {
            return (
              <div key={i}>
                {this.state.toggleEdit ? (
                  <div>
                    <div
                      style={{ color: "red" }}
                      onClick={() => {
                        this.handleDeleteClick(i);
                      }}
                    >
                      Delete
                    </div>
                    <Field
                      addClass={"full-input"}
                      name={`ingredients[${i}]`}
                      component={IngredientEditInput}
                      placeholder="e.g. 1 1/2 Cup Bread Crumbs (Dry)"
                    />
                  </div>
                ) : (
                  <div>
                    <div key={i}>{ingredient}</div>
                    {this.props.syncErrors.ingredients &&
                    this.props.syncErrors.ingredients[i] ? (
                      <span className="error">
                        *{this.props.syncErrors.ingredients[i]}
                      </span>
                    ) : null}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

const mapSateToProps = state => {
  return {
    ingredients: selector(state, "ingredients"),
    syncErrors: getFormSyncErrors("newRecipe")(state)
  };
};

export default connect(mapSateToProps)(IngredientOutput);
