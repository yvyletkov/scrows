import React from "react";
import s from "../DealPage.module.css";
import vvpImg from "../../../img/vvp.jpg";
import damImg from "../../../img/dam.jpg";

const Sidebar = ({dealType}) => {
    return (<>
        <div className={`card mt-3 mt-md-0 ${s.sidebarCard}`}>
            <div className='card-header'>
                <div className={'text-lg-left text-center font-weight-bold'}>Продавец</div>
            </div>
            <div className='card-body'>
                <img className={s.cardImg} src={vvpImg} alt="Путин"/>
                <div>Путин</div>
                <div>Владимир</div>
                <div><b>email:</b> vvp@scrows.ru</div>
            </div>
        </div>
        <div className={`card mt-3 ${s.sidebarCard}`}>
            <div className='card-header'>
                <div className={'text-lg-left text-center font-weight-bold'}>Покупатель</div>
            </div>
            <div className='card-body'>
                <img className={s.cardImg} src={damImg} alt="Медведев"/>
                <div>Медведев</div>
                <div>Дмитрий</div>
                <div><b>email:</b> dam@scrows.ru</div>
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
                        <td style={{width: '32%'}}>{dealType.title}</td>

                    </tr>
                    <tr>
                        <td>
                            Срок доставки
                        </td>
                        <td>07.10.2020</td>
                    </tr>
                    <tr>
                        <td>Кто платит комиссию</td>
                        <td>50/50</td>
                    </tr>

                    <tr>
                        <td>Комиссия пощадки</td>
                        <td>0.6 руб.</td>
                    </tr>

                    <tr>
                        <td>
                            Сумма к оплате с учетом комиссии
                        </td>
                        <td>10.3 руб.</td>
                    </tr>
                    </tbody>
                </table>

            </div>
        </div>
    </>)
}

export default Sidebar;
