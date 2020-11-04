import React from "react";
import { NavLink } from "react-router-dom";
import { Field, reduxForm } from "redux-form";
import { validate, warn } from "../../../utils/validators/validators";
import { renderPersonalAreaInput } from "../../shared/FormContols/FormControls";
import { login } from "../../../redux/AuthReducer";
import { connect } from "react-redux";
import PersonalAreaCard from "../../shared/PersonalAreaCard/PersonalAreaCard";

const InfoUserForm = (props) => {
  const { handleSubmit, pristine, reset, submitting } = props;
  return (
    <form className="popup__form" onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-lg-6 col-12">
          <div className="form-group">
            <label htmlFor="name">Имя</label>
            <Field
              label="Владимир"
              placeholder="Введите имя"
              name="name"
              type="text"
              component={renderPersonalAreaInput}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="middle_name">Отчество</label>
            <Field
              label="Владимир"
              placeholder="Введите отчество"
              name="middle_name"
              type="text"
              component={renderPersonalAreaInput}
            />
          </div>
          <div className="form-group">
              <label htmlFor="gender">Пол</label>
              <select name="gender" defaultValue={'default'} className="form-control custom-select" required>
                <option selected disabled hidden value="default">Выберите пол</option>
                <option value="male">Мужской</option>
                <option value="female">Женский</option>
              </select>
          </div>
        </div>
        <div className="col-lg-6 col-12">
          <div className="form-group">
            <label htmlFor="last_name">Фамилия</label>
            <Field
              label="Путин"
              placeholder="Введите фамилию"
              name="last_name"
              type="text"
              component={renderPersonalAreaInput}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="date_of_birth">Дата рождения</label>
            <input placeholder="Выберите дату рождения" name="date_of_birth" type="date" defaultValue="1952-10-07" className="form-control" required />
          </div>
          <div className="form-group">
              <label htmlFor="entity_type">Тип (Ф/Ю)</label>
              <select name="entity_type" className="form-control custom-select" required>
                <option selected disabled hidden>Выберите тип лица</option>
                <option>Физическое лицо</option>
                <option>Юридическое лицо</option>
              </select>
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

const PersonalUserArea = () => (
  <PersonalAreaCard InfoCard={<InfoUserReduxForm />} titleCard={'Личная информация'}/>
);

export default PersonalUserArea;
