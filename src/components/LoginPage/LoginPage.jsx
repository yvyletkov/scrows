import React, {useEffect, useState} from "react";
import {NavLink, Redirect} from "react-router-dom";
import {Field, reduxForm} from 'redux-form';
import {validate, warn} from "../../utils/validators/validators";
import {renderCheckBox, renderInput} from "../shared/FormContols/FormControls";
import "./LoginPage.css";
import {login} from '../../redux/AuthReducer';
import {connect} from "react-redux";
import {AlertDanger, AlertSuccess} from '../shared/CustomAlerts/CustomAlerts';
import {hideErrorAlert, hideSuccessAlert} from "../../redux/AuthReducer";

const LoginForm = props => {
    const {handleSubmit, pristine, reset, submitting, error, setErrorText, valid} = props;

    // useEffect(()=> {
    //     setErrorText(error);
    // }, [error])
    return (
        <form className="popup__form" onSubmit={handleSubmit}>
            <div className="form-group">
                <Field placeholder="Введите почту" name="email" type="email" component={renderInput}/>
            </div>
            <div className="form-group">
                <Field placeholder="Введите пароль" name="password" type="password" component={renderInput}/>
            </div>
            <div className="custom-control custom-checkbox mb-3">
                <Field type="checkbox" name="rememberMe" component={renderCheckBox} label={"Запомнить меня"}/>
      </div>
      <div>
        <button type="submit" className="btn btn-primary btn-block btn-pill" disabled={submitting || pristine || !valid}>Войти</button>
      </div>
    </form>
  )
}

const LoginReduxForm = reduxForm({form:'login', validate, warn})(LoginForm);

const LoginPage = (props) => {
    const handleSubmit = (data) => {
        props.login(data.email, data.password)
    }

    const timeoutAlert = (action) => {
        setTimeout(() => {
            // props.dispatch(action)
        }, 1500)
    }

    if(props.alertSuccessShow) {
        timeoutAlert(hideSuccessAlert(false))
    }

    if(props.alertErrorShow) {
        timeoutAlert(hideErrorAlert(false))
    }

    useEffect(() => {
        return clearTimeout(timeoutAlert);
    }, []);

    if (props.isAuth === true) return <Redirect to={'/profile/personal-info'}/>

    console.log(props)

    return (
        <>
            <AlertSuccess style={{display:'flex', justifyContent: 'center'}}
                          show={props.alertSuccessShow}
                          text={"Данные верные выполяется вход"}/>
            <AlertDanger show={props.alertErrorShow}
                         style={{display:'flex', justifyContent: 'center'}}
                         text={"Введены не верные данные"}/>
            <div className="card auth-card" style={{width: "20rem"}}>
                <div className="card-header">
                    <ul className="nav nav-tabs card-header-tabs">
                        <li className="nav-item">
                            <NavLink className="nav-link active" to="/login">
                                Авторизация
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/registration">
                                Регистрация
                            </NavLink>
                        </li>
                    </ul>
                </div>
                <div className="card-body">
                    <h4 className="card-title text-center">Авторизация</h4>
                    <LoginReduxForm onSubmit={handleSubmit}/>
                </div>
            </div>
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,
        isFetching: state.auth.isFetching,
        alertSuccessShow:state.auth.alertSuccessShow,
        alertErrorShow:state.auth.alertErrorShow,
    };
};

export default connect(mapStateToProps, {login})(LoginPage);
