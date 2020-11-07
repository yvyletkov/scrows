import React from "react";
import s from "./PersonalAreaCard.module.css";
import { NavLink } from "react-router-dom";
import personalDataIcon from "../../../img/icons/personal-data.svg";
import secureIcon from "../../../img/icons/secure.svg";
import extraDataIcon from "../../../img/icons/extra-data.svg";
import entityIcon from "../../../img/icons/entity.svg";
import persIcon from "../../../img/icons/pers.svg";
import adminIcon from "../../../img/icons/admin.svg";

const PersonalAreaCard = (props) => {

  const userType = props.entity_type === "entity" ? 
  (<li className="nav-item">
    <NavLink
      to="/entity-info"
      className={`nav-link ${s.navProfile}`}
    >
      <img
        className={s.navIcon}
        src={entityIcon}
        alt="entity-icon"
      />
      Данные юр.лица
    </NavLink>
  </li> )
  :
  (<li className="nav-item mb-3">
    <NavLink
      to="/individual-info"
      className={`nav-link ${s.navProfile}`}
    >
      <img className={s.navIcon} src={persIcon} alt="pers-icon" />
      Данные физ.лица
    </NavLink>
  </li>);
  
  return (
    <div className="container mt-5">
      <div className="row">
        <div className={`col-lg-4 col-12 ${s.tabDesk}`}>
          <div className={s.navProfile}>
            <ul className={`nav-tabs ${s.navTabs}`}>
              <li className="nav-item">
                <NavLink
                  to="/personal-info"
                  className={`nav-link ${s.navProfile}`}
                >
                  <img
                    className={s.navIcon}
                    src={personalDataIcon}
                    alt="user-icon"
                  />
                  Данные о пользователе
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={`nav-link ${s.navProfile}`} to="/security">
                  <img
                    className={s.navIcon}
                    src={secureIcon}
                    alt="secure-icon"
                  />
                  Безопасность
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className={`nav-link ${s.navProfile}`}
                  to="/payment-info"
                >
                  <img
                    className={s.navIcon}
                    src={extraDataIcon}
                    alt="extra-icon"
                  />
                  Платежные данные
                </NavLink>
              </li>
              {userType}
            </ul>
          </div>
        </div>
        <div className={`card col-lg-8 col-12 ${s.cardMob}`}>
          <div className={`card-header ${s.cardHeaderMob}`}>
            <ul className="nav nav-tabs card-header-tabs">
              <li className={`nav-item ${s.navLinkMob}`}>
                <NavLink to="/personal-info" className={`nav-link ${s.navProfile}`}>
                  Данные о пользователе
                </NavLink>
              </li>
              <li className={`nav-item ${s.navLinkMob}`}>
                <NavLink to="/security" className={`nav-link ${s.navProfile}`}>
                  Безопасность
                </NavLink>
              </li>
              <li className={`nav-item ${s.navLinkMob}`}>
                <NavLink to="/payment-info" className={`nav-link ${s.navProfile}`}>
                  Платежные данные
                </NavLink>
              </li>
              <li className={`nav-item ${s.navLinkMob}`}>
                <NavLink to="/entity-info" className={`nav-link ${s.navProfile}`}>
                  Данные юр.лица
                </NavLink>
              </li>
              <li className={`nav-item ${s.navLinkMob}`}>
                <NavLink to="/individual-info" className={`nav-link mb-2 ${s.navProfile}`}>
                  Данные физ.лица
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="card-body">
            <h4 className="card-title">{props.titleCard}</h4>
            {props.InfoCard}
            {/* <InfoUserReduxForm onSubmit={handleSubmit} /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalAreaCard;
