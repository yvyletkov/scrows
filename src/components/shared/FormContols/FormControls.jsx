import React from "react";
import ErrorField from "../ErrorFiled/ErrorField";

const renderInput = ({
  input,
  label,
  type,
  meta: { touched, error, warning },
  placeholder,
}) => (
  <>
    <input
      className={!touched ? "form-control" : "form-control is-invalid"
       && (!error ? "form-control is-valid" : "form-control is-invalid")
    }
      {...input}
      placeholder={placeholder}
      type={type}
    />
    {touched &&
      ((error && <ErrorField message={error} />) ||
        (warning && <ErrorField message={warning} />))}
  </>
);

const renderCheckBox = ({ input, type, label }) => (
  <>
    <input
      className="custom-control-input"
      id="custom-checkbox"
      {...input}
      type={type}
    />
    <label className="custom-control-label" htmlFor="custom-checkbox">{label}</label>
  </>
);

const renderPersonalAreaInput = ({
  input,
  label,
  type,
  meta: { touched, error, warning },
  placeholder,
}) => (
  <>
    <input
      className={
        !touched ? "form-control" : "form-control is-invalid"
       && (!error ? "form-control is-valid" : "form-control is-invalid")
    }
      {...input}
      placeholder={placeholder}
      type={type}
      value={input.value}
    />
    {touched &&
      ((error && <ErrorField message={error} />) ||
        (warning && <ErrorField message={warning} />))}
  </>
);

export { renderCheckBox, renderInput, renderPersonalAreaInput };
