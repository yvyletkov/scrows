import React, {useEffect} from "react";
import {connect} from "react-redux";
import {Field, reduxForm} from "redux-form";
import iconAdd from "../../../img/icons/plus.svg";
import {addUserCard, getPaymentData} from "../../../redux/PersonalAreaReducer";
import {validate, warn} from "../../../utils/validators/validators";
import {renderCheckBoxCards,} from "../../shared/FormContols/FormControls";
import Preloader from "../../shared/Preloader/Preloader";
import s from "./PaymentUserForm.module.css";
import {compose} from "redux";
import {withAuthRedirect} from "../../../hoc/withAuthRedirect";
import MobilePersonalAreaTabs from "../../shared/MobilePersonalAreaTabs/MobilePersonalAreaTabs";

const PaymentUserForm = (props) => {

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
        addUserCard
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
                    <div onClick={() => addUserCard()}>
                        <img className={s.btnAdd} src={iconAdd} alt="Добавить карту"/>
                    </div>
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
    destroyOnUnmount:false,
    enableReinitialize: true,
})(PaymentUserForm);

const PaymentUserArea = (props) => {
    const {
        getPaymentData,
        payment_data,
        isFetching,
        addUserCard,
        alertSuccessShow,
        alertErrorShow,
        urlRedirect } = props;

    console.log(props);
    useEffect(() => {
        getPaymentData();
    }, []);

    if (urlRedirect) {
        window.location = urlRedirect
    }

    return (
                <div className={`card shadow-none col-lg-8 col-12 ${s.cardMob}`}>
                    <MobilePersonalAreaTabs />
                    <div className="card-header">
                        <h5 className="m-0">Платежные данные</h5>
                    </div>
                    <div className="card-body">
                        <PaymentUserReduxForm
                            payment_data={payment_data}
                            isFetching={isFetching}
                            addUserCard={addUserCard}
                            alertSuccessShow={alertSuccessShow}
                            alertErrorShow={alertErrorShow}
                        />
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
        urlRedirect: state.infoUser.urlRedirect,
    };
};

export default compose(connect(mapStateToProps, {getPaymentData, addUserCard}),withAuthRedirect)(PaymentUserArea);
