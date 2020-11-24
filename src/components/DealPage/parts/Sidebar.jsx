import React from "react";
import s from "../DealPage.module.css";
import vvpImg from "../../../img/vvp.jpg";
import damImg from "../../../img/dam.jpg";

const ParticipantCard = ({participant, img}) => {
    return <div className={`card mt-3 mb-3 mt-md-0 ${s.sidebarCard}`}>
        <div className='card-header'>
            <span className={'text-lg-left text-center font-weight-bold'}>
                {participant.role.title} {participant.me && "(это Вы)"}
            </span>
        </div>
        <div className='card-body'>
            <img className={s.cardImg} src={img} alt="Путин"/>
            <p className='mb-2'><b>Имя: </b>{participant.user.name} {participant.user.last_name}</p>
            <p className='mb-2'><b>E-mail: </b>{participant.user.email}</p>
            <span className='badge badge-outline-dark mt-2'>{participant.invite.type}</span>
        </div>
    </div>
}

const Sidebar = (props) => {

    const createdAt = new Date(props.createdAt).toLocaleString('ru', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
    });

    let currentUserID;
    let currentUser = {
        "role": {
            "title": "Продавец"
        }
    }
    let commission_label;
    for (let i = 0; i<=1; i++) {
        if (props.participants[i].me) {
            currentUserID = i;
            currentUser = props.participants[i];
        }
    }
    const priceWithCommission = props.participants[0].user_commission_amount && props.participants[currentUserID].user_commission_amount + props.price;
    if (currentUser.role.title === "Продавец"){
        commission_label = "Сумма, которая будет перечислена вам на счет"
    }
    else {
        commission_label = "Сумма к оплате"
    }

    return (<>

        <ParticipantCard participant={props.participants[0]} img={vvpImg}/>
        <ParticipantCard participant={props.participants[1]} img={damImg}/>

        <div className={`card mt-3 ${s.sidebarCard}`}>
            <div className='card-header'>
                <div className={'text-lg-left text-center font-weight-bold'}>Описание сделки</div>
            </div>
            <div className='card-body'>
                <table className="table table-striped">

                    <tbody>
                    <tr>
                        <td>Тип сделки</td>
                        <td style={{width: '35%'}}>{props.dealType.title}</td>
                    </tr>
                    <tr>
                        <td>Дата создания</td>
                        <td style={{width: '35%'}}>{createdAt}</td>
                    </tr>
                    <tr>
                        <td>
                            Срок доставки
                        </td>
                        <td>нет</td>
                    </tr>
                    <tr>
                        <td>Кто платит комиссию</td>
                        <td>{props.commissionType.title}</td>
                    </tr>

                    <tr>
                        <td>Комиссия пощадки</td>
                        <td>{props.commissionAmount} руб.</td>
                    </tr>

                    <tr>
                        <td>
                            {commission_label}
                        </td>
                        <td>
                            {priceWithCommission}
                        </td>
                    </tr>
                    </tbody>
                </table>

            </div>
        </div>
    </>)
}

export default Sidebar;
