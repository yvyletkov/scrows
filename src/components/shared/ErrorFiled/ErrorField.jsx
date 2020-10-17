import React from "react";
import "./ErrorField.css"

const ErrorField = ({ message }) => {
  return (
    <span className="error">{message}</span>
  );
};
export default ErrorField;
