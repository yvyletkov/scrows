import React, { useEffect } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import entityIcon from "../../../img/icons/entity.svg";
import extraDataIcon from "../../../img/icons/extra-data.svg";
import persIcon from "../../../img/icons/pers.svg";
import personalDataIcon from "../../../img/icons/personal-data.svg";
import secureIcon from "../../../img/icons/secure.svg";
import { getUserData } from "../../../redux/PersonalAreaReducer";
import s from "./PersonalAreaCard.module.css";

const PersonalAreaCard = (props) => {
  const { avatar, name, last_name, getUserData } = props;
  // const userType = props.entity_type === "entity" ?
  // (<li className="nav-item">
  //   <NavLink
  //     to="/entity-info"
  //     className={`nav-link ${s.navProfile}`}
  //   >
  //     <img
  //       className={s.navIcon}
  //       src={entityIcon}
  //       alt="entity-icon"
  //     />
  //     Данные юр.лица
  //   </NavLink>
  // </li> )
  // :
  // (<li className="nav-item mb-3">
  //   <NavLink
  //     to="/individual-info"
  //     className={`nav-link ${s.navProfile}`}
  //   >
  //     <img className={s.navIcon} src={persIcon} alt="pers-icon" />
  //     Данные физ.лица
  //   </NavLink>
  // </li>);

  useEffect(() => {
    getUserData();
  }, [last_name, avatar, name]);

  return (
        <div className={`col-lg-4 col-12 ${s.tabDesk}`}>
          <div className={s.userBlock}>
            <div
              className={s.avatarImg}
              style={{ backgroundImage: `url(${avatar})` }}
            ></div>
            <p className={s.nameUser}>
              {name} {last_name}
            </p>
            <p className={s.nameAbout}>Физическое лицо</p>
          </div>
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
                  Личная информация
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
              {/* {userType} */}
              <li className="nav-item">
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
              </li>
              <li className="nav-item mb-3">
                <NavLink
                  to="/individual-info"
                  className={`nav-link ${s.navProfile}`}
                >
                  <img className={s.navIcon} src={persIcon} alt="pers-icon" />
                  Данные физ.лица
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
  );
};

const mapStateToProps = (state) => {
  return {
    name: state.infoUser.name,
    last_name: state.infoUser.last_name,
    avatar: state.infoUser.avatar,
  };
};

export default connect(mapStateToProps, { getUserData })(PersonalAreaCard);
