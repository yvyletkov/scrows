import {Alert} from "shards-react";
import React from "react";


const AlertSuccess = ({show, text}) => {
    return (
        <Alert className="m-0" open={show} theme="success">
            {text}
        </Alert>
    )
}

const AlertDanger = ({show, text}) => {
    return (
        <Alert className="m-0" open={show} theme="danger">
            <p className="text-center">{text}</p>
        </Alert>
    )
}

export {AlertSuccess, AlertDanger}