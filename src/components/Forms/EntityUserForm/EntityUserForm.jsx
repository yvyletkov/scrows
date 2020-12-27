import React, {useEffect} from "react";
import {connect} from "react-redux";
import {Field, reduxForm} from "redux-form";
import {changeEntityData, getEntityData, hideErrorAlert, hideSuccessAlert} from "../../../redux/PersonalAreaReducer";
import {validate, warn} from "../../../utils/validators/validators";
import {renderPersonalAreaInput} from "../../shared/FormContols/FormControls";
import Preloader from "../../shared/Preloader/Preloader";
import s from './EntityUserForm.module.css';
import {withAuthRedirect} from "../../../hoc/withAuthRedirect";
import {compose} from "redux";
import MobilePersonalAreaTabs from "../../shared/MobilePersonalAreaTabs/MobilePersonalAreaTabs";
import {AlertDanger, AlertSuccess} from "../../shared/CustomAlerts/CustomAlerts";
import {styleForm} from "../../../style/StyleForm";

const EntityUserForm = (props) => {
    const {
        handleSubmit,
        pristine,
        reset,
        submitting,
        getEntityData,
        isFetching,
    } = props;

    return isFetching ? (
        <Preloader/>
    ) : (
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
                <div className="col-lg-6 col-12">
                    <div className="form-group">
                        <label htmlFor="entity_bank_account_data">Название организации</label>
                        <Field
                            placeholder="Введите название организации"
                            name="entity_name"
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
    destroyOnUnmount:false,
    enableReinitialize: true,
})(EntityUserForm);

const EntityUserArea = (props) => {
    const {
        getEntityData,
        judical_type,
        entity_id,
        entity_tin,
        entity_bank_account_data,
        changeEntityData,
        entity_name,
        isFetching,
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
        getEntityData();
        return clearTimeout(timeoutAlert)
    }, []);

    const handleSubmit = (data) => {
        changeEntityData(
            data.judical_type,
            data.entity_id,
            data.entity_tin,
            data.entity_bank_account_data,
            data.entity_name)
    }

    return (
                <div className={`card shadow-none col-lg-8 col-12 ${s.cardMob}`}>
                    <MobilePersonalAreaTabs/>
                    <div className="card-header">
                        <h5 className="m-0">Личный кабинет</h5>
                    </div>
                    <AlertSuccess style={styleForm.styleAlert}
                                  show={alertSuccessShow}
                                  text={"Информация сохранена"}/>
                    <AlertDanger show={alertErrorShow}
                                 style={styleForm.styleAlert}
                                 text={"Не удалось сохранить данные"}/>
                    <div className="card-body" style={styleForm.styleCard}>
                        <EntityUserReduxForm
                            initialValues={{
                                judical_type,
                                entity_id,
                                entity_tin,
                                entity_bank_account_data,
                                entity_name
                            }}
                            onSubmit={handleSubmit}
                            isFetching={isFetching}
                        />
                    </div>
                </div>
    )
};


const mapStateToProps = (state) => {
    return {
        judical_type: state.infoUser.judical_type,
        entity_id: state.infoUser.entity_id,
        entity_tin: state.infoUser.entity_tin,
        entity_bank_account_data: state.infoUser.entity_bank_account_data,
        entity_name:state.infoUser.entity_name,
        isFetching: state.infoUser.isFetching,
        alertSuccessShow: state.infoUser.alertSuccessShow,
        alertErrorShow: state.infoUser.alertErrorShow,
    };
};

export default compose(connect(mapStateToProps,
    {   getEntityData,
        changeEntityData,
        hideErrorAlert,
        hideSuccessAlert }),withAuthRedirect)(EntityUserArea);
