import React, {useEffect} from "react";
import {Field, reduxForm} from "redux-form";
import {validate, warn} from "../../../utils/validators/validators";
import {renderPersonalAreaInput, renderSelect,} from "../../shared/FormContols/FormControls";
import {changeUserData, getUserData, hideErrorAlert, hideSuccessAlert} from "../../../redux/PersonalAreaReducer";
import {connect} from "react-redux";
import PersonalAreaTabs from "../../shared/PersonalAreaTabs/PersonalAreaTabs";
import s from "./InfoUserForm.module.css";
import {compose} from "redux";
import {withAuthRedirect} from "../../../hoc/withAuthRedirect";
import MobilePersonalAreaTabs from "../../shared/MobilePersonalAreaTabs/MobilePersonalAreaTabs";
import {AlertDanger, AlertSuccess} from "../../shared/CustomAlerts/CustomAlerts";
import Preloader from "../../shared/Preloader/Preloader";
import {styleForm} from "../../../style/StyleForm";


const InfoUserForm = (props) => {
    const {handleSubmit, isFetching, submitting, pristine, valid} = props;
    return isFetching ? (
        <Preloader/>
        ) : (
            <form className="popup__form" onSubmit={handleSubmit}>
            <div className="row">
                <div className="col-lg-6 col-12">
                    <div className="form-group">
                        <label htmlFor="name">Имя</label>
                        <Field placeholder="Введите имя"
                               name="name"
                               type="text"
                               component={renderPersonalAreaInput}
                               required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="middle_name">Отчество</label>
                        <Field placeholder="Введите отчество"
                               name="middle_name"
                               type="text"
                               component={renderPersonalAreaInput}/>
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
                        <Field placeholder="Введите фамилию"
                               name="last_name"
                               type="text"
                               component={renderPersonalAreaInput}
                               required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="date_of_birth">Дата рождения</label>
                        <Field placeholder="Выберите дату рождения"
                               name="date_of_birth"
                               type="date"
                               component={renderPersonalAreaInput}
                               required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="entity_type">Тип (Ф/Ю)</label>
                        <Field name="entity_type" component={renderSelect} required>
                            <option selected disabled hidden value="">
                                Выберите тип организации
                            </option>
                            <option value="single">Физическое лицо</option>
                            <option value="entity">Юридическое лицо/ИП</option>
                        </Field>
                    </div>
                </div>
            </div>
            <div>
                <button type="submit"
                        className="btn btn-success"
                        disabled={submitting || pristine || !valid}>Сохранить</button>
            </div>
        </form>
    );
};

const InfoUserReduxForm = reduxForm({form: "infoUserForm",
    validate,
    enableReinitialize: true,
    destroyOnUnmount:false,
    warn})(
    InfoUserForm
);

const InfoUserArea = (props) => {
    const {
        getUserData,
        middle_name,
        last_name,
        name,
        date_of_birth,
        entity_type,
        gender,
        isFetching,
        changeUserData,
        alertSuccessShow,
        alertErrorShow,
        hideErrorAlert,
        hideSuccessAlert
    } = props;
    console.log(props)

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
        getUserData();
        return clearTimeout(timeoutAlert);
    }, []);

    const handleSubmit = (data) => {
        changeUserData(
            data.middle_name,
            data.last_name,
            data.name,
            data.date_of_birth,
            data.entity_type,
            data.gender)
    }

    return (
                <div className={`card shadow-none col-lg-8 col-12 ${s.cardMob}`}>
                    <MobilePersonalAreaTabs/>
                    <div className="card-header">
                        <h5 className="m-0">Личная информация</h5>
                    </div>
                    <AlertSuccess show={alertSuccessShow}
                                  style={styleForm.styleAlert}
                                  text={"Информация сохранена"}/>
                    <AlertDanger
                        show={alertErrorShow}
                        text={"Не удалось сохранить данные"}
                        style={styleForm.styleAlert}/>
                    <div className="card-body" style={styleForm.styleCard}>
                        <InfoUserReduxForm
                            initialValues={{
                                middle_name,
                                last_name,
                                name,
                                date_of_birth,
                                entity_type,
                                gender,
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
        last_name: state.infoUser.last_name,
        name: state.infoUser.name,
        middle_name: state.infoUser.middle_name,
        date_of_birth: state.infoUser.date_of_birth,
        gender: state.infoUser.gender,
        entity_type: state.infoUser.entity_type,
        isFetching: state.infoUser.isFetching,
        alertSuccessShow: state.infoUser.alertSuccessShow,
        alertErrorShow: state.infoUser.alertErrorShow,
    };

};

export default compose(connect(mapStateToProps ,
    {   getUserData,
        changeUserData,
        hideErrorAlert,
        hideSuccessAlert }),withAuthRedirect)(InfoUserArea);
