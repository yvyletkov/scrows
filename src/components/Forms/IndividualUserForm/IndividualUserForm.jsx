import React from "react";
import { NavLink } from "react-router-dom";
import { Field, reduxForm } from "redux-form";
import { validate, warn } from "../../../utils/validators/validators";
import { renderPersonalAreaInput } from "../../shared/FormContols/FormControls";
import { login } from "../../../redux/AuthReducer";
import { connect } from "react-redux";
import PersonalAreaCard from "../../shared/PersonalAreaCard/PersonalAreaCard";

const IndividualUserForm = (props) => {
  const { handleSubmit, pristine, reset, submitting } = props;
  return (
    <form className="popup__form" onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-lg-6 col-12">
          <div className="form-group">
            <label htmlFor="document_type">Тип документа</label>
            <select defaultValue="default" name="document_type" className="form-control custom-select">
              <option hidden disabled selected value="default">
                Выберите тип документа
              </option>
              <option>Паспорт</option>
              <option>Другой документ</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="passport_data_created">Кем и когда выдан</label>
            <Field
              placeholder="Введите кем и когда выдан документ"
              name="passport_data_created"
              type="text"
              component={renderPersonalAreaInput}
              required
            />
          </div>
        </div>
        <div className="col-lg-6 col-12">
          <div className="form-group">
            <label htmlFor="passport_data_number">Серия и номер паспорта</label>
            <Field
              placeholder="Введите серию и номер документа"
              name="passport_data_number"
              type="text"
              component={renderPersonalAreaInput}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="passport_data_code">Код подразделения</label>
            <Field
              placeholder="Введите код подразделения"
              name="passport_data_code"
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

const IndividualUserReduxForm = reduxForm({
  form: "infoUserForm",
  validate,
  warn,
})(IndividualUserForm);

const IndividualUserArea = () => (
  <PersonalAreaCard
    InfoCard={<IndividualUserReduxForm />}
    titleCard={"Данные физического лица"}
  />
);

export default IndividualUserArea;
