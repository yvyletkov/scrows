import React from "react";
import { Field, reduxForm } from "redux-form";
import { validate, warn } from "../../../utils/validators/validators";
import {
  renderInput,
  renderPersonalAreaInput,
} from "../../shared/FormContols/FormControls";
import PersonalAreaCard from "../../shared/PersonalAreaCard/PersonalAreaCard";
import s from "./SecureUserForm.module.css";

const InfoUserForm = (props) => {
  const { handleSubmit, pristine, reset, submitting } = props;
  return (
    <form className="popup__form" onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-12">
          <div className={`form-group ${s.userInfo}`}>
            <label className={s.labelField} htmlFor="email">
              Email
            </label>
            <Field
              placeholder="Введите почту"
              name="email"
              type="email"
              component={renderInput}
            />
          </div>
          <div className={`form-group ${s.userInfo}`}>
            <label className={s.labelField} htmlFor="phone_number">
              Номер телефона
            </label>
            <Field
              name="phone_number"
              type="tel"
              component={renderPersonalAreaInput}
            />
            {/* <label htmlFor="phone_number">Номер телефона</label>
            <Field
              name="phone_number"
              type="tel"
              component={renderPersonalAreaInput}
            /> */}
          </div>
          <div className={`form-group mb-3 ${s.userInfo}`}>
            <span className={s.passField}>Пароль</span>
            <button className="btn btn-danger">
              Сбросить пароль
            </button>
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

const SecureUserArea = () => (
  <PersonalAreaCard
    InfoCard={<InfoUserReduxForm />}
    titleCard={"Безопасность"}
  />
);

export default SecureUserArea;
