import React from "react";
import { NavLink } from "react-router-dom";
import { Field, reduxForm } from "redux-form";
import { validate, warn } from "../../../utils/validators/validators";
import { renderPersonalAreaInput } from "../../shared/FormContols/FormControls";
import { login } from "../../../redux/AuthReducer";
import { connect } from "react-redux";
import PersonalAreaCard from "../../shared/PersonalAreaCard/PersonalAreaCard";

const PaymentUserForm = (props) => {
  const { handleSubmit, pristine, reset, submitting } = props;
  return (
    <form className="popup__form" onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-lg-6 col-12">
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
        <div className="col-lg-6 col-12">
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
            <input type="date" value="1952-10-07" className="form-control" />
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

const InfoUserReduxForm = reduxForm({ form: "PaymentUserForm", validate, warn })(
  PaymentUserForm
);

const PaymentUserArea = () => (
  <PersonalAreaCard InfoCard={<InfoUserReduxForm />} titleCard={'Дополнительные данные'}/>
);

export default PaymentUserArea;
