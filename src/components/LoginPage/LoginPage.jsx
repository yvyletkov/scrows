import React, {useEffect} from "react";
import {NavLink, Redirect} from "react-router-dom";
import {Field, formValueSelector, reduxForm} from 'redux-form';
import {validate, warn} from "../../utils/validators/validators";
import {renderCheckBox, renderInput} from "../shared/FormContols/FormControls";
import "./LoginPage.css";
import {login, requestForgotPass, setShowErrorAlert, setShowSuccessAlert} from '../../redux/AuthReducer';
import {connect} from "react-redux";
import {AlertDanger, AlertSuccess} from '../shared/CustomAlerts/CustomAlerts';

const LoginForm = props => {
    const {handleSubmit, pristine, reset, submitting, error, setErrorText, valid, requestForgotPass, emailInputValue} = props;

    return (
        <form className="popup__form" onSubmit={handleSubmit}>
            <div className="form-group">
                <Field placeholder="Введите почту" name="email" type="email" component={renderInput}/>
            </div>
            <div className="form-group">
                <Field placeholder="Введите пароль" name="password" type="password" component={renderInput}/>
            </div>
            <div className="custom-control custom-checkbox mb-2">
                <Field type="checkbox" name="rememberMe" component={renderCheckBox} label={"Запомнить меня"}/>
            </div>
            <div>
                <button type="submit" className="btn btn-primary btn-block btn-pill mb-2"
                        disabled={submitting || pristine || !valid}>Войти
                </button>
            </div>
            <p style={{fontSize: '12px', color: '#a2a2a2', cursor: "pointer"}} onClick={(() => {
                requestForgotPass(emailInputValue)
                console.log(emailInputValue)
            })}>Восстановить пароль</p>

        </form>
    )
}

const LoginReduxForm = reduxForm({form: 'login', validate, warn})(LoginForm);

const LoginPage = (props) => {
    const handleSubmit = (data) => {
        props.login(data.email, data.password)
    }

    useEffect(() => {
        if (props.isErrorAlertShowing) {
            setTimeout( () => props.setShowErrorAlert(false), 2500)
        }
    }, [props.isErrorAlertShowing])

    useEffect(() => {
        if (props.isSuccessAlertShowing) {
            setTimeout( () => props.setShowSuccessAlert(false), 2500)
        }
    }, [props.isErrorAlertShowing])

    if (props.isAuth === true) return <Redirect to={'/profile/personal-info'}/>

    return (
        <>
            <AlertSuccess show={props.isSuccessAlertShowing}
                          style={{display: 'flex', justifyContent: 'center'}}
                          text={"Выполняется вход..."}/>
            <AlertDanger show={props.isErrorAlertShowing}
                         style={{display: 'flex', justifyContent: 'center'}}
                         text={"Неправильные логин и/или пароль"}/>
            <div className="card auth-card" style={{width: "20rem"}}>
                <div className="card-header">
                    <ul className="nav nav-tabs card-header-tabs">
                        <li className="nav-item">
                            <NavLink style={{borderRadius: '0.825rem 0.825rem 0 0'}} className="nav-link active"
                                     to="/login">
                                Авторизация
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink style={{borderRadius: '0.825rem 0.825rem 0 0'}} className="nav-link"
                                     to="/registration">
                                Регистрация
                            </NavLink>
                        </li>
                    </ul>
                </div>
                <div className="card-body pb-4">
                    <h4 className="card-title text-center">Авторизация</h4>
                    <LoginReduxForm requestForgotPass={props.requestForgotPass} emailInputValue={props.emailInputValue} onSubmit={handleSubmit}/>
                </div>
            </div>
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,
        isFetching: state.auth.isFetching,
        isErrorAlertShowing: state.auth.isErrorAlertShowing,
        isSuccessAlertShowing: state.auth.isSuccessAlertShowing,
        emailInputValue: formValueSelector('login')(state, 'email')
    };
};

export default connect(mapStateToProps, {login, setShowErrorAlert, setShowSuccessAlert, requestForgotPass})(LoginPage);
