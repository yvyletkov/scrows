import React from "react";
import s from "../DealPage.module.css";
import vvpImg from "../../../img/vvp.jpg";
import damImg from "../../../img/dam.jpg";

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
        <div className={`card mt-3 mt-md-0 ${s.sidebarCard}`}>
            <div className='card-header'>
                <div className={'text-lg-left text-center font-weight-bold'}>{props.participants[0].role.title}</div>
            </div>
            <div className='card-body'>
                <img className={s.cardImg} src={vvpImg} alt="Путин"/>
                <div>{props.participants[0].user.name}</div>
                <div>{props.participants[0].user.last_name}</div>
                <div><b>email:</b> vvp@scrows.ru</div>
                <span className='badge badge-outline-dark mt-2'>{props.participants[0].invite.type}</span>
            </div>
        </div>
        <div className={`card mt-3 ${s.sidebarCard}`}>
            <div className='card-header'>
                <div className={'text-lg-left text-center font-weight-bold'}>{props.participants[1].role.title}</div>
            </div>
            <div className='card-body'>
                <img className={s.cardImg} src={damImg} alt="Медведев"/>
                <div>{props.participants[1].user.name}</div>
                <div>{props.participants[1].user.last_name}</div>
                <div><b>email:</b> dam@scrows.ru</div>
                <span className='badge badge-outline-dark mt-2'>{props.participants[1].invite.type}</span>
            </div>
        </div>
        <div className={`card mt-3 ${s.sidebarCard}`}>
            <div className='card-header'>
                <div className={'text-lg-left text-center font-weight-bold'}>Описание сделки</div>
            </div>
            <div className='card-body'>
                <table className="table table-striped">

                    <tbody>
                    <tr>
                        <td>Тип сделки</td>
                        <td style={{width: '32%'}}>{props.dealType.title}</td>
                    </tr>
                    <tr>
                        <td>Дата создания</td>
                        <td style={{width: '32%'}}>{createdAt}</td>
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
