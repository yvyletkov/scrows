import React from "react";
import { NavLink } from "react-router-dom";
import { Field, reduxForm } from "redux-form";
import { validate, warn } from "../../utils/validators/validators";
import {renderPersonalAreaInput} from "../shared/FormContols/FormControls";
import { login } from "../../redux/AuthReducer";
import { connect } from "react-redux";
import "./PersonalArea.css";
import personalDataIcon from "../../img/icons/personal-data.svg";
import secureIcon from "../../img/icons/secure.svg";
import extraDataIcon from "../../img/icons/extra-data.svg";
import entityIcon from "../../img/icons/entity.svg";
import persIcon from "../../img/icons/pers.svg";
import adminIcon from "../../img/icons/admin.svg";

const InfoUserForm = (props) => {
  const { handleSubmit, pristine, reset, submitting } = props;
  return (
    <form className="popup__form" onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-6">
          <div className="form-group">
            <label htmlFor="username">Имя</label>
            <Field
              label="Владимир"
              name="username"
              type="text"
              component={renderPersonalAreaInput}
            />
          </div>
          <div className="form-group">
            <label htmlFor="username">Пол</label>
            <select className="form-control custom-select">
              <option>Мужской</option>
              <option>Женский</option>
            </select>
          </div>
        </div>
        <div className="col-6">
          <div className="form-group">
            <label htmlFor="username">Фамилия</label>
            <Field
              value="Путин"
              name="username"
              type="text"
              component={renderPersonalAreaInput}
            />
          </div>
          <div className="form-group">
            <label htmlFor="username">Дата рождения</label>
            <input type="date" value="1952-10-07" className="form-control"/>
          </div>
        </div>
      </div>

      <div>
        <button
          type="submit"
          className="btn btn-success"
          disabled={submitting || pristine}
        >
          Сохранить
        </button>
      </div>
    </form>
  );
};

const InfoUserReduxForm = reduxForm({ form: "infoUserForm", validate, warn })(
  InfoUserForm
);

const PersonalArea = (props) => {
  const handleSubmit = (data) => {
    console.log(data);
  };
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-4">
          <div className="nav-profile">
            <ul className="nav-tabs">
              <li className="nav-item">
                <a className="nav-link active nav-profile">
                  <img
                    className="nav-icon"
                    src={personalDataIcon}
                    alt="user-icon"
                  />
                  Данные о пользователе
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link nav-profile">
                <img
                    className="nav-icon"
                    src={secureIcon}
                    alt="secure-icon"
                  />
                  Безопасность</a>
              </li>
              <li className="nav-item">
                <a className="nav-link nav-profile">
                <img
                    className="nav-icon"
                    src={extraDataIcon}
                    alt="extra-icon"
                  />
                  Доп. данные</a>
              </li>
              <li className="nav-item">
                <a className="nav-link nav-profile">
                <img
                    className="nav-icon"
                    src={entityIcon}
                    alt="entity-icon"
                  />
                  Данные юр.лица</a>
              </li>
              <li className="nav-item">
                <a className="nav-link nav-profile">
                <img
                    className="nav-icon"
                    src={persIcon}
                    alt="pers-icon"
                  />
                  Данные физ.лица</a>
              </li>
              <li className="nav-item mb-2">
                <a className="nav-link nav-profile">
                <img
                    className="nav-icon"
                    src={adminIcon}
                    alt="pers-icon"
                  />
                  Панель администратора</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="card card-info col-8">
          <div className="card-body">
            <h4 className="card-title">Личная информация</h4>
            <InfoUserReduxForm onSubmit={handleSubmit} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalArea;
