import React, { Component } from "react";
import "./RegistrationPage.css";
import { NavLink } from "react-router-dom";
import ErrorField from "../shared/ErrorFiled/ErrorField";

class RegistrationPage extends Component {
  state = {
    email: "",
    password: "",
    passwordRepeat: "",
    formErrors: { email: "", password: "", passwordRepeat: "" },
    emailValid: false,
    passwordValid: false,
    passwordMatch:false,
    formValid: false,
    onFocusEmail: false,
    onFocusPass: false,
    onFocusPassRepeat:false,
  };

  handleUserInput(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value }, () => {
      this.validateField(name, value)
      this.focusInput(name);
    });
  }

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let emailValid = this.state.emailValid;
    let passwordValid = this.state.passwordValid;
    let passwordRepeat = this.state.passwordRepeat;
    let password = this.state.password;
    let passwordMatch = this.state.passwordMatch;
    switch (fieldName) {
      case "email":
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = emailValid ? "" : "email введен не верно";
        break;
      case "password":
        passwordMatch = password === passwordRepeat && passwordRepeat.length !== 0;
        fieldValidationErrors.passwordRepeat = password === passwordRepeat ? "" : "пароли не совпадают";
        passwordValid = value.length >= 6;
        fieldValidationErrors.password = passwordValid
          ? ""
          : "пароль слишком короткий";
        break;
      case "passwordRepeat":
        passwordMatch = password === passwordRepeat && passwordRepeat.length !== 0;
        fieldValidationErrors.passwordRepeat = password === passwordRepeat ? "" : "пароли не совпадают";
        break;
      default:
        break;
    }
    this.setState(
      {
        formErrors: fieldValidationErrors,
        emailValid: emailValid,
        passwordValid: passwordValid,
        passwordMatch:passwordMatch,
      },
      this.validateForm
    );
  }

  validateForm() {
    this.setState({
      formValid: this.state.emailValid && this.state.passwordValid && this.state.passwordMatch,
    });
  }

  focusInput(name) {
    switch (name) {
      case "email":
        this.setState({
          onFocusEmail: true,
        });
        break;
      case "password":
        this.setState({
          onFocusPass: true,
        });
        break;
      case "passwordRepeat":
        this.setState({
          onFocusPassRepeat:true,
        });
        break;
      default:
        break;
    }
  }

  render() {
    return (
      <div>
        {/* <NavLink className="btn btn-primary btn-back" to="/">На главную</NavLink> */}
        <div className="card auth-card" style={{ width: "20rem" }}>
          <div className="card-header">
            <ul className="nav nav-tabs card-header-tabs">
              <li className="nav-item">
                <NavLink className="nav-link" to="/login">
                  Авторизация
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link active" to="/auth">
                  Регистрация
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="card-body">
            <h4 className="card-title text-center">Регистрация</h4>
            <form className="popup__form" name="login">
              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  className={
                    this.state.onFocusEmail
                      ? this.state.emailValid
                        ? "form-control is-valid"
                        : "form-control is-invalid"
                      : "form-control"
                  }
                  placeholder="Введите почту"
                  value={this.state.email}
                  pattern="^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,}$"
                  required
                  minLength="2"
                  maxLength="30"
                  onChange={this.handleUserInput.bind(this)}
                  onFocus={this.handleUserInput.bind(this)}
                />
                <ErrorField message={this.state.formErrors.email} />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  name="password"
                  className={
                    this.state.onFocusPass
                      ? this.state.passwordValid
                        ? "form-control is-valid"
                        : "form-control is-invalid"
                      : "form-control"
                  }
                  placeholder="Придумайте пароль"
                  required
                  value={this.state.password}
                  minLength="6"
                  onChange={this.handleUserInput.bind(this)}
                  onFocus={this.handleUserInput.bind(this)}
                />
                <ErrorField message={this.state.formErrors.password} />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  name="passwordRepeat"
                  className={
                    this.state.onFocusPassRepeat
                      ? this.state.passwordMatch
                        ? "form-control is-valid"
                        : "form-control is-invalid"
                      : "form-control"
                  }
                  placeholder="Повторите пароль"
                  required
                  value={this.state.passwordRepeat}
                  minLength="6"
                  onChange={this.handleUserInput.bind(this)}
                  onFocus={this.handleUserInput.bind(this)}
                />
                <ErrorField message={this.state.formErrors.passwordRepeat} />
              </div>
              <div className="custom-control custom-checkbox mb-3">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="custom-checkbox"
                />
                <label
                  className="custom-control-label"
                  htmlFor="custom-checkbox"
                >
                  Я принимаю условия Пользовательского соглашения
                </label>
              </div>
              <button
                type="submit"
                className="btn btn-primary btn-block btn-pill"
                disabled={!this.state.formValid}
              >
                Войти
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default RegistrationPage;
