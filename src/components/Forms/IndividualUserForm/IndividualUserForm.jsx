import React, {useEffect} from "react";
import {Field, reduxForm} from "redux-form";
import {validate, warn} from "../../../utils/validators/validators";
import {renderPersonalAreaInput, renderSelect,} from "../../shared/FormContols/FormControls";
import {connect} from "react-redux";
import PersonalAreaCard from "../../shared/PersonalAreaTabs/PersonalAreaTabs";
import {
  changeIndividualData,
  getIndividualData,
  hideErrorAlert,
  hideSuccessAlert
} from "../../../redux/PersonalAreaReducer";
import Preloader from "../../shared/Preloader/Preloader";
import s from "../PaymentUserForm/PaymentUserForm.module.css";
import {compose} from "redux";
import {withAuthRedirect} from "../../../hoc/withAuthRedirect";
import MobilePersonalAreaTabs from "../../shared/MobilePersonalAreaTabs/MobilePersonalAreaTabs";
import {AlertDanger, AlertSuccess} from "../../shared/CustomAlerts/CustomAlerts";
import {styleForm} from "../../../style/StyleForm";

const IndividualUserForm = (props) => {
  const {
    handleSubmit,
    pristine,
    reset,
    submitting,
    isFetching,
    valid,
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
            disabled={submitting || pristine || !valid}>
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
  destroyOnUnmount:false,
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
    changeIndividualData,
    alertSuccessShow,
    alertErrorShow,
    hideErrorAlert,
    hideSuccessAlert
  } = props;


  const timeoutAlert = (action) => {
    setTimeout(() => {
      action(false)
    }, 1500)
  }

  if(alertSuccessShow) {
    timeoutAlert(hideSuccessAlert)
  }

  if(alertErrorShow) {
    timeoutAlert(hideErrorAlert)
  }

  useEffect(() => {
    getIndividualData();
    return clearTimeout(timeoutAlert)
  }, []);

  const handleSubmit = (data) => {
    changeIndividualData(
        data.document_type,
        data.passport_data_number,
        data.passport_data_created,
        data.passport_data_code)
  }

  return (
          <div className={`card shadow-none col-lg-8 col-12 ${s.cardMob}`}>
            <MobilePersonalAreaTabs />
            <div className="card-header">
              <h5 className="m-0">Платежные данные</h5>
            </div>
            <AlertSuccess style={styleForm.styleAlert}
                          show={alertSuccessShow}
                          text={"Информация сохранена"}/>
            <AlertDanger show={alertErrorShow}
                         style={styleForm.styleAlert}
                         text={"Не удалось сохранить данные"}/>
            <div className="card-body" style={styleForm.styleCard}>
              <IndividualUserReduxForm
                  initialValues={{
                    document_type,
                    passport_data_created,
                    passport_data_number,
                    passport_data_code
                  }}
                  onSubmit={handleSubmit}
                  isFetching={isFetching}
              />
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
    alertSuccessShow: state.infoUser.alertSuccessShow,
    alertErrorShow: state.infoUser.alertErrorShow,
  };
};

export default compose(connect(mapStateToProps,
    { getIndividualData,
      changeIndividualData,
      hideErrorAlert,
      hideSuccessAlert }),withAuthRedirect)(
  IndividualUserArea
);
