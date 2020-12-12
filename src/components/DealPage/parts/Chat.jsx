import s from "../DealPage.module.css";
import React from "react";
import { Field, reduxForm, reset } from 'redux-form'
import {validate} from "../../../utils/validators/validators";

const Chat = ({onChatFormSubmit, chatMessages}) => {

    const chatBlockRef = React.useRef();

    React.useEffect( () => {
        console.log(chatBlockRef.current.scrollTop, chatBlockRef.current.scrollHeight)
        chatBlockRef.current.scrollTop = chatBlockRef.current.scrollHeight;
    }, [chatMessages])

    let userNames = [];

    for(let i =0; i < chatMessages.length; i++) {
        if (!userNames.includes(chatMessages[i].userName))
            userNames.push(chatMessages[i].userName)
    }

    return <div className={'card shadow-none'}>
        <div className="card-header">
            <div className={'font-weight-bold mb-4'}>Чат</div>
            <div ref={chatBlockRef} style={{maxHeight: '200px', overflowY: "scroll"}}>

                {chatMessages.map((item, index) => <div key={index} className={'mb-2 ' + s.message + ' ' + (item.userName === userNames[0]
                    ? s.firstColor : item.userName === userNames[1] ? s.secondColor : s.thirdColor)}>
                    <div className={s.messageText}>{item.messageText}</div>
                    <div>{item.userName} {item.time}</div>
                </div>)}

            </div>

            <div className="form-group mb-0">

                <ChatForm onSubmit={onChatFormSubmit}/>

            </div>
        </div>
    </div>
};

let ChatForm = ({ handleSubmit }) => {
    return <form className='form-group' onSubmit={handleSubmit}>

        <Field onKeyUp={ (e) => {
            if (e.keyCode === 13 && !e.ctrlKey) {
                handleSubmit();
            }
            return true;
        }} name='messageText' component='textarea' style={{resize: "none"}} className="form-control mb-3 mt-4"
               placeholder='Сообщение' id="exampleFormControlTextarea1" rows="3"/>

        <div className="float-sm-right mb-3 custom-control custom-toggle my-2">
            <Field component='input' type="checkbox" id="getEmails" name="getEmails"
                   className="custom-control-input"/>
            <label className="custom-control-label" htmlFor="getEmails">
                Получать ответы на почту
            </label>
        </div>

        <button type="submit" className="btn btn-outline-success btn-pill">Отправить</button>

    </form>
};

ChatForm = reduxForm({
    form: 'chat',
    validate,
    onSubmitSuccess: (result, dispatch) => {dispatch(reset('chat'))}
})(ChatForm);



export default Chat;


