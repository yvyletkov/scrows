import React, {useState} from 'react';
import s from "./SecureUserForm.module.css";
import {Modal, ModalBody, ModalHeader} from "shards-react";
import {AlertDanger, AlertSuccess} from "../../shared/CustomAlerts/CustomAlerts";
import {Field, reduxForm} from "redux-form";
import {renderCardNumberInput} from "../../shared/FormContols/FormControls";
import {validate, warn} from "../../../utils/validators/validators";
import {connect} from "react-redux";
import emailIcon from "../../../img/icons/email.svg";
import iconClose from "../../../img/icons/close.svg";


const ModalEmail = (props) => {
    const {
        handleSubmit,
        pristine,
        reset,
        submitting,
        email,
        modalEmail,
        openModalEmail
    } = props;

    return (
            <Modal className={s.modalWindow}
                   open={modalEmail}
                   toggle={() => openModalEmail(!modalEmail)}>
                <img onClick={() => openModalEmail(!modalEmail)} src={iconClose} alt="Закрыть" className={s.iconClose} />
                <ModalHeader className={s.modalHeader}>
                    <p>Изменить email</p>
                </ModalHeader>
                <AlertSuccess show={false} text={"Информация сохранена"}/>
                <AlertDanger show={false} text={"Не удалось сохранить данные"}/>
                <ModalBody>
                    <form className={s.formModal} onSubmit={handleSubmit}>
                        <Field
                            placeholder="Введите номер телефона"
                            name="email"
                            type="email"
                            component={renderCardNumberInput}
                            required
                        />
                        <button
                            type="submit"
                            className="btn btn-success mt-3"
                            disabled={submitting || pristine}>
                            Изменить email
                        </button>
                    </form>
                </ModalBody>
            </Modal>
    )
}


const EmailUserReduxForm = reduxForm({
    form: "emailUserForm",
    validate,
    enableReinitialize: true,
    warn,
})(ModalEmail);

const mapStateToProps = (state) => {
    return {
        email: state.infoUser.email,
    };
};

export default connect(mapStateToProps)(EmailUserReduxForm);
