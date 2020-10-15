import React from "react";
import './RegistrationPage.css'

const RegistrationPage = () => {
  return (
    <div>
      <div className="card auth-card" style={{width: '20rem'}}>
        <div className="card-header">
            <ul className="nav nav-tabs card-header-tabs">
                <li className="nav-item">
                    <a className="nav-link" href="/login">Авторизация</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link active" href="/auth">Регистрация</a>
                </li>
            </ul>
        </div>
        <div className="card-body">
          <h3 className="card-title text-center">Регистрация</h3>
            <form className="popup__form" name="login">
                <div className="form-group">
                    <label className="" htmlFor="email">Email</label>
                    <input type="email" name="email" className="form-control" placeholder="Введите почту" id="email"
                        pattern="^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,}$" required minLength="2" maxLength="30" />
                </div>
                <span className="error error-email"></span>
                <div className="form-group">
                    <label className="" htmlFor="password">Пароль</label>
                    <input type="password" name="pass" className="form-control" placeholder="Введите пароль" required
                        minLength="8" id="password"/>
                </div>
                <span className="error error-pass"></span>
                <div className="custom-control custom-checkbox mb-3">
                    <input type="checkbox" className="custom-control-input" id="customCheck1" />
                    <label className="custom-control-label" htmlFor="customCheck1">Запомнить меня</label>
                </div>
                <button className="btn btn-primary btn-block">Войти</button>
            </form>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
