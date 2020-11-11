import React, {useEffect} from "react";
import {Field, reduxForm} from "redux-form";
import {validate, warn} from "../../../utils/validators/validators";
import {renderPersonalAreaInput, renderSelect,} from "../../shared/FormContols/FormControls";
import {connect} from "react-redux";
import PersonalAreaCard from "../../shared/PersonalAreaCard/PersonalAreaCard";
import {getIndividualData} from "../../../redux/PersonalAreaReducer";
import Preloader from "../../shared/Preloader/Preloader";
import s from "../PaymentUserForm/PaymentUserForm.module.css";
import {NavLink} from "react-router-dom";
import {compose} from "redux";
import {withAuthRedirect} from "../../../hoc/withAuthRedirect";

const IndividualUserForm = (props) => {
  const {
    handleSubmit,
    pristine,
    reset,
    submitting,
    getIndividualData,
    isFetching,
  } = props;

  return isFetching ? (
      <Preloader/>
  ) : (
      <form className="popup__form" onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-lg-6 col-12">
            <div className="form-group">
              <label htmlFor="document_type">Тип документа</label>
              <Field name="document_type" component={renderSelect} required>
                <option selected disabled hidden value="">
                  Выберите тип документа
                </option>
                <option value="passport">Паспорт</option>
                <option value="other">Другой документ</option>
              </Field>
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
  form: "infoIndividualForm",
  validate,
  enableReinitialize: true,
  warn,
})(IndividualUserForm);

const IndividualUserArea = (props) => {
  const {
    getIndividualData,
    document_type,
    passport_data_created,
    passport_data_number,
    passport_data_code,
    isFetching,
  } = props;

  useEffect(() => {
    getIndividualData();
  }, []);

  return (
      <div className="container my-5">
        <div className="row">
          <PersonalAreaCard/>
          <div className={`card col-lg-8 col-12 ${s.cardMob}`}>
            <div className={`card-header ${s.cardHeaderMob}`}>
              <ul className="nav nav-tabs card-header-tabs">
                <li className={`nav-item ${s.navLinkMob}`}>
                  <NavLink
                      to="/personal-info"
                      className={`nav-link ${s.navProfile}`}
                  >
                    Данные о пользователе
                  </NavLink>
                </li>
                <li className={`nav-item ${s.navLinkMob}`}>
                  <NavLink to="/security" className={`nav-link ${s.navProfile}`}>
                    Безопасность
                  </NavLink>
                </li>
                <li className={`nav-item ${s.navLinkMob}`}>
                  <NavLink
                      to="/payment-info"
                      className={`nav-link ${s.navProfile}`}
                  >
                    Платежные данные
                  </NavLink>
                </li>
                <li className={`nav-item ${s.navLinkMob}`}>
                  <NavLink
                      to="/entity-info"
                      className={`nav-link ${s.navProfile}`}
                  >
                    Данные юр.лица
                  </NavLink>
                </li>
                <li className={`nav-item ${s.navLinkMob}`}>
                  <NavLink
                      to="/individual-info"
                      className={`nav-link mb-2 ${s.navProfile}`}
                  >
                    Данные физ.лица
                  </NavLink>
                </li>
              </ul>
            </div>
            <div className="card-header">
              <h4 className="m-0">Платежные данные</h4>
            </div>
            <div className="card-body">
              <IndividualUserReduxForm
                  initialValues={{
                    document_type,
                    passport_data_created,
                    passport_data_number,
                    passport_data_code
                  }}
              />
            </div>
          </div>
        </div>
      </div>
  );
};

const mapStateToProps = (state) => {
  return {
    document_type: state.infoUser.document_type,
    passport_data_created: state.infoUser.passport_data_created,
    passport_data_number: state.infoUser.passport_data_number,
    passport_data_code: state.infoUser.passport_data_code,
    isFetching: state.infoUser.isFetching,
  };
};

export default compose(connect(mapStateToProps, { getIndividualData }),withAuthRedirect)(
  IndividualUserArea
);
