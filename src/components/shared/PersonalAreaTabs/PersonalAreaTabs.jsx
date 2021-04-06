import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {NavLink} from "react-router-dom";
import entityIcon from "../../../img/icons/briefcase.svg";
import extraDataIcon from "../../../img/icons/credit-card.svg";
import persIcon from "../../../img/icons/personal-data.svg";
import personalDataIcon from "../../../img/icons/information.svg";
import secureIcon from "../../../img/icons/secure.svg";
import dealsIcon from "../../../img/icons/handshake-active.svg";
import {getUserAvatar, getUserData, postUserAvatar} from "../../../redux/PersonalAreaReducer";
import s from "./PersonalAreaTabs.module.css";
import ModalAvatarForm from "./ModalAvatar";
import noAvatarUser from "../../../img/noAvatarUser.png"

const PersonalAreaTabs = (props) => {
    const {
        avatar,
        name,
        last_name,
        getUserData,
        entity_type,
        postUserAvatar,
        getUserAvatar,
        userId
    } = props;

    const userTypeTabs = entity_type === "entity" ?
        (<li className="nav-item">
            <NavLink to="/profile/entity-info" className={`nav-link ${s.navProfileTabs}`}>
                <img className={s.navIcon} src={entityIcon} alt="entity-icon"/>Данные юр.лица
            </NavLink>
      </li>)
      :
      (<li className="nav-item">
        <NavLink to="/profile/individual-info" className={`nav-link ${s.navProfileTabs}`}>
          <img className={s.navIcon} src={persIcon} alt="pers-icon"/>Данные физ.лица
        </NavLink>
      </li>);
  let userType = entity_type === "entity" ? "Юридическое" : "Физическое";
  let imageAvatar = avatar ? `https://api.scrows.ml/api/v1/media/get/${avatar.name}` : noAvatarUser;

  useEffect(() => {
    getUserData();
    getUserAvatar(userId);
  }, [last_name, name]);

    const [modalAvatar, openModalAvatar] = useState(false);

    const handleSubmit = (data) => {
        postUserAvatar(data.avatar[0]);
        openModalAvatar(false);
    }

  return (
      <div className={`col-lg-4 col-12 ${s.tabDesk}`}>
        <div className={s.userBlock}>
            <div className={s.avatarImg}
                 style={{backgroundImage: `url(${imageAvatar})`}}
                 onClick={() => openModalAvatar(!modalAvatar)}>
                <div className={s.icon} style={{backgroundColor: "rgba(76, 76, 76, 0.6)"}}>
                    <span className={s.iconAvatar}/>
                </div>
            </div>
            <p className={s.nameUser}>
                {name} {last_name}
            </p>
          <p className={s.nameAbout}>{userType} лицо</p>
        </div>
        <div className={s.navProfile}>
          <ul className={`nav-tabs ${s.navTabs}`}>
            <li className="nav-item">
              <NavLink to="/profile/personal-info"
                       className={`nav-link ${s.navProfileTabs}`}>
                <img className={s.navIcon}
                     src={personalDataIcon}
                     alt="Пользователь"/>
                Личная информация
              </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={`nav-link ${s.navProfileTabs}`} to="/profile/security">
                  <img className={s.navIcon} src={secureIcon} alt="Безопастность"/>Безопасность
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={`nav-link ${s.navProfileTabs}`}
                         to="/profile/payment-info">
                  <img className={s.navIcon}
                       src={extraDataIcon}
                       alt="Платежные данные"/>
                  Данные для выплат
                </NavLink>
              </li>
            {userTypeTabs}
              <li className="nav-item">
                  <NavLink className={`nav-link ${s.navProfileTabs}`} to="/profile/deals/">
                      <img className={s.navIcon} src={dealsIcon} alt="Сделки"/>Сделки
                  </NavLink>
              </li>
          </ul>
        </div>
          <ModalAvatarForm modalAvatar={modalAvatar}
                           openModalAvatar={openModalAvatar}
                           onSubmit={handleSubmit}/>
      </div>
  );
};


const mapStateToProps = (state) => {
  return {
      name: state.infoUser.name,
      last_name: state.infoUser.last_name,
      avatar: state.infoUser.avatar,
      entity_type: state.infoUser.entity_type,
      userId: state.infoUser.id,
  };
};

export default connect(mapStateToProps, {getUserData, postUserAvatar, getUserAvatar})(PersonalAreaTabs);
