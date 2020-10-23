import React from "react";
import "./RegistrationPage.css";
import { NavLink } from "react-router-dom";
import { Field, reduxForm } from "redux-form";
import { validate, warn } from "../../utils/validators/validators";
import {
  renderCheckBox,
  renderInput,
} from "../shared/FormContols/FormControls";

const AuthForm = (props) => {
  const { handleSubmit, pristine, reset, submitting } = props;
  return (
    <form className="popup__form" onSubmit={handleSubmit}>
      <div className="form-group">
        <Field
          placeholder="Введите почту"
          name="email"
          type="email"
          component={renderInput}
        />
      </div>
      <div className="form-group">
        <Field
          placeholder="Придумайте пароль"
          name="passwordFirst"
          type="password"
          component={renderInput}
          label="Email"
        />
      </div>
      <div className="form-group">
        <Field
          placeholder="Повторите пароль"
          name="passwordSecond"
          type="password"
          component={renderInput}
          label="Email"
        />
      </div>
      <div className="custom-control custom-checkbox mb-3">
        <Field
          type="checkbox"
          name="onChecked"
          component={renderCheckBox}
          label={"Я принимаю условия Пользовательского соглашения"}
        />
      </div>
      <div>
        <button
          type="submit"
          className="btn btn-primary btn-block btn-pill"
          disabled={submitting || pristine}
        >
          Войти
        </button>
      </div>
    </form>
  );
};

const AuthReduxForm = reduxForm({ form: "auth", validate, warn })(AuthForm);

const RegistrationPage = (props) => {
  const handleSubmit = (data) => {
    console.log(data);
  };
  return (
    <div className="card auth-card" style={{ width: "20rem" }}>
      <div className="card-header">
        <ul className="nav nav-tabs card-header-tabs">
          <li className="nav-item">
            <NavLink className="nav-link" to="/login">
              Авторизация
            </NavLink>
          </li>
          <li className="nav-item active">
            <NavLink className="nav-link" to="/auth">
              Регистрация
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="card-body">
        <h4 className="card-title text-center">Авторизация</h4>
        <AuthReduxForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default RegistrationPage;
