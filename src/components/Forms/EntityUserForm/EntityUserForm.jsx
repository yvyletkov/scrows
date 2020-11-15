import React, {useEffect} from "react";
import {connect} from "react-redux";
import {Field, reduxForm} from "redux-form";
import {getEntityData, changeEntityData} from "../../../redux/PersonalAreaReducer";
import {validate, warn} from "../../../utils/validators/validators";
import {renderPersonalAreaInput} from "../../shared/FormContols/FormControls";
import PersonalAreaCard from "../../shared/PersonalAreaCard/PersonalAreaCard";
import Preloader from "../../shared/Preloader/Preloader";
import {NavLink} from "react-router-dom";
import s from './EntityUserForm.module.css';
import {withAuthRedirect} from "../../../hoc/withAuthRedirect";
import {compose} from "redux";
import MobilePersonalAreaTabs from "../../shared/MobilePersonalAreaTabs/MobilePersonalAreaTabs";

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
    } = props;

    useEffect(() => {
        getEntityData();
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
        <div className="container my-5">
            <div className="row">
                <PersonalAreaCard/>
                <div className={`card col-lg-8 col-12 ${s.cardMob}`}>
                    <MobilePersonalAreaTabs />
                    <div className="card-header">
                        <h4 className="m-0">Личный кабинет</h4>
                    </div>
                    <div className="card-body">
                        <EntityUserReduxForm
                            initialValues={{
                                judical_type,
                                entity_id,
                                entity_tin,
                                entity_bank_account_data,
                                entity_name
                            }}
                            onSubmit={handleSubmit}
                        />
                    </div>
                </div>
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
    };
};

export default compose(connect(mapStateToProps, {getEntityData, changeEntityData}),withAuthRedirect)(EntityUserArea);
