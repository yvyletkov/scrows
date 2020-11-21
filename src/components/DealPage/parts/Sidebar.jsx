import React from "react";
import s from "../DealPage.module.css";
import vvpImg from "../../../img/vvp.jpg";
import damImg from "../../../img/dam.jpg";

const ParticipantCard = ({id, participants}) => {
    return <div className={`card mt-3 mb-3 mt-md-0 ${s.sidebarCard}`}>
        <div className='card-header'>
            <span className={'text-lg-left text-center font-weight-bold'}>{participants[id].role.title}</span>
        </div>
        <div className='card-body'>
            <img className={s.cardImg} src={vvpImg} alt="Путин"/>
            <p className='mb-2'><b>Имя: </b>{participants[id].user.name} {participants[id].user.last_name}</p>
            <p className='mb-2'><b>email: </b>нет</p>
            <span className='badge badge-outline-dark mt-2'>{participants[id].invite.type}</span>
        </div>
    </div>
}

const Sidebar = ({ userId = 0, ...props}) => {

    const createdAt = new Date(props.createdAt).toLocaleString('ru', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
    });


    const priceWithCommission = props.participants[userId].user_commission_amount + props.price;

    return (<>

        <ParticipantCard id={0} participants={props.participants}/>
        <ParticipantCard id={1} participants={props.participants}/>

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
                            Сумма к оплате с учетом комиссии
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
