import React from "react";
import s from "./MobilePersonalAreaTabs.module.css"
import {NavLink} from "react-router-dom";
import {connect} from "react-redux";
import {getUserData} from "../../../redux/PersonalAreaReducer";


const MobilePersonalAreaTabs = (props) => {
    const {entity_type} = props;

    let userType = entity_type === "entity" ?
        <li className={`nav-item ${s.navLinkMob}`}>
            <NavLink
                to="/entity-info"
                className={`nav-link ${s.navProfile}`}
            >
                Данные юр.лица
            </NavLink>
        </li> :
        <li className={`nav-item ${s.navLinkMob}`}>
            <NavLink
                to="/individual-info"
                className={`nav-link mb-2 ${s.navProfile}`}
            >
                Данные физ.лица
            </NavLink>
        </li>;

    return (
        <div className={`card-header ${s.cardHeaderMob}`}>
            <ul className="nav nav-tabs card-header-tabs">
                <li className={`nav-item ${s.navLinkMob}`}>
                    <NavLink
                        to="/personal-info"
                        className={`nav-link ${s.navProfile}`}
                    >
                        Данные о пользователе
                    </NavLink>
                </li>
                <li className={`nav-item ${s.navLinkMob}`}>
                    <NavLink to="/security" className={`nav-link ${s.navProfile}`}>
                        Безопасность
                    </NavLink>
                </li>
                <li className={`nav-item ${s.navLinkMob}`}>
                    <NavLink
                        to="/payment-info"
                        className={`nav-link ${s.navProfile}`}
                    >
                        Платежные данные
                    </NavLink>
                </li>
                {userType}
            </ul>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        entity_type: state.infoUser.entity_type,
    };
};

export default connect(mapStateToProps, {getUserData})(MobilePersonalAreaTabs);