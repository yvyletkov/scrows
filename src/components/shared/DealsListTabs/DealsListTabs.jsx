import React from "react";
import s from "./DealsListTabs.module.css";
import {NavLink} from "react-router-dom";


const DealsListTabs = () => (
    <ul className={`nav nav-tabs card-header-tabs ${s.navList}`}>
        <li className={`nav-item col-3 ${s.navTab}`}>
            <NavLink to="/deals" className={`nav-link ${s.navLink}`}>
                Мои сделки
            </NavLink>
        </li>
        <li className={`nav-item col-3 ${s.navTab}`}>
            <NavLink to="/deals-completed" className={`nav-link ${s.navLink}`}>
                Завершенные
            </NavLink>
        </li>
        <li className={`nav-item col-3 ${s.navTab}`}>
            <NavLink to="/deals-claim" className={`nav-link ${s.navLink}`}>
                Претензии
            </NavLink>
        </li>
        <li className={`nav-item col-3 ${s.navTab}`}>
            <NavLink to="/deals-action" className={`nav-link ${s.navLink}`}>
                Требуют действия
            </NavLink>
        </li>
    </ul>
);

export default DealsListTabs;