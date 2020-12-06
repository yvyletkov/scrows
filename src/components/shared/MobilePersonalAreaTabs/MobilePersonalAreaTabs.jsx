import React, {useState} from "react";
import s from "./MobilePersonalAreaTabs.module.css"
import {NavLink} from "react-router-dom";
import {connect} from "react-redux";
import {getUserData} from "../../../redux/PersonalAreaReducer";
import {Dropdown, DropdownItem, DropdownMenu, DropdownToggle} from "shards-react";


const MobilePersonalAreaTabs = (props) => {
    const {entity_type} = props;

    let [dropdownOpen2, setDropdownOpen2] = React.useState(false);

    const toggleDropdown2 = () => {
        setDropdownOpen2(!dropdownOpen2)
    };

    let userType = entity_type === "entity" ?
        <li className={`nav-item ${s.navLinkMob}`}>
            <NavLink to="/profile/entity-info"
                     className={`nav-link ${s.navProfile}`}>Данные юр.лица
            </NavLink>
        </li> :
        <li className={`nav-item ${s.navLinkMob}`}>
            <NavLink to="/profile/individual-info"
                     className={`nav-link mb-2 ${s.navProfile}`}>Данные физ.лица
            </NavLink>
        </li>;

    return (
        <div className={`card-header ${s.cardHeaderMob}`}>
            <ul className="nav nav-tabs card-header-tabs">
                <li className={`nav-item ${s.navLinkMob}`}>
                    <NavLink to="/profile/personal-info"
                             className={`nav-link ${s.navProfile}`}>Данные о пользователе
                    </NavLink>
                </li>
                <li className={`nav-item ${s.navLinkMob}`}>
                    <NavLink to="/profile/security" className={`nav-link ${s.navProfile}`}>
                        Безопасность
                    </NavLink>
                </li>
                <li className={`nav-item ${s.navLinkMob}`}>
                    <NavLink to="/profile/payment-info"
                             className={`nav-link ${s.navProfile}`}>Платежные данные
                    </NavLink>
                </li>
                {userType}
                <li className={`nav-item ${s.navLinkMob}`}>
                    <Dropdown open={dropdownOpen2}
                              toggle={toggleDropdown2}>
                        <DropdownToggle className={`nav-link ${s.navProfile}`} nav caret>
                            Сделки
                        </DropdownToggle>
                        <DropdownMenu className={s.dropMenu}>
                            <NavLink to="/profile/deals">
                                <DropdownItem>Все сделки</DropdownItem>
                            </NavLink>
                            <NavLink to="/profile/deals/deals-completed">
                                <DropdownItem>Завершенные</DropdownItem>
                            </NavLink>
                            <NavLink to="/profile/deals/deals-claim">
                                <DropdownItem>Претензии</DropdownItem>
                            </NavLink>
                            <NavLink to="/profile/deals/deals-action">
                                <DropdownItem>Ждут действия</DropdownItem>
                            </NavLink>
                        </DropdownMenu>
                    </Dropdown>
                </li>
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
