import React from "react";
import s from "./DealsTabs.module.css";
import {NavLink} from "react-router-dom";
import dealIconWarning from "../../../img/icons/handshake-warning.svg";
import dealIconSucces from "../../../img/icons/handshake-succes.svg";
import dealIconDanger from "../../../img/icons/handshake-danger.svg";
import dealIconActive from "../../../img/icons/handshake-active.svg";


const DealsTabs = () => {
    return (
        <div className={`col-lg-4 col-12 mt-5 ${s.tabDesk}`}>
            <div className={s.navProfile}>
                <ul className={`nav-tabs ${s.navTabs}`}>
                    <li className="nav-item">
                        <NavLink
                            to="#"
                            className={`nav-link ${s.navProfile}`}>
                            <img
                                className={s.navIcon}
                                src={dealIconActive}
                                alt="user-icon"/>
                            Активные
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className={`nav-link ${s.navProfile}`} to="#">
                            <img
                                className={s.navIcon}
                                src={dealIconSucces}
                                alt="secure-icon"/>
                            Завершенные
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink
                            className={`nav-link ${s.navProfile}`}
                            to="#">
                            <img
                                className={s.navIcon}
                                src={dealIconDanger}
                                alt="extra-icon"/>Претензии
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink
                            className={`nav-link ${s.navProfile}`}
                            to="#">
                            <img
                                className={s.navIcon}
                                src={dealIconWarning}
                                alt="extra-icon"/>Требуют действия
                        </NavLink>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default DealsTabs;