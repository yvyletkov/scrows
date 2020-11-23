import React, {useEffect, useState} from "react";
import {Field, reduxForm} from "redux-form";
import {validate, warn} from "../../../utils/validators/validators";
import {renderCardNumberInput, renderInput, renderPersonalAreaInput,} from "../../shared/FormContols/FormControls";
import {getUserData} from "../../../redux/PersonalAreaReducer";
import {connect} from "react-redux";
import PersonalAreaCard from "../../shared/PersonalAreaCard/PersonalAreaCard";
import s from "./SecureUserForm.module.css";
import Preloader from "../../shared/Preloader/Preloader";
import {compose} from "redux";
import {withAuthRedirect} from "../../../hoc/withAuthRedirect";
import MobilePersonalAreaTabs from "../../shared/MobilePersonalAreaTabs/MobilePersonalAreaTabs";
import {Modal, ModalBody, ModalHeader} from "shards-react";
import {AlertDanger, AlertSuccess} from "../../shared/CustomAlerts/CustomAlerts";
import emailIcon from "../../../img/icons/email.svg";
import phoneIcon from "../../../img/icons/phone.svg";
import keyIcon from "../../../img/icons/key.svg";
import handleSubmit from "redux-form/lib/handleSubmit";

const SecureUserForm = (props) => {
    const {
        handleSubmit,
        pristine,
        reset,
        submitting,
        isFetching,
        phone,
        email
    } = props;
    console.log(props)

    const [modalPhone, openModalPhone] = useState(false);
    const [modalEmail, openModalEmail] = useState(false);

    return isFetching ? (
        <Preloader/>
    ) : (
        <div className="popup__form">
            <div className="row">
                <div className="col-12">
                    <div className={s.securityField} onClick={()=> openModalPhone(true)}>
                        <img className={s.securityIcon} src={phoneIcon} alt="Телефон"/>
                        <span className={s.fieldName}>Номер телефона</span>
                        <p className={s.fieldDesc}>{phone}</p>
                    </div>
                    <div className={s.securityField} onClick={()=> openModalEmail(true)}>
                        <img className={s.securityIcon} src={emailIcon} alt="Email"/>
                        <span className={s.fieldName}>Email</span>
                        <p className={s.fieldDesc}>{email}</p>
                    </div>
                    <div className={s.securityField}>
                        <img className={s.securityIcon} src={keyIcon} alt="Пароль"/>
                        <span className={s.fieldName}>Пароль</span>
                        <p className={s.fieldDesc}>Последнее изменение месяц назад</p>
                    </div>
                </div>
            </div>

            <Modal className={s.modalWindow}
                   open={modalPhone}
                   toggle={() => openModalPhone(false)}>
                <ModalHeader className="justify-content-center">
                    <p>Изменить номер</p>
                </ModalHeader>
                <AlertSuccess show={false} text={"Информация сохранена"}/>
                <AlertDanger show={false} text={"Не удалось сохранить данные"} />
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

            <Modal className={s.modalWindow}
                   open={modalEmail}
                   toggle={() => openModalEmail(false)}>
                <ModalHeader className="justify-content-center">
                    <p>Изменить email</p>
                </ModalHeader>
                <AlertSuccess show={false} text={"Информация сохранена"}/>
                <AlertDanger show={false} text={"Не удалось сохранить данные"} />
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
    );
};

const SecureUserReduxForm = reduxForm({
    form: "secureUserForm",
    validate,
    enableReinitialize: true,
    warn,
})(SecureUserForm);

const SecureUserArea = (props) => {
    const {getUserData, phone, email, isFetching} = props;

    useEffect(() => {
        getUserData();
    }, []);

    const handleSubmitEmail = (data) => {console.log(data)}
    const handleSubmitPhone = (data) => {console.log(data)}

    return (
        <div className="container my-5">
            <div className="row">
                <PersonalAreaCard/>
                <div className={`card col-lg-8 col-12 ${s.cardMob}`}>
                    <MobilePersonalAreaTabs/>
                    <div className="card-header">
                        <h4 className="m-0">Безопасность</h4>
                    </div>
                    <div className="card-body">
                        <SecureUserReduxForm
                            phone={phone}
                            email={email}
                            onSubmit={handleSubmitPhone}
                            initialValues={{
                                phone,
                                email
                            }}
                            isFetching={isFetching}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        phone: state.infoUser.phone,
        email: state.infoUser.email,
        isFetching: state.infoUser.isFetching,
    };
};

export default compose(connect(mapStateToProps, {getUserData}),withAuthRedirect)(SecureUserArea);
