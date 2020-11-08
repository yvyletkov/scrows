import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Field, reduxForm } from "redux-form";
import { validate, warn } from "../../../utils/validators/validators";
import { renderCardNumberInput, renderCheckBox } from "../../shared/FormContols/FormControls";
import { connect } from "react-redux";
import PersonalAreaCard from "../../shared/PersonalAreaCard/PersonalAreaCard";
import { Button, Modal, ModalBody, ModalHeader } from "shards-react";
import s from "./PaymentUserForm.module.css";
import iconAdd from "../../../img/icons/plus.svg";
import { getPaymentData } from "../../../redux/PersonalAreaReducer";

const PaymentUserForm = (props) => {
  const [open, openModal] = useState(false);
  const { handleSubmit, pristine, reset, submitting, getPaymentData, payment_data } = props;

  const cardsArray = payment_data;
  useEffect(() => {
    getPaymentData();
    return () => reset()
  }, []);

  console.log(cardsArray)

  return (
    <div className="row">
      <div className={`card col-5 ${s.creditCard}`}>
        <div className="card-body">
          <div onClick={() => openModal(true)}>
            <img className={s.btnAdd} src={iconAdd} alt="Добавить карту" />
          </div>
          <Modal
            className={s.modalWindow}
            open={open}
            toggle={() => {openModal(false)} }
          >
            <ModalHeader className="justify-content-center">
              Добавить карту
            </ModalHeader>
            <ModalBody>
              <form>
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
                  disabled={submitting || pristine}
                >
                  Добавить карту
                </button>
              </form>
            </ModalBody>
          </Modal>
        </div>
      </div>
      <div className={`card col-5 ${s.creditCard}`}>
        <div className="card-body d-flex">
          <p className={s.cardNumber}>тут должен быть номер карты и чекбоксы :(</p>
        </div>
      </div>
    </div>
  );
};

const PaymentUserReduxForm = reduxForm({
  form: "PaymentUserForm",
  validate,
  warn,
  enableReinitialize:true,
})(PaymentUserForm);

const PaymentUserArea = (props) => {
  console.log(props)
  const {getPaymentData, payment_data} = props;
  return (
  <PersonalAreaCard
    InfoCard={<PaymentUserReduxForm 
      getPaymentData={getPaymentData}
      payment_data={payment_data} />}
    titleCard={"Платежные данные"}
  />
)};

const mapStateToProps = (state) => {
  return {
      payment_data: state.infoUser.payment_data,
  };
};

export default connect(mapStateToProps, { getPaymentData })(PaymentUserArea);