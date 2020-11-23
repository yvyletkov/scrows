import {Alert} from "shards-react";
import React from "react";


const AlertSuccess = ({show, text, style}) => {
    return (
        <Alert style={style} className="m-0" open={show} theme="success">
            <p>{text}</p>
        </Alert>
    )
}

const AlertDanger = ({show, text, style}) => {
    return (
        <Alert style={style} className="m-0" open={show} theme="danger">
            <p>{text}</p>
        </Alert>
    )
}

export {AlertSuccess, AlertDanger}