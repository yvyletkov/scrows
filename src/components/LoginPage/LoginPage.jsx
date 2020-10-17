import React, { Component } from "react";
import "./LoginPage.css";
import "./LoginPage.css";
import { connect } from "react-redux";
import { login } from "../../redux/reducer";
import { NavLink } from "react-router-dom";
import ErrorField from "../shared/ErrorFiled/ErrorField";

class LoginPage extends Component {
  state = {
    email: "",
    password: "",
    formErrors: { email: "", password: "" },
    emailValid: false,
    passwordValid: false,
    formValid: false,
    onFocusEmail: false,
    onFocusPass: false,
  };

  handleUserInput(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value }, () => {
      this.validateField(name, value)
    });
  }

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let emailValid = this.state.emailValid;
    let passwordValid = this.state.passwordValid;
    switch (fieldName) {
      case "email":
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = emailValid ? "" : "email введен не верно";
        break;
      case "password":
        passwordValid = value.length >= 6;
        fieldValidationErrors.password = passwordValid
          ? ""
          : "пароль слишком короткий";
        break;
      default:
        break;
    }
    this.setState(
      {
        formErrors: fieldValidationErrors,
        emailValid: emailValid,
        passwordValid: passwordValid,
      },
      this.validateForm
    );
  }

  validateForm() {
    this.setState({
      formValid: this.state.emailValid && this.state.passwordValid,
    });
  }

  focusForm(el) {
    switch (el.target.name) {
      case "email":
        this.setState({ 
          onFocusEmail: true,
          onFocusPass: false });
        break;
      case "password":
        this.setState({ 
          onFocusPass: true,
          onFocusEmail: false});
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
                <NavLink className="nav-link active" to="/login">
                  Авторизация
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/auth">
                  Регистрация
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="card-body">
            <h4 className="card-title text-center">Авторизация</h4>
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
                  onFocus={this.focusForm.bind(this)}
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
                  placeholder="Введите пароль"
                  required
                  value={this.state.password}
                  minLength="8"
                  onChange={this.handleUserInput.bind(this)}
                  onFocus={this.focusForm.bind(this)}
                />
                <ErrorField message={this.state.formErrors.password} />
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
                  Запомнить меня
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

let mapStateToProps = (state) => {
  return {
    someData: state.someData,
    //те данные из глобального стейта, которые мы хотим передать в компоненту
  };
};

export default connect(mapStateToProps, { login })(LoginPage); // первый арг - стейт, второй арг - экшены
