import React, {useEffect, useState} from "react";
import {NavLink, Redirect} from "react-router-dom";
import {Field, reduxForm} from 'redux-form';
import {validate, warn} from "../../utils/validators/validators";
import {renderCheckBox, renderInput} from "../shared/FormContols/FormControls";
import "./LoginPage.css";
import {login} from '../../redux/AuthReducer';
import {connect} from "react-redux";
import {AlertDanger} from '../shared/CustomAlerts/CustomAlerts';

const LoginForm = props => {
    const {handleSubmit, pristine, reset, submitting, error, setErrorText,} = props;

    useEffect(()=> {
        setErrorText(error);
    }, [error])
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
        <button type="submit" className="btn btn-primary btn-block btn-pill" disabled={submitting || pristine}>Войти</button>
      </div>
    </form>
  )
}

const LoginReduxForm = reduxForm({form:'login', validate, warn})(LoginForm);

const LoginPage = (props) => {
   const [errorText, setErrorText] = useState('');

    const handleSubmit = (data) => {
        props.login(data.email, data.password)
    }

    if (props.isAuth) return <Redirect to={'/personal-info'}/>

    return (
        <>
            {errorText && <AlertDanger text={errorText} show={errorText}/>}
            <div className="card auth-card" style={{width: "20rem"}}>
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
                    <LoginReduxForm onSubmit={handleSubmit}
                                    setErrorText={setErrorText}
                                    errorText={errorText}/>
                </div>
            </div>
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,
        isFetching: state.auth.isFetching,
        errorStatus: state.auth.errorStatus,
    };
};

export default connect(mapStateToProps, {login})(LoginPage);
