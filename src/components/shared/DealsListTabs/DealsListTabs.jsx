import React from "react";
import s from "./DealsListTabs.module.css";
import {NavLink} from "react-router-dom";


const DealsListTabs = () => (
    <ul className={`nav nav-tabs card-header-tabs ${s.navList}`}>
        <li className={`nav-item col-3 ${s.navTab}`}>
            <NavLink to="/profile/deals/all" className={`nav-link ${s.navLink}`}>
                Весь список
            </NavLink>
        </li>
        <li className={`nav-item col-3 ${s.navTab}`}>
            <NavLink to="/profile/deals/deals-completed" className={`nav-link ${s.navLink}`}>
                Завершенные
            </NavLink>
        </li>
        <li className={`nav-item col-3 ${s.navTab}`}>
            <NavLink to="/profile/deals/deals-claim" className={`nav-link ${s.navLink}`}>
                Претензии
            </NavLink>
        </li>
        <li className={`nav-item col-3 ${s.navTab}`}>
            <NavLink to="/profile/deals/deals-action" className={`nav-link ${s.navLink}`}>
                Ждут действия
            </NavLink>
        </li>
    </ul>
);

export default DealsListTabs;
