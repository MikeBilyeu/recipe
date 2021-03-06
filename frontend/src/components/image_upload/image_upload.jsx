import React, { useState } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { change } from "redux-form";

const ImageUpload = props => {
  const [sizeErr, setSizeErr] = useState();

  const onImgChange = e => {
    const file = e.target.files[0];

    if (file && file.size > 10000000) {
      setSizeErr("Sorry, file size too large (10MB Limit)");
    } else if (file) {
      setSizeErr();
      // prevent memory issues
      URL.revokeObjectURL(props.input.value);

      const imageURL = URL.createObjectURL(file);

      let data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "recipes");

      props.change(props.meta.form, "imageFile", data);

      props.input.onChange(imageURL);
    }
  };

  return (
    <label
      className={classNames(props.className, {
        [`${props.className}--error`]:
          sizeErr || (props.meta.submitFailed && props.meta.error)
      })}
    >
      <span className={`${props.className}__text`}>
        {sizeErr
          ? sizeErr
          : props.input.value
          ? "Change Image"
          : "Choose Image to Upload"}
      </span>
      <img
        className={`${props.className}__img`}
        src={props.input.value}
        alt=""
        style={{ display: !props.input.value ? "none" : "block" }}
      />
      <input
        type="file"
        accept="image/.jpg;.png;.jpeg;capture=camera"
        onChange={onImgChange}
        style={{ display: "none" }}
      />
    </label>
  );
};

ImageUpload.propTypes = {
  className: PropTypes.string.isRequired
};

export default connect(
  null,
  { change }
)(ImageUpload);
