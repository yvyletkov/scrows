import React from "react";
import ErrorField from "../ErrorFiled/ErrorField";
import s from "./FormControls.module.css";

const renderInput = ({
  input,
  label,
  type,
  meta: { touched, error, warning },
  placeholder,
}) => (
  <>
    <input
      className={
        !touched
          ? "form-control"
          : "form-control is-invalid" &&
            (!error ? "form-control is-valid" : "form-control is-invalid")
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

const renderCheckBox = ({ input, type, label, href, ...props}) => (
  <>
    <input
      className="custom-control-input"
      id="custom-checkbox"
      {...props}
      {...input}
      type={type}
    />
    <label className="custom-control-label" htmlFor="custom-checkbox">
        {href ? <a target='_blank' href={href}>{label}</a> : label}
    </label>
  </>
);

const renderCheckBoxCards = ({ input, type, label }) => (
  <>
    <input
      className="custom-control-input"
      id="custom-checkbox"
      {...input}
      type={type}
    />
    <label className={`custom-control-label ${s.checkBoxLabel}`} htmlFor="custom-checkbox">
      {label}
    </label>
  </>
);

const renderPersonalAreaInput = ({
  input,
  label,
  type,
  meta: { touched, error, warning },
  placeholder,
  ...props
}) => (
  <>
    <input
      className={
        !touched
          ? "form-control"
          : "form-control is-invalid" &&
            (!error ? "form-control is-valid" : "form-control is-invalid")
      }
      {...input}
      placeholder={placeholder}
      type={type}
      {...props}
    />
    {touched &&
      ((error && <ErrorField message={error} />) ||
        (warning && <ErrorField message={warning} />))}
  </>
);

const renderCardNumberInput = ({
  input,
  label,
  type,
  meta: { touched, error, warning },
  placeholder,
}) => (
  <>
    <input
      className={
        !touched
          ? `form-control ${s.cardNumberInput}`
          : `form-control is-invalid  ${s.cardNumberInput}` &&
            (!error
              ? `form-control is-valid  ${s.cardNumberInput}`
              : `form-control is-invalid ${s.cardNumberInput}`)
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

const renderSelect = ({
  input,
  label,
  type,
  meta: { touched, error, warning },
  placeholder,
  children,
  ...props
}) => (
  <>
    <select
      className={
        !touched
          ? "form-control custom-select"
          : "form-control is-invalid custom-select" &&
            (!error
              ? "form-control is-valid custom-select"
              : "form-control is-invalid custom-select")
      }
      {...input}
      placeholder={placeholder}
      type={type}
      {...props}
    >
      {children}
    </select>
    {touched &&
      ((error && <ErrorField message={error} />) ||
        (warning && <ErrorField message={warning} />))}
  </>
);

export {
  renderCheckBox,
  renderInput,
  renderPersonalAreaInput,
  renderCardNumberInput,
  renderSelect,
  renderCheckBoxCards,
};
