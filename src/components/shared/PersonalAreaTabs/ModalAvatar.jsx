import React from 'react';
import s from "./PersonalAreaTabs.module.css";
import {Modal, ModalBody, ModalHeader} from "shards-react";
import {AlertDanger, AlertSuccess} from "../../shared/CustomAlerts/CustomAlerts";
import {Field, reduxForm} from "redux-form";
import {validate, warn} from "../../../utils/validators/validators";
import {connect} from "react-redux";
import iconClose from "../../../img/icons/close.svg";

class renderFileInputField extends React.Component {
    constructor(props) {
        super(props)
        this.onChange = this.onChange.bind(this)
    }

    onChange(e) {
        const {input: {onChange}} = this.props
        onChange(e.target.files)
    }

    render() {
        const {id, name} = this.props
        let nameFile = [];
        if(this.props.input.value){
            for( let file of this.props.input.value) {
                nameFile.push(file.name);
            }
        }

        return (
            <>
                <input style={{visibility: 'hidden'}}
                       id={id}
                       type='file'
                       name={name}
                       accept='.jpg, .png, .jpeg'
                       onChange={this.onChange}/>
                <label className="custom-file-label" htmlFor="customFile">
                    {this.props.input.value ? nameFile.join(" ").slice(0, 40) : 'Выберите файл'}
                </label>
            </>
        )
    }
}


const ModalAvatar = (props) => {
    const {
        handleSubmit,
        pristine,
        reset,
        submitting,
        modalAvatar,
        openModalAvatar,
        validate
    } = props;

    return (
        <Modal className={s.modalWindow}
               open={modalAvatar}
               toggle={() => openModalAvatar(!modalAvatar)}>
            <img onClick={() => openModalAvatar(!modalAvatar)}
                 src={iconClose}
                 alt="Закрыть"
                 className={s.iconClose} />
            <ModalHeader className="justify-content-center">
                <p>Введите ссылку на аватар</p>
            </ModalHeader>
            <ModalBody>
                <form className={s.avatarForm} onSubmit={handleSubmit}>
                    <div className="custom-file mb-3">
                        <Field component={renderFileInputField} name='avatar' type="file" className="custom-file-input" id="customFile"/>
                    </div>
                    <button type="submit"
                            className="btn btn-success mt-3"
                            disabled={submitting || pristine || !validate}>Сменить аватар
                    </button>
                </form>
            </ModalBody>
        </Modal>
    )
}


const ModalAvatarForm = reduxForm({
    form: "userAvatar",
    validate,
    enableReinitialize: true,
    warn,
})(ModalAvatar);

const mapStateToProps = (state) => {
    return {
        files: state.infoUser.files,
    };
};

export default connect(mapStateToProps)(ModalAvatarForm);
