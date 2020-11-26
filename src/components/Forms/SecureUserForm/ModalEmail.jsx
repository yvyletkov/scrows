import React, {useState} from 'react';
import s from "./SecureUserForm.module.css";
import {Modal, ModalBody, ModalHeader} from "shards-react";
import {AlertDanger, AlertSuccess} from "../../shared/CustomAlerts/CustomAlerts";
import {Field, reduxForm} from "redux-form";
import {renderCardNumberInput} from "../../shared/FormContols/FormControls";
import {validate, warn} from "../../../utils/validators/validators";
import {connect} from "react-redux";
import emailIcon from "../../../img/icons/email.svg";


const ModalEmail = (props) => {
    const {
        handleSubmit,
        pristine,
        reset,
        submitting,
        email,
    } = props;

    const [modalEmail, openModalEmail] = useState(false);
    console.log(modalEmail)

    return (
        <div className={s.securityField} onClick={() => openModalEmail(!modalEmail)}>
            <img className={s.securityIcon} src={emailIcon} alt="Email"/>
            <span className={s.fieldName}>Email</span>
            <p className={s.fieldDesc}>{email}</p>
            <Modal className={s.modalWindow}
                   open={modalEmail}
                   toggle={() => openModalEmail(!modalEmail)}>
                <ModalHeader className="justify-content-center">
                    <p>Изменить email</p>
                </ModalHeader>
                <AlertSuccess show={false} text={"Информация сохранена"}/>
                <AlertDanger show={false} text={"Не удалось сохранить данные"}/>
                <ModalBody>
                    <form onSubmit={handleSubmit}>
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
        </div>
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
