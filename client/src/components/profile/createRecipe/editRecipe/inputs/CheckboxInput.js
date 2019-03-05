import React from "react";

const CheckboxInput = ({ fields, label, name, categoryType }) => {
  return (
    <div className="field">
      <div className="ui checkbox">
        <input
          {...fields.categories[categoryType][name].input}
          type="checkbox"
          checked={fields.categories[categoryType][name].input.value}
        />
        <label>{label}</label>
      </div>
    </div>
  );
};

export default CheckboxInput;
