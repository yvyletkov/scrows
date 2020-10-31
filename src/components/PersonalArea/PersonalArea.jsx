import React from "react";
import { NavLink } from "react-router-dom";
import {Field, reduxForm} from 'redux-form';
import {validate, warn} from "../../utils/validators/validators";
import {renderCheckBox, renderPersonalAreaInput} from "../shared/FormContols/FormControls";
import {login} from '../../redux/AuthReducer';
import { connect } from "react-redux";
import "./PersonalArea.css";

const InfoUserForm = props => {
    const { handleSubmit, pristine, reset, submitting } = props;
    return (
      <form className="popup__form" onSubmit={handleSubmit}>
        <div className="form-group group-user__info">
          <label className="label-field" htmlFor="username">Имя</label>
          <Field label="Владимир" name="username" type="text" component={renderPersonalAreaInput} />
        </div>
        <div className="form-group group-user__info">
          <label className="label-field" htmlFor="username">Фамилия</label>
          <Field label="Путин" name="username" type="text" component={renderPersonalAreaInput} />
        </div>
        <div className="form-group group-user__info">
          <label className="label-field" htmlFor="username">Отчество</label>
          <Field label="Владимирович" name="username" type="text" component={renderPersonalAreaInput} />
        </div>
        <div className="form-group group-user__info">
          <label className="label-field" htmlFor="username">Email</label>
          <Field label="rossiaVperde@vovka.ru" name="username" type="text" component={renderPersonalAreaInput} />
        </div>
        <div className="button-group btn-group__user">
          <button type="submit" className="btn btn-success" disabled={submitting || pristine}>Сохранить</button>
          <button className="btn btn-info ml-3">Доп.информация</button>
          <button className="btn btn-danger ml-3">Изменить пароль</button>
        </div>
      </form>
    )
  }

  const AdditionalPersonalArea = (props) => {
    return (
      <form className="popup__form">
        <div className="form-group group-user__info">
              <label className="label-field" htmlFor="username">Пол</label>
              <Field label="rossiaVperde@vovka.ru" name="username" type="text" component={renderPersonalAreaInput} />
            </div>
            <div className="form-group group-user__info">
              <label className="label-field" htmlFor="username">Дата рождения</label>
              <Field label="rossiaVperde@vovka.ru" name="username" type="text" component={renderPersonalAreaInput} />
            </div>
            <div className="form-group group-user__info">
              <label className="label-field" htmlFor="username">Телефон</label>
              <Field label="rossiaVperde@vovka.ru" name="username" type="text" component={renderPersonalAreaInput} />
            </div>
            <div className="form-group group-user__info">
              <label className="label-field" htmlFor="username">Почтовый адрес</label>
              <Field label="rossiaVperde@vovka.ru" name="username" type="text" component={renderPersonalAreaInput} />
            </div>
            <div className="form-group group-user__info">
              <label className="label-field" htmlFor="username">Страна</label>
              <Field label="rossiaVperde@vovka.ru" name="username" type="text" component={renderPersonalAreaInput} />
            </div>
            <div className="form-group group-user__info">
              <label className="label-field" htmlFor="username">Область/край</label>
              <Field label="rossiaVperde@vovka.ru" name="username" type="text" component={renderPersonalAreaInput} />
            </div>
            <div className="form-group group-user__info">
              <label className="label-field" htmlFor="username">Город</label>
              <Field label="rossiaVperde@vovka.ru" name="username" type="text" component={renderPersonalAreaInput} />
            </div>
            <div className="form-group group-user__info">
              <label className="label-field" htmlFor="username">Почтовый индекс</label>
              <Field label="rossiaVperde@vovka.ru" name="username" type="text" component={renderPersonalAreaInput} />
            </div>
            <div className="form-group group-user__info">
              <label className="label-field" htmlFor="username">Улица, дом</label>
              <Field label="rossiaVperde@vovka.ru" name="username" type="text" component={renderPersonalAreaInput} />
            </div>
            <div className="btn-group__user">
              <button className="btn btn-success">Сохранить</button>
            </div>
      </form>
    )
  }
  
  const InfoUserReduxForm = reduxForm({form:'infoUserForm', validate, warn})(InfoUserForm);
  const InfoUserAdditionalReduxForm = reduxForm({form:'infoUserFormAdditional', validate, warn})(AdditionalPersonalArea);

const PersonalArea = (props) => {
    const handleSubmit = (data) => {
        console.log(data)
    }
  return (
    <div>
      <div className="card card-info">
        <div className="card-header">
          <ul className="nav nav-tabs card-header-tabs">
            <li className="nav-item">
              <a className="nav-link active">
                Данные о пользователе
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link">
                Данные юр.лица
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link">
                Данные физ.лица
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link">
                Панель администратора
              </a>
            </li>
          </ul>
        </div>
        <div className="card-body">
          <h4 className="card-title card-title__user">Личная информация</h4>
          <InfoUserReduxForm onSubmit={handleSubmit}/>
        </div>
      </div>
      <div className="card card-info">
        <div className="card-body">
          <h4 className="card-title card-title__user">Дополнительная информация</h4>
          <InfoUserAdditionalReduxForm />
        </div>
      </div>
    </div>
  );
};

export default PersonalArea;
