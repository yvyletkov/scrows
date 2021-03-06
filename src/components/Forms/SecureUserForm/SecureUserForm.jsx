import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import s from "./SecureUserForm.module.css";
import {compose} from "redux";
import {withAuthRedirect} from "../../../hoc/withAuthRedirect";
import MobilePersonalAreaTabs from "../../shared/MobilePersonalAreaTabs/MobilePersonalAreaTabs";
import keyIcon from "../../../img/icons/key.svg";
import PhoneUserReduxForm from "./ModalPhone";
import {
    getScansPersonalData,
    getUserData,
    postUserFiles,
    resetUserPassword,
    sendPhoneCode,
    takeCodeForPhone,
    verifyEmail
} from "../../../redux/PersonalAreaReducer";
import emailIcon from "../../../img/icons/email.svg";
import phoneIcon from "../../../img/icons/phone.svg";
import filesIcon from "../../../img/icons/files.svg";
import ModalUserFiles from "./ModalFiles";
import Swal from "sweetalert2";

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
        verification,
        verifyEmail,
        getScansPersonalData,
        userId,
        scansPersonalData,
        entity_type
    } = props;

    useEffect(() => {
        getUserData();
    }, []);

    useEffect(() => {
        console.log(userId)
        getScansPersonalData(userId);
    }, [userId]);

    const [modalPhone, openModalPhone] = useState(false);
    const [modalFiles, openModalFiles] = useState(false);

    const submitPhone = (phone) => {
        takeCodeForPhone(phone.phone)
    }

    const verifyPhone = (code) => {
        sendPhoneCode(verification_id, code.code);
        openModalPhone(!modalPhone);
    }

    const postUserInfoFiles = (files) => {
        postUserFiles(files.files);
        openModalFiles(!modalFiles);
    }

    return (
                <div className={`card shadow-none col-lg-8 col-12 ${s.cardMob}`}>
                    <MobilePersonalAreaTabs/>
                    <div className="card-header">
                        <h5 className="m-0">????????????????????????</h5>
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-12 p-0">
                                <div className={s.securityField} onClick={() => !verification.email &&
                                    Swal.fire({
                                        icon: 'warning',
                                        title: '???? ???????????? ?????????????????????? email?',
                                        showCancelButton: true,
                                        confirmButtonColor: '#3085d6',
                                        cancelButtonColor: '#d33',
                                        confirmButtonText: '????????????????????',
                                        cancelButtonText: '????????????'
                                    }).then((result) => {
                                        if (result.value) {
                                            verifyEmail();
                                        }
                                    })
                                }>
                                    <img className={s.securityIcon} src={emailIcon} alt="Email"/>
                                    <span className={s.fieldName}>Email
                                        <span
                                            className={`badge ml-2 ${verification.email ? "badge-success" : "badge-danger"}`}
                                            alt="??????????????????????">{verification.email ? "????????????????????????" : "??????????????????????"}
                                        </span>
                                    </span>
                                    <p className={s.fieldDesc}>{email}</p>
                                </div>
                                <div className={s.securityField} onClick={() =>
                                    verification.phone ?
                                    openModalPhone(!modalPhone)
                                    :
                                    Swal.fire({
                                        // icon: 'warning',
                                        title: '???? ???????????? ?????????????????????? ???????????????',
                                        showCancelButton: true,
                                        confirmButtonColor: '#3085d6',
                                        cancelButtonColor: '#d33',
                                        confirmButtonText: '??????????????????????',
                                        cancelButtonText: '????????????'
                                    }).then((result) => {
                                        if (result.value) {
                                            submitPhone({phone})
                                            openModalPhone(true);
                                        }
                                    })
                                }>
                                    <img className={s.securityIcon} src={phoneIcon} alt="??????????????"/>
                                    <span className={s.fieldName}>?????????? ????????????????
                                        <span
                                            className={`badge ml-2 ${verification.phone ? "badge-success" : "badge-danger"}`}
                                            alt="??????????????????????">{verification.phone ? "????????????????????????" : "??????????????????????"}
                                        </span>
                                    </span>
                                    <p className={s.fieldDesc}>{phone}</p>
                                </div>
                                <div className={s.securityField} onClick={() =>
                                    Swal.fire({
                                        icon: 'warning',
                                        title: '???? ???????????? ???????????????? ?????????????',
                                        showCancelButton: true,
                                        confirmButtonColor: '#3085d6',
                                        cancelButtonColor: '#d33',
                                        confirmButtonText: '????????????????',
                                        cancelButtonText: '????????????'
                                    }).then((result) => {
                                        if (result.value) {
                                            resetUserPassword();
                                        }
                                    })
                                }>
                                    <img className={s.securityIcon} src={keyIcon} alt="????????????"/>
                                    <span className={s.fieldName}>????????????</span>
                                    <p className={s.fieldDesc}>?????????????????? ?????????????????? ?????????? ??????????</p>
                                </div>
                                <div className={s.securityField} onClick={() => openModalFiles(!modalFiles)}>
                                    <img className={s.securityIcon} src={filesIcon} alt="files"/>
                                    <span className={s.fieldName}>??????????????
                                        <span
                                            className={`badge ml-2 ${verification.documents ? "badge-success" : "badge-danger"}`}
                                            alt="??????????????????????">{verification.documents ? "????????????????????????" : "??????????????????????"}
                                        </span>
                                    </span>
                                    <p className={s.fieldDesc}>{scansPersonalData.length > 1 && '?????????????????? ??????????????????' }</p>
                                </div>
                                {entity_type === "entity" &&
                                <div className={s.securityField} onClick={() => openModalFiles(!modalFiles)}>
                                    <img className={s.securityIcon} src={filesIcon} alt="files"/>
                                    <span className={s.fieldName}>?????????????????????????? ?? ????.????????
                                        <span
                                            className={`badge ml-2 ${verification.documents ? "badge-success" : "badge-danger"}`}
                                            alt="??????????????????????">{verification.documents ? "????????????????????????" : "??????????????????????"}
                                        </span>
                                    </span>
                                    <p className={s.fieldDesc}>{scansPersonalData.length > 1 && '?????????????????? ??????????????????' }</p>
                                </div>}
                                {!(verification.documents && verification.phone && verification.email) &&
                                <div className="text-center">
                                    <p className="my-3" style={{fontSize: '14px'}}>???????????????? ?????? ???????????? ?????????????????????? ???????????? ?????? ?????????????? ?????? ?????????????? ?????????????? ??
                                        ????????????</p>
                                    <p className={`badge badge-danger ${s.noVerificate}`}>?????? ?????????????? ???? ??????????????????????????</p>
                                </div>}
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
        verification: state.infoUser.verification,
        userId: state.infoUser.id,
        scansPersonalData: state.infoUser.scansPersonalData,
        entity_type: state.infoUser.entity_type
    };
};

export default compose(connect(mapStateToProps,
    {
        getUserData,
        takeCodeForPhone,
        sendPhoneCode,
        postUserFiles,
        resetUserPassword,
        verifyEmail,
        getScansPersonalData,
    }), withAuthRedirect)(SecureUserArea);
