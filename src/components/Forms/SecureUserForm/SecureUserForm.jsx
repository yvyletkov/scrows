import React, {useEffect} from "react";
import {connect} from "react-redux";
import PersonalAreaCard from "../../shared/PersonalAreaCard/PersonalAreaCard";
import s from "./SecureUserForm.module.css";
import {compose} from "redux";
import {withAuthRedirect} from "../../../hoc/withAuthRedirect";
import MobilePersonalAreaTabs from "../../shared/MobilePersonalAreaTabs/MobilePersonalAreaTabs";
import keyIcon from "../../../img/icons/key.svg";
import PhoneUserReduxForm from "./ModalPhone";
import {getUserData} from "../../../redux/AuthReducer";
import EmailUserReduxForm from "./ModalEmail";

const SecureUserArea = (props) => {
    const {isFetching, getUserData} = props;
    console.log(props)

    useEffect(() => {
        getUserData()
    }, [])

    return (
        <div className="container my-5">
            <div className="row">
                <PersonalAreaCard/>
                <div className={`card col-lg-8 col-12 ${s.cardMob}`}>
                    <MobilePersonalAreaTabs/>
                    <div className="card-header">
                        <h5 className="m-0">Безопасность</h5>
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-12">
                                <PhoneUserReduxForm/>
                                <EmailUserReduxForm/>
                                <div className={s.securityField}>
                                    <img className={s.securityIcon} src={keyIcon} alt="Пароль"/>
                                    <span className={s.fieldName}>Пароль</span>
                                    <p className={s.fieldDesc}>Последнее изменение месяц назад</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        isFetching: state.infoUser.isFetching,
    };
};

export default compose(connect(mapStateToProps, {getUserData}), withAuthRedirect)(SecureUserArea);
