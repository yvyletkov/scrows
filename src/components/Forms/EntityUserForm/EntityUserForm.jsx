import React from "react";
import { NavLink } from "react-router-dom";
import { Field, reduxForm } from "redux-form";
import { validate, warn } from "../../../utils/validators/validators";
import { renderPersonalAreaInput } from "../../shared/FormContols/FormControls";
import { login } from "../../../redux/AuthReducer";
import { connect } from "react-redux";
import PersonalAreaCard from "../../shared/PersonalAreaCard/PersonalAreaCard";

const EntityUserForm = (props) => {
  const { handleSubmit, pristine, reset, submitting } = props;
  return (
    <form className="popup__form" onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-lg-6 col-12">
          <div className="form-group">
            <label htmlFor="entity_type">Тип организации</label>
            <select
              name="entity_type"
              className="form-control custom-select"
              defaultValue="default"
            >
              <option hidden disabled selected value="default">
                Выберите тип организации
              </option>
              <option>ООО</option>
              <option>ИП</option>
              <option>ЗАО</option>
              <option>ОАО</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="entity_id">ОГРН</label>
            <Field
              placeholder="Введите номер ОГРН организации"
              name="entity_id"
              type="text"
              component={renderPersonalAreaInput}
              required
            />
          </div>
        </div>
        <div className="col-lg-6 col-12">
          <div className="form-group">
            <label htmlFor="entity_tin">Рассчетный счет</label>
            <Field
              placeholder="Введите номер счета и название банка"
              name="entity_tin"
              type="text"
              component={renderPersonalAreaInput}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="entity_bank_account_data">ИНН</label>
            <Field
              placeholder="Введите номер ИНН организации"
              name="entity_bank_account_data"
              type="text"
              component={renderPersonalAreaInput}
              required
            />
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

const EntityUserReduxForm = reduxForm({
  form: "entityUserForm",
  validate,
  warn,
})(EntityUserForm);

const EntityUserArea = () => (
  <PersonalAreaCard
    InfoCard={<EntityUserReduxForm />}
    titleCard={"Данные юридического лица"}
  />
);

export default EntityUserArea;
