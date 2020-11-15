import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {NavLink} from "react-router-dom";
import entityIcon from "../../../img/icons/briefcase.svg";
import extraDataIcon from "../../../img/icons/credit-card.svg";
import persIcon from "../../../img/icons/personal-data.svg";
import personalDataIcon from "../../../img/icons/information.svg";
import secureIcon from "../../../img/icons/secure.svg";
import {getUserData} from "../../../redux/PersonalAreaReducer";
import s from "./PersonalAreaCard.module.css";
import {Modal, ModalBody, ModalHeader} from "shards-react";
import {Field, reduxForm} from "redux-form";
import {validate, warn} from "../../../utils/validators/validators";
import {renderPersonalAreaInput} from "../FormContols/FormControls";

const PersonalAvatarUser = (props) => {
  const {submitting, pristine, handleSubmit} = props;
  return (
      <form onSubmit={handleSubmit}>
        <Field
            placeholder="Укажите ссылку на картинку"
            name="avatar"
            type="text"
            component={renderPersonalAreaInput}
            required
        />
        <button
            type="submit"
            className="btn btn-success mt-3"
            disabled={submitting || pristine}
        >
          Сменить аватар
        </button>
      </form>
  )
}

const PersonalReduxForm = reduxForm({
  form: "PersonalForm",
  validate,
  enableReinitialize: true,
  warn,
})(PersonalAvatarUser);

const PersonalAreaCard = (props) => {
  const {avatar, name, last_name, getUserData, entity_type} = props;

  const handleSubmit = (data) => {
    console.log(data)
  }
  const userTypeTabs = entity_type === "entity" ?
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
      </li>)
      :
      (<li className="nav-item mb-3">
        <NavLink
            to="/individual-info"
            className={`nav-link ${s.navProfile}`}
        >
          <img className={s.navIcon} src={persIcon} alt="pers-icon"/>
          Данные физ.лица
        </NavLink>
      </li>);
  let userType = entity_type === "entity" ? "Юридическое" : "Физическое";
  let imageAvatar = avatar ? avatar : 'https://www.shareicon.net/data/512x512/2017/01/06/868320_people_512x512.png';

  useEffect(() => {
    getUserData();
  }, [last_name, avatar, name]);

  const [open, openModal] = useState(false);

  return (
      <div className={`col-lg-4 col-12 ${s.tabDesk}`}>
        <div className={s.userBlock}>
          <div className={s.avatarImg}
               style={{backgroundImage: `url(${imageAvatar})`}}
               onClick={() => openModal(true)}>
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
            {userTypeTabs}
          </ul>
        </div>
        <Modal
            className={s.modalWindow}
            open={open}
            toggle={() => {
              openModal(false);
            }}
        >
          <ModalHeader className="justify-content-center">
            <p>Введите ссылку на аватар</p>
          </ModalHeader>
          <ModalBody>
            <PersonalReduxForm
                onSubmit={handleSubmit}/>
          </ModalBody>
        </Modal>
      </div>
  );
};


const mapStateToProps = (state) => {
  return {
    name: state.infoUser.name,
    last_name: state.infoUser.last_name,
    avatar: state.infoUser.avatar,
    entity_type: state.infoUser.entity_type,
  };
};

export default connect(mapStateToProps, { getUserData })(PersonalAreaCard);
