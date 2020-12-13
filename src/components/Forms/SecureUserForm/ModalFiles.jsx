import React from 'react';
import s from "./SecureUserForm.module.css";
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
        onChange(e.target.files[0])
    }

    render() {
        const {id, name} = this.props
        return (
            <input style={{visibility: 'hidden'}}
                   id={id}
                   type='file'
                   name={name}
                   accept='.jpg, .png, .jpeg'
                   onChange={this.onChange}
            />
        )
    }
}


const ModalFiles = (props) => {
    const {
        handleSubmit,
        pristine,
        reset,
        submitting,
        openModalFiles,
        modalFiles,
    } = props;

    return (
            <Modal className={s.modalWindow}
                   open={modalFiles}
                   toggle={() => openModalFiles(!modalFiles)}>
                <img onClick={() => openModalFiles(!modalFiles)} src={iconClose} alt="Закрыть" className={s.iconClose} />
                <ModalHeader className={s.modalHeader}>
                    <p>Загрузите сканы документов</p>
                </ModalHeader>
                <AlertSuccess show={false} text={"Информация сохранена"}/>
                <AlertDanger show={false} text={"Не удалось сохранить данные"}/>
                <ModalBody>
                        <form className={s.formModal} onSubmit={handleSubmit}>
                            <div className="custom-file mb-3">
                                <Field component={renderFileInputField} name='files' type="file" className="custom-file-input" id="customFile"/>
                                <label className="custom-file-label" htmlFor="customFile">
                                    Нажмите, чтобы выбрать файлы</label>
                            </div>
                            <button
                                type="submit"
                                className="btn btn-success mt-3"
                                disabled={submitting || pristine}>
                                Отправить файлы на проверку
                            </button>
                        </form>
                </ModalBody>
            </Modal>
    )
}


const ModalUserFiles = reduxForm({
    form: "userFilesForm",
    validate,
    enableReinitialize: true,
    warn,
})(ModalFiles);

const mapStateToProps = (state) => {
    return {
        files: state.infoUser.files,
    };
};

export default connect(mapStateToProps)(ModalUserFiles);
