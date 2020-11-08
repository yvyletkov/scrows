import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { getEntityData } from "../../../redux/PersonalAreaReducer";
import { validate, warn } from "../../../utils/validators/validators";
import {
  renderPersonalAreaInput
} from "../../shared/FormContols/FormControls";
import PersonalAreaCard from "../../shared/PersonalAreaCard/PersonalAreaCard";
import Preloader from "../../shared/Preloader/Preloader";

const EntityUserForm = (props) => {
  const { handleSubmit, pristine, reset, submitting, getEntityData, isFetching } = props;

  useEffect(() => {
    getEntityData();
    return () => reset();
  }, []);

  return (
    isFetching ? <Preloader/> :
    <form className="popup__form" onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-lg-6 col-12">
          <div className="form-group">
            <label htmlFor="judical_type">Тип организации</label>
            <Field
              placeholder="Введите тип организации"
              name="judical_type"
              type="text"
              component={renderPersonalAreaInput}
              required
            />
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
            <label htmlFor="entity_bank_account_data">Рассчетный счет</label>
            <Field
              placeholder="Введите номер счета и название банка"
              name="entity_bank_account_data"
              type="text"
              component={renderPersonalAreaInput}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="entity_tin">ИНН</label>
            <Field
              placeholder="Введите номер ИНН организации"
              name="entity_tin"
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
  enableReinitialize: true,
})(EntityUserForm);

const EntityUserArea = (props) => {
  console.log(props);
  const {
    getEntityData,
    judical_type,
    entity_id,
    entity_tin,
    entity_bank_account_data,
    isFetching,
  } = props;
  return (
    <PersonalAreaCard
      InfoCard={
        <EntityUserReduxForm
          initialValues={{
            judical_type,
            entity_id,
            entity_tin,
            entity_bank_account_data,
          }}
          getEntityData={getEntityData}
          isFetching={isFetching}
        />
      }
      titleCard={"Данные юридического лица"}
    />
  );
};

const mapStateToProps = (state) => {
  return {
    judical_type: state.infoUser.judical_type,
    entity_id: state.infoUser.entity_id,
    entity_tin: state.infoUser.entity_tin,
    entity_bank_account_data: state.infoUser.entity_bank_account_data,
    isFetching: state.infoUser.isFetching,
  };
};

export default connect(mapStateToProps, { getEntityData })(EntityUserArea);
