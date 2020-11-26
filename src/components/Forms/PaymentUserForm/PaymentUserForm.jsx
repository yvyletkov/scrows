import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {Field, reduxForm} from "redux-form";
import {Modal, ModalBody, ModalHeader} from "shards-react";
import iconAdd from "../../../img/icons/plus.svg";
import {getPaymentData, addUserCard} from "../../../redux/PersonalAreaReducer";
import {validate, warn} from "../../../utils/validators/validators";
import {renderCardNumberInput, renderCheckBoxCards,} from "../../shared/FormContols/FormControls";
import PersonalAreaCard from "../../shared/PersonalAreaCard/PersonalAreaCard";
import Preloader from "../../shared/Preloader/Preloader";
import s from "./PaymentUserForm.module.css";
import {compose} from "redux";
import {withAuthRedirect} from "../../../hoc/withAuthRedirect";
import MobilePersonalAreaTabs from "../../shared/MobilePersonalAreaTabs/MobilePersonalAreaTabs";
import {AlertDanger, AlertSuccess} from "../../shared/CustomAlerts/CustomAlerts";

const PaymentUserForm = (props) => {
    const [open, openModal] = useState(false);
    const {
        handleSubmit,
        pristine,
        reset,
        submitting,
        payment_data,
        isFetching,
        valid,
        alertSuccessShow,
        alertErrorShow,
    } = props;

    const cards = payment_data.map((card) => {
        const cardChecked = card.card_checked ? "checked" : null;
        const cardNumber = card.card_number.match(/.{1,4}/g).join(" ");
        return (
            <div className={`card col-md-5 col-12 ${s.creditCard}`}
                 key={card.card_number}>
                <div className={`card-body ${s.cardBodyCustom}`}>
                    <div className="d-flex justify-content-between">
                        <p className={s.cardBank}>{card.card_bank}</p>
                        <img src={card.svg_icon} style={{ width: '30px', height: '30px'}}/>
                    </div>
                    <div className={s.cardNumber}>
                        <p className={s.cardNumberTitle}>Номер карты</p>
                        <p>{cardNumber}</p>
                    </div>
                    <div className="d-flex justify-content-between">
                        <div className={`custom-control custom-checkbox ${s.controlsGroup}`}>
                            <input
                                className="custom-control-input custom-checkbox"
                                id="card-checked"
                                type="checkbox"
                                disabled
                                checked={cardChecked}/>
                            <label
                                className={`custom-control-label ${s.checkBoxLabel}`}
                                htmlFor="card-checked">Карта подтверждена
                            </label>
                        </div>
                        <form>
                            <div className={`custom-control custom-checkbox ${s.controlsGroup}`}>
                                <Field
                                    type="checkbox"
                                    name="main_card"
                                    component={renderCheckBoxCards}
                                    label={"Основная карта"}/>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    });

    return isFetching ? (
        <Preloader/>
    ) : (
        <div className="row">
            {payment_data.length >= 3 ? null : <div className={`card col-md-5 col-12 ${s.creditCard}`}>
                <div className="card-body d-flex justify-content-center align-items-center">
                    <div onClick={() => openModal(true)}>
                        <img className={s.btnAdd} src={iconAdd} alt="Добавить карту"/>
                    </div>
                    <Modal
                        className={s.modalWindow}
                        open={open}
                        toggle={() => {
                            openModal(false);
                        }}
                    >
                        <ModalHeader className="justify-content-center">
                            <p>Добавить карту</p>
                        </ModalHeader>
                        <AlertSuccess show={alertSuccessShow} text={"Информация сохранена"}/>
                        <AlertDanger show={alertErrorShow} text={"Не удалось сохранить данные"} />
                        <ModalBody>
                            <form onSubmit={handleSubmit}>
                                <Field
                                    placeholder="Введите номер карты"
                                    name="card_number"
                                    type="number"
                                    component={renderCardNumberInput}
                                    required
                                />
                                <button
                                    type="submit"
                                    className="btn btn-success mt-3"
                                    disabled={submitting || pristine || !valid}>
                                    Добавить карту
                                </button>
                            </form>
                        </ModalBody>
                    </Modal>
                </div>
            </div>}
            {cards}
            <div className="col-12 mt-3 p-0 p-lg-3 ml-3">
                <button
                    type="submit"
                    className="btn btn-success"
                    disabled={submitting || pristine || !valid}>
                    Сохранить
                </button>
            </div>
        </div>
    );
};

const PaymentUserReduxForm = reduxForm({
    form: "PaymentUserForm",
    validate,
    warn,
    enableReinitialize: true,
})(PaymentUserForm);

const PaymentUserArea = (props) => {
    const {getPaymentData, payment_data, isFetching, addUserCard, alertSuccessShow, alertErrorShow,} = props;

    useEffect(() => {
        getPaymentData();
    }, []);

    const handleSubmit = (data) => {
        addUserCard(data.card_number)
    }

    return (
        <div className="container my-5">
            <div className="row">
                <PersonalAreaCard/>
                <div className={`card shadow-none col-lg-8 col-12 ${s.cardMob}`}>
                    <MobilePersonalAreaTabs />
                    <div className="card-header">
                        <h5 className="m-0">Платежные данные</h5>
                    </div>
                    <div className="card-body">
                        <PaymentUserReduxForm
                            onSubmit={handleSubmit}
                            payment_data={payment_data}
                            isFetching={isFetching}
                            alertSuccessShow={alertSuccessShow}
                            alertErrorShow={alertErrorShow}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        payment_data: state.infoUser.payment_data,
        isFetching: state.infoUser.isFetching,
        alertSuccessShow: state.infoUser.alertSuccessShow,
        alertErrorShow: state.infoUser.alertErrorShow,
    };
};

export default compose(connect(mapStateToProps, {getPaymentData, addUserCard}),withAuthRedirect)(PaymentUserArea);
