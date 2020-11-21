import s from "../DealPage.module.css";
import React from "react";
import { Field, reduxForm } from 'redux-form'

const Chat = ({onChatFormSubmit, chatMessages}) => {

    return <div className={'card shadow-none'}>
        <div className="card-header">
            <div className={'font-weight-bold mb-4'}>Чат</div>
            <div>

                {chatMessages.map((item, index) => <div key={index} className={'mb-3 ' + s.message + ' ' + s.dark}>
                    <div className={s.messageText}>{item.text}</div>
                    <div>{item.userName} {item.time}</div>
                </div>)}


                <div className="form-group mb-0">

                    <ChatForm onSubmit={onChatFormSubmit}/>

                </div>
            </div>
        </div>
    </div>
};

let ChatForm = ({ handleSubmit }) => {
    return <form className='form-group' onSubmit={handleSubmit}>

        <Field name='messageText' component='textarea' style={{resize: "none"}} className="form-control mb-3 mt-4"
               placeholder='Сообщение' id="exampleFormControlTextarea1" rows="3"/>

        <div className="float-sm-right mb-3 custom-control custom-toggle my-2">
            <Field component='input' type="checkbox" id="getEmails" name="getEmails"
                   className="custom-control-input"/>
            <label className="custom-control-label" htmlFor="getEmails">
                Получать ответы на почту
            </label>
        </div>

        <button type="submit" className="btn btn-outline-warning btn-pill">Отправить</button>

    </form>
};

ChatForm = reduxForm({
    form: 'chat'
})(ChatForm);



export default Chat;


