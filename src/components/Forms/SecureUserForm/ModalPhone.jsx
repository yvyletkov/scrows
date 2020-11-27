import React, {useState} from 'react';
import s from "./SecureUserForm.module.css";
import {Modal, ModalBody, ModalHeader} from "shards-react";
import {AlertDanger, AlertSuccess} from "../../shared/CustomAlerts/CustomAlerts";
import {Field, reduxForm} from "redux-form";
import {renderCardNumberInput} from "../../shared/FormContols/FormControls";
import {validate, warn} from "../../../utils/validators/validators";
import {connect} from "react-redux";
import phoneIcon from "../../../img/icons/phone.svg";
import CodeReduxForm from "./CodeForm";


const ModalPhone = (props) => {
    const {
        handleSubmit,
        pristine,
        reset,
        submitting,
        openModalPhone,
        modalPhone,
        showCodePhoneForm,
        verifyPhone
    } = props;

    // const showCodeForm = true;

    return (
            <Modal className={s.modalWindow}
                   open={modalPhone}
                   toggle={() => openModalPhone(!modalPhone)}>
                <ModalHeader className={s.modalHeader}>
                    <p>Изменить номер</p>
                </ModalHeader>
                <AlertSuccess show={false} text={"Информация сохранена"}/>
                <AlertDanger show={false} text={"Не удалось сохранить данные"}/>
                <ModalBody>
                    {
                        showCodePhoneForm ?
                        <CodeReduxForm onSubmit={verifyPhone}/> :
                        <form className={s.formModal} onSubmit={handleSubmit}>
                            <Field
                                placeholder="Введите номер телефона"
                                name="phone"
                                type="number"
                                component={renderCardNumberInput}
                                required
                            />
                            <button
                                type="submit"
                                className="btn btn-success mt-3"
                                disabled={submitting || pristine}>
                                Изменить номер
                            </button>
                        </form>
                    }
                </ModalBody>
            </Modal>
    )
}


const PhoneUserReduxForm = reduxForm({
    form: "codePhoneUser",
    validate,
    enableReinitialize: true,
    warn,
})(ModalPhone);

const mapStateToProps = (state) => {
    return {
        phone_number: state.infoUser.phone_number,
        showCodePhoneForm: state.infoUser.showCodePhoneForm,
        verification_id:state.infoUser.verification_id,
    };
};

export default connect(mapStateToProps)(PhoneUserReduxForm);
