import React from "react";
import { NavLink } from "react-router-dom";
import { Field, initialize, reduxForm } from "redux-form";
import { validate, warn } from "../../../utils/validators/validators";
import {
  renderPersonalAreaInput,
  renderSelect,
} from "../../shared/FormContols/FormControls";
import { changeUserData, getUserData } from "../../../redux/PersonalAreaReducer";
import { connect } from "react-redux";
import PersonalAreaCard from "../../shared/PersonalAreaCard/PersonalAreaCard";

const InfoUserForm = (props) => {
  const {
    handleSubmit,
    pristine,
    reset,
    submitting,
  } = props;

  return (
    <form className="popup__form" onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-lg-6 col-12">
          <div className="form-group">
            <label htmlFor="name">Имя</label>
            <Field
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
              placeholder="Введите отчество"
              name="middle_name"
              type="text"
              component={renderPersonalAreaInput}
            />
          </div>
          <div className="form-group">
            <label htmlFor="gender">Пол</label>
            <Field name="gender" component={renderSelect} required>
              <option selected disabled hidden value="">
                Выберите пол
              </option>
              <option value="male">Мужской</option>
              <option value="female">Женский</option>
            </Field>
          </div>
        </div>
        <div className="col-lg-6 col-12">
          <div className="form-group">
            <label htmlFor="last_name">Фамилия</label>
            <Field
              placeholder="Введите фамилию"
              name="last_name"
              type="text"
              component={renderPersonalAreaInput}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="date_of_birth">Дата рождения</label>
            <Field
              label="Путин"
              placeholder="Выберите дату рождения"
              name="date_of_birth"
              type="date"
              component={renderPersonalAreaInput}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="entity_type">Тип (Ф/Ю)</label>
            <Field name="entity_type" component={renderSelect} required>
              <option selected disabled hidden value="">
                Выберите тип лица
              </option>
              <option value="single">Физическое лицо</option>
              <option value="entity">Юридическое лицо</option>
            </Field>
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

const InfoUserReduxForm = reduxForm({ form: "infoUserForm", validate, enableReinitialize:true, warn })(
  InfoUserForm
);

const PersonalUserArea = (props) => {
  const single_type = '';
  const onSubmit = (data) => {
    console.log(data)
    props.changeUserData(data.middle_name, data.last_name, data.name, data.date_of_birth, data.entity_type, data.gender)
  }
  const {
    getUserData,
    middle_name,
    last_name,
    name,
    date_of_birth,
    avatar,
    entity_type,
    gender,
  } = props;
  
  React.useEffect(() => {
    getUserData();
  }, []);

  return (
    <PersonalAreaCard
      InfoCard={
        <InfoUserReduxForm
          initialValues = {{
            middle_name,
            last_name,
            name,
            date_of_birth,
            entity_type,
            gender,
          }}
          onSubmit={onSubmit}
        />
      }
      titleCard={"Личная информация"}
      entity_type={entity_type}
      single_type={single_type}
    />
  );
};

const mapStateToProps = (state) => {
  return {
      last_name: state.infoUser.last_name,
      name: state.infoUser.name,
      middle_name: state.infoUser.middle_name,
      date_of_birth: state.infoUser.date_of_birth,
      gender: state.infoUser.gender,
      avatar: state.infoUser.avatar,
      entity_type: state.infoUser.entity_type
  };
};

export default connect(mapStateToProps, { getUserData, changeUserData })(PersonalUserArea);
