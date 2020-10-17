import React from "react";
import './LoginPage.css';
import './LoginPage.css'
import {connect} from "react-redux";
import {login} from "../../redux/reducer";
import {NavLink} from 'react-router-dom';

const LoginPage = () => {
  return (
    <div>
      {/* <NavLink className="btn btn-primary btn-back" to="/">На главную</NavLink> */}
      <div className="card auth-card" style={{width: '20rem'}}>
        <div className="card-header">
            <ul className="nav nav-tabs card-header-tabs">
                <li className="nav-item">
                    <NavLink className="nav-link active" to="/login">Авторизация</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" to="/auth">Регистрация</NavLink>
                </li>
            </ul>
        </div>
        <div className="card-body">
          <h4 className="card-title text-center">Авторизация</h4>
            <form className="popup__form" name="login">
                <div className="form-group">
                    <input type="email" name="email" className="form-control" placeholder="Введите почту" id="email"
                        pattern="^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,}$" required minLength="2" maxLength="30" />
                </div>
                <div className="form-group">
                    <input type="password" name="pass" className="form-control" placeholder="Введите пароль" required
                        minLength="8" id="password"/>
                </div>
                <div className="custom-control custom-checkbox mb-3">
                    <input type="checkbox" className="custom-control-input" id="custom-checkbox" />
                    <label className="custom-control-label" htmlFor="custom-checkbox">Запомнить меня</label>
                </div>
                <button type="submit" className="btn btn-primary btn-block btn-pill">Войти</button>
            </form>
        </div>
      </div>
    </div>
  );
};

let mapStateToProps = (state) => {
    return {
        someData: state.someData
        //те данные из глобального стейта, которые мы хотим передать в компоненту
    }
}

export default connect(mapStateToProps, {login})(LoginPage); // первый арг - стейт, второй арг - экшены
