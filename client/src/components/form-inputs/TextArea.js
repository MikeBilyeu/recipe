import React from "react";

const TextArea = ({
  input,
  label,
  placeholder,
  meta: { touched, error, warning, active },
  className
}) => {
  return (
    <label>
      {label}
      <textarea {...input} placeholder={placeholder} className={className} />
      {touched && error && <div>*{error}</div>}
    </label>
  );
};

export default TextArea;