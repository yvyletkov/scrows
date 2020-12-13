import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import PersonalAreaCard from "../../shared/PersonalAreaTabs/PersonalAreaTabs";
import s from "./SecureUserForm.module.css";
import {compose} from "redux";
import {withAuthRedirect} from "../../../hoc/withAuthRedirect";
import MobilePersonalAreaTabs from "../../shared/MobilePersonalAreaTabs/MobilePersonalAreaTabs";
import keyIcon from "../../../img/icons/key.svg";
import PhoneUserReduxForm from "./ModalPhone";
import {getUserData} from "../../../redux/PersonalAreaReducer";
import EmailUserReduxForm from "./ModalEmail";
import emailIcon from "../../../img/icons/email.svg";
import phoneIcon from "../../../img/icons/phone.svg";
import filesIcon from "../../../img/icons/files.svg";
import {takeCodeForPhone, sendPhoneCode} from "../../../redux/PersonalAreaReducer";
import ModalUserFiles from "./ModalFiles";

const SecureUserArea = (props) => {
    const {
        isFetching,
        getUserData,
        email,
        phone,
        takeCodeForPhone,
        verification_id,
        sendPhoneCode } = props;

    useEffect(() => {
        getUserData()
    }, [])

    const [modalEmail, openModalEmail] = useState(false);
    const [modalPhone, openModalPhone] = useState(false);
    const [modalFiles, openModalFiles] = useState(false);

    const submitEmail = (data) => {
        console.log(data)
    }

    const submitPhone = (phone) => {
        takeCodeForPhone(phone.phone)
    }

    const verifyPhone = (code) => {
        sendPhoneCode(verification_id, code.code)
    }

    return (
                <div className={`card shadow-none col-lg-8 col-12 ${s.cardMob}`}>
                    <MobilePersonalAreaTabs/>
                    <div className="card-header">
                        <h5 className="m-0">Безопасность</h5>
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-12">
                                <div className={s.securityField} onClick={() => openModalPhone(!modalPhone)}>
                                    <img className={s.securityIcon} src={phoneIcon} alt="Телефон"/>
                                    <span className={s.fieldName}>Номер телефона</span>
                                    <p className={s.fieldDesc}>{phone}</p>
                                </div>
                                <div className={s.securityField} onClick={() => openModalEmail(!modalEmail)}>
                                    <img className={s.securityIcon} src={emailIcon} alt="Email"/>
                                    <span className={s.fieldName}>Email</span>
                                    <p className={s.fieldDesc}>{email}</p>
                                </div>
                                <div className={s.securityField}>
                                    <img className={s.securityIcon} src={keyIcon} alt="Пароль"/>
                                    <span className={s.fieldName}>Пароль</span>
                                    <p className={s.fieldDesc}>Последнее изменение месяц назад</p>
                                </div>
                                <div className={s.securityField} onClick={() => openModalFiles(!modalFiles)}>
                                    <img className={s.securityIcon} src={filesIcon} alt="files"/>
                                    <span className={s.fieldName}>Добавьте сканы личных данных</span>
                                </div>
                            </div>
                        </div>
                    </div>
            <EmailUserReduxForm openModalEmail={openModalEmail} modalEmail={modalEmail} onSubmit={submitEmail}/>
            <PhoneUserReduxForm
                modalPhone={modalPhone}
                openModalPhone={openModalPhone}
                onSubmit={submitPhone}
                verifyPhone={verifyPhone}/>
            <ModalUserFiles
                modalFiles={modalFiles}
                openModalFiles={openModalFiles}
                onSubmit={submitEmail}/>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        isFetching: state.infoUser.isFetching,
        email:state.infoUser.email,
        phone:state.infoUser.phone,
        verification_id:state.infoUser.verification_id,
    };
};

export default compose(connect(mapStateToProps, {getUserData, takeCodeForPhone, sendPhoneCode}), withAuthRedirect)(SecureUserArea);
