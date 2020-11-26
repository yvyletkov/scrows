import React, {useState} from 'react';
import s from "./SecureUserForm.module.css";
import {Modal, ModalBody, ModalHeader} from "shards-react";
import {AlertDanger, AlertSuccess} from "../../shared/CustomAlerts/CustomAlerts";
import {Field, reduxForm} from "redux-form";
import {renderCardNumberInput} from "../../shared/FormContols/FormControls";
import {validate, warn} from "../../../utils/validators/validators";
import {connect} from "react-redux";
import phoneIcon from "../../../img/icons/phone.svg";


const ModalPhone = (props) => {
    const {
        handleSubmit,
        pristine,
        reset,
        submitting,
        phone,
    } = props;

    const [modalPhone, openModalPhone] = useState(false);

    return (
        <div className={s.securityField} onClick={() => openModalPhone(true)}>
            <img className={s.securityIcon} src={phoneIcon} alt="Телефон"/>
            <span className={s.fieldName}>Номер телефона</span>
            <p className={s.fieldDesc}>{phone}</p>
            <Modal className={s.modalWindow}
                   open={modalPhone}
                   toggle={() => openModalPhone(false)}>
                <ModalHeader className={s.modalHeader}>
                    <p>Изменить номер</p>
                </ModalHeader>
                <AlertSuccess show={false} text={"Информация сохранена"}/>
                <AlertDanger show={false} text={"Не удалось сохранить данные"}/>
                <ModalBody>
                    <form onSubmit={handleSubmit}>
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
                </ModalBody>
            </Modal>
        </div>
    )
}


const PhoneUserReduxForm = reduxForm({
    form: "phoneUserForm",
    validate,
    enableReinitialize: true,
    warn,
})(ModalPhone);

const mapStateToProps = (state) => {
    return {
        phone: state.infoUser.phone,
    };
};

export default connect(mapStateToProps)(PhoneUserReduxForm);
