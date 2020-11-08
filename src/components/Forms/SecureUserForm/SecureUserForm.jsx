import React, { useEffect } from "react";
import { Field, reduxForm } from "redux-form";
import { validate, warn } from "../../../utils/validators/validators";
import {
  renderInput,
  renderPersonalAreaInput,
} from "../../shared/FormContols/FormControls";
import {
  changeSecureData,
  getSecureData,
} from "../../../redux/PersonalAreaReducer";
import { connect } from "react-redux";
import PersonalAreaCard from "../../shared/PersonalAreaCard/PersonalAreaCard";
import s from "./SecureUserForm.module.css";
import Preloader from "../../shared/Preloader/Preloader";

const SecureUserForm = (props) => {
  const { handleSubmit, pristine, reset, submitting, getSecureData, isFetching } = props;
  useEffect(() => {
    getSecureData();
    return () => reset();
  }, []);
  return (
    isFetching ? 
    <Preloader/> :
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
              placeholder="Введите номер телефона"
            />
          </div>
          <div className={`form-group mb-3 ${s.userInfo}`}>
            <span className={s.passField}>Пароль</span>
            <button className="btn btn-danger">Сбросить пароль</button>
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

const SecureUserReduxForm = reduxForm({
  form: "secureUserForm",
  validate,
  enableReinitialize:true,
  warn,
})(SecureUserForm);

const SecureUserArea = (props) => {
  
  const { getSecureData, phone_number, email, isFetching } = props;
  return (
    <PersonalAreaCard
      InfoCard={<SecureUserReduxForm 
        getSecureData={getSecureData}
        initialValues = {{phone_number, email }}
        isFetching = {isFetching} />}
      titleCard={"Безопасность"}
    />
  );
};

const mapStateToProps = (state) => {
  return {
    phone_number: state.infoUser.phone_number,
    email: state.infoUser.email,
    isFetching: state.infoUser.isFetching,
  };
};

export default connect(mapStateToProps, { getSecureData })(SecureUserArea);
