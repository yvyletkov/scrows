import React, {useState} from 'react';
import s from "../SecureUserForm/SecureUserForm.module.css";
import {Modal, ModalBody, ModalHeader} from "shards-react";
import {Field, reduxForm} from "redux-form";
import {renderCardNumberInput} from "../../shared/FormContols/FormControls";
import {validate, warn} from "../../../utils/validators/validators";
import {connect} from "react-redux";
import iconClose from "../../../img/icons/close.svg";
import {setShowAddingCardModal} from "../../../redux/PersonalAreaReducer";
import {createTextMask} from "redux-form-input-masks";
import {reset} from 'redux-form';


const cardMask = createTextMask({
    pattern: '9999-9999-9999-9999',
});


const AddingCardModal = (props) => {
    const {
        showAddingCardModal,
        setShowAddingCardModal,
        isFetching,
        handleSubmit,
        reset
    } = props;

    const onSubmit = () => {
        handleSubmit()
        toggle()
    }

    const toggle = () => {
        reset('addingCard')
        setShowAddingCardModal(!showAddingCardModal)
    }

    return (
        <Modal className={s.modalWindow}
               open={showAddingCardModal}
               toggle={toggle}>

            <img onClick={toggle} src={iconClose} alt="Закрыть" className={s.iconClose}/>

            <ModalHeader className={s.modalHeader}
                         closeAriaLabel>
                <p>Добавить новую карту</p>
            </ModalHeader>
            <ModalBody>

                <form className={s.formModal} onSubmit={onSubmit}>
                    <Field placeholder="Введите номер карты"
                           name="cardNumber"
                           type="tel"
                           component={renderCardNumberInput}
                           {...cardMask}
                           required/>
                    <button
                        type="submit"
                        className="btn btn-success mt-3"
                        disabled={isFetching}>
                        Отправить данные
                    </button>
                </form>

            </ModalBody>
        </Modal>
    )
}


const PhoneUserReduxForm = reduxForm({
    form: "addingCard",
    validate,
    enableReinitialize: true,
    warn,
})(AddingCardModal);

const mapStateToProps = (state) => {
    return {
        showAddingCardModal: state.infoUser.showAddingCardModal,
        isFetching: state.infoUser.isFetching,
    };
};

export default connect(mapStateToProps, {setShowAddingCardModal, reset})(PhoneUserReduxForm);
