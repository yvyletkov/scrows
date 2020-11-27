import React from 'react';
import s from "./SecureUserForm.module.css";
import {Field, reduxForm} from "redux-form";
import {renderCardNumberInput} from "../../shared/FormContols/FormControls";
import {validate, warn} from "../../../utils/validators/validators";
import {connect} from "react-redux";


const ModalPhone = (props) => {
    const {
        handleSubmit,
        pristine,
        reset,
        submitting,
    } = props;

    return (
        <form className={s.formModal} onSubmit={handleSubmit}>
            <Field
                placeholder="Введите код из смс"
                name="code"
                type="number"
                component={renderCardNumberInput}
                required
            />
            <button
                type="submit"
                className="btn btn-success mt-3"
                disabled={submitting || pristine}>
                Отправить код
            </button>
        </form>

    )
}


const CodeReduxForm = reduxForm({
    form: "codeForm",
    validate,
    enableReinitialize: true,
    warn,
})(ModalPhone);

export default connect()(CodeReduxForm);
