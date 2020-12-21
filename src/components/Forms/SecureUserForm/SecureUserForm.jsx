import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import s from "./SecureUserForm.module.css";
import {compose} from "redux";
import {withAuthRedirect} from "../../../hoc/withAuthRedirect";
import MobilePersonalAreaTabs from "../../shared/MobilePersonalAreaTabs/MobilePersonalAreaTabs";
import keyIcon from "../../../img/icons/key.svg";
import PhoneUserReduxForm from "./ModalPhone";
import {getUserData} from "../../../redux/PersonalAreaReducer";
import emailIcon from "../../../img/icons/email.svg";
import phoneIcon from "../../../img/icons/phone.svg";
import filesIcon from "../../../img/icons/files.svg";
import {
    takeCodeForPhone,
    sendPhoneCode,
    postUserFiles,
    resetUserPassword} from "../../../redux/PersonalAreaReducer";
import ModalUserFiles from "./ModalFiles";
import Swal from "sweetalert2";
import verifyIcon from "../../../img/icons/checkColor.svg";
import unverifyIcon from "../../../img/icons/closeColor.svg";

const SecureUserArea = (props) => {
    const {
        isFetching,
        getUserData,
        email,
        phone,
        takeCodeForPhone,
        verification_id,
        sendPhoneCode,
        postUserFiles,
        resetUserPassword,
        verification
    } = props;

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

    const postUserInfoFiles = (files) => {
        postUserFiles(files.files);
        openModalFiles(!modalFiles);
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
                                <div className={s.securityField} onClick={() => !verification.email &&
                                    Swal.fire({
                                        icon: 'warning',
                                        title: 'Вы хотите подтвердить email?',
                                        showCancelButton: true,
                                        confirmButtonColor: '#3085d6',
                                        cancelButtonColor: '#d33',
                                        confirmButtonText: 'Подтведить',
                                        cancelButtonText: 'Отмена'
                                    }).then((result) => {
                                        if (result.value) {
                                            resetUserPassword();
                                        }
                                    })
                                }>
                                    <img className={s.securityIcon} src={emailIcon} alt="Email"/>
                                    <span className={s.fieldName}>Email
                                        <img src={verification.email ? verifyIcon : unverifyIcon} alt="Верефикация" className={s.verifyIcon}/>
                                    </span>
                                    <p className={s.fieldDesc}>{email}</p>
                                </div>
                                <div className={s.securityField} onClick={() => verification.phone ?
                                    openModalPhone(!modalPhone)
                                    :
                                    Swal.fire({
                                        icon: 'warning',
                                        title: 'Вы хотите подтвердить телефон',
                                        showCancelButton: true,
                                        confirmButtonColor: '#3085d6',
                                        cancelButtonColor: '#d33',
                                        confirmButtonText: 'Подтвердить',
                                        cancelButtonText: 'Отмена'
                                    }).then((result) => {
                                        if (result.value) {
                                            resetUserPassword();
                                        }
                                    })
                                }>
                                    <img className={s.securityIcon} src={phoneIcon} alt="Телефон"/>
                                    <span className={s.fieldName}>Номер телефона
                                        <img src={verification.phone ? verifyIcon : unverifyIcon} alt="Верефикация" className={s.verifyIcon}/>
                                    </span>
                                    <p className={s.fieldDesc}>{phone}</p>
                                </div>
                                <div className={s.securityField} onClick={() =>
                                    Swal.fire({
                                        icon: 'warning',
                                        title: 'Вы хотите сбросить пароль?',
                                        showCancelButton: true,
                                        confirmButtonColor: '#3085d6',
                                        cancelButtonColor: '#d33',
                                        confirmButtonText: 'Сбросить',
                                        cancelButtonText: 'Отмена'
                                    }).then((result) => {
                                        if (result.value) {
                                            resetUserPassword();
                                        }
                                    })
                                }>
                                    <img className={s.securityIcon} src={keyIcon} alt="Пароль"/>
                                    <span className={s.fieldName}>Пароль</span>
                                    <p className={s.fieldDesc}>Последнее изменение месяц назад</p>
                                </div>
                                <div className={s.securityField} onClick={() => openModalFiles(!modalFiles)}>
                                    <img className={s.securityIcon} src={filesIcon} alt="files"/>
                                    <span className={s.fieldName}>Подтвердить личность
                                        <img src={verification.documents ? verifyIcon : unverifyIcon} alt="Верефикация" className={s.verifyIcon}/>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
            <PhoneUserReduxForm
                modalPhone={modalPhone}
                openModalPhone={openModalPhone}
                onSubmit={submitPhone}
                verifyPhone={verifyPhone}/>
            <ModalUserFiles
                modalFiles={modalFiles}
                openModalFiles={openModalFiles}
                onSubmit={postUserInfoFiles}/>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        isFetching: state.infoUser.isFetching,
        email:state.infoUser.email,
        phone:state.infoUser.phone,
        verification_id:state.infoUser.verification_id,
        verification: state.infoUser.verification
    };
};

export default compose(connect(mapStateToProps,
    {
        getUserData,
        takeCodeForPhone,
        sendPhoneCode,
        postUserFiles,
        resetUserPassword
    }), withAuthRedirect)(SecureUserArea);
