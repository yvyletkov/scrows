import React, {useEffect} from "react";
import "./RegistrationPage.module.css";
import {NavLink, Redirect} from "react-router-dom";
import {Field, reduxForm} from "redux-form";
import {validate, warn} from "../../utils/validators/validators";
import {
    renderCardNumberInput,
    renderCheckBox,
    renderInput,
    renderPersonalAreaInput,
    renderSelect
} from "../shared/FormContols/FormControls";
import {connect} from "react-redux";
import {hideErrorAlert, hideSuccessAlert, regUser} from "../../redux/AuthReducer";
import {AlertDanger, AlertSuccess} from "../shared/CustomAlerts/CustomAlerts";
import s from "./RegistrationPage.module.css";
import { createTextMask } from 'redux-form-input-masks';
import agreement from "../../documents/agreement.pdf";

const phoneMask = createTextMask({
    pattern: '+7 (999) 999-9999',
});

const AuthForm = (props) => {
    const {handleSubmit, pristine, reset, submitting, valid} = props;
    return (
        <form className="popup__form" onSubmit={handleSubmit}>
            <div className="row">
                <div className="col-12 col-md-6">
                    <div className="form-group">
                        <Field placeholder="Введите имя"
                               name="name"
                               type="text"
                               component={renderPersonalAreaInput}
                               required/>
                    </div>
                    <div className="form-group">
                        <Field placeholder="Введите фамилию"
                               name="last_name"
                               type="text"
                               component={renderPersonalAreaInput}
                               required/>
                    </div>
                    <div className="form-group">
                        <Field placeholder="Введите отчество"
                               name="middle_name"
                               type="text"
                               component={renderPersonalAreaInput}/>
                    </div>
                    <div className="form-group">
                        <Field name="gender" component={renderSelect} required>
                            <option selected disabled hidden value="">
                                Выберите пол
                            </option>
                            <option value="male">Мужской</option>
                            <option value="female">Женский</option>
                        </Field>
                    </div>
                    <div className="form-group">
                        <Field placeholder="Выберите дату рождения"
                               name="date_of_birth"
                               type="date"
                               component={renderPersonalAreaInput}
                               required/>
                    </div>
                </div>
                <div className="col-12 col-md-6">
                    <div className="form-group">
                        <Field name="entity_type" component={renderSelect} required>
                            <option selected disabled hidden value="">
                                Я регистрируюсь как
                            </option>
                            <option value="single">Физическое лицо</option>
                            <option value="entity">Юридическое лицо</option>
                        </Field>
                    </div>
                    <div className="form-group">
                        <Field placeholder="Введите номер телефона"
                               name="phone"
                               type="tel"
                               component={renderCardNumberInput}
                               {...phoneMask}
                               required/>
                    </div>
                    <div className="form-group">
                        <Field placeholder="Введите почту"
                               name="email"
                               type="email"
                               component={renderInput}/>
                    </div>
                    <div className="form-group">
                        <Field placeholder="Придумайте пароль"
                               name="password"
                               type="password"
                               component={renderInput}
                               label="Email"/>
                    </div>
                    <div className="form-group">
                        <Field placeholder="Повторите пароль"
                               name="passwordSecond"
                               type="password"
                               component={renderInput}
                               label="Email"/>
                    </div>
                </div>
            </div>
            <div className="custom-control custom-checkbox mb-3">
                <Field type="checkbox"
                       name="onChecked"
                       component={renderCheckBox}
                       required
                       label={"Я принимаю условия Пользовательского соглашения"}
                       href={agreement}/>
            </div>
            <div>
                <button type="submit"
                        className="btn btn-primary btn-block btn-pill"
                        disabled={submitting || pristine || !valid}>Зарегистрироваться
                </button>
            </div>
        </form>
    );
};

const AuthReduxForm = reduxForm({form: "auth", validate, warn})(AuthForm);

const RegistrationPage = (props) => {
    useEffect( () => {
        if(props.alertErrorShow) {
            setTimeout(() => props.hideErrorAlert(false), 1500)
        }
    }, [props.alertErrorShow])

    useEffect( () => {
        if(props.alertSuccessShow) {
            setTimeout(() => props.hideSuccessAlert(false), 1500)
        }
    }, [props.alertSuccessShow])

    if (props.isAuth) return <Redirect to={'/profile/'}/>

    const handleSubmit = (data) => {
        data.phone = `+7${data.phone}`;
        props.regUser(
            data.name,
            data.last_name,
            data.middle_name,
            data.gender,
            data.entity_type,
            data.date_of_birth,
            data.email,
            data.phone,
            data.password
        )
    };
    return (
        <>
            <AlertSuccess style={{display: 'flex', justifyContent: 'center', zIndex: 100}}
                          show={props.alertSuccessShow}
                          text={"Пользователь успешно зарегистрирован!"}/>
            <AlertDanger show={props.alertErrorShow}
                         style={{display: 'flex', justifyContent: 'center', zIndex: 100}}
                         text={"Ошибка при регистрации"}/>
            <div className={s.cardContainer}>
                <div className={`card ${s.authCard} col-md-6 p-0`}>
                    <div className="card-header">
                        <ul className="nav nav-tabs card-header-tabs">
                            <li className="nav-item">
                                <NavLink style={{borderRadius: '0.825rem 0.825rem 0 0'}} className="nav-link"
                                         to="/login">
                                    Авторизация
                                </NavLink>
                            </li>
                            <li className="nav-item active">
                                <NavLink style={{borderRadius: '0.825rem 0.825rem 0 0'}} className="nav-link"
                                         to="/registration">
                                    Регистрация
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                    <div className="card-body">
                        <h4 className="card-title text-center">Регистрация</h4>
                        <AuthReduxForm onSubmit={handleSubmit}/>
                    </div>
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

export default connect(mapStateToProps, {hideErrorAlert, hideSuccessAlert, regUser})(RegistrationPage);
