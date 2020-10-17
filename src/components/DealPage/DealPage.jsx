import React from "react";
import s from "./DealPage.module.css";
import './DealPage.module.css'
import {connect} from "react-redux";
import {login} from "../../redux/reducer";

const StatusTimeline = ({status = 4}) => {

    const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    let statusItems = array.map((item) => {
        return <div key={item} className={s.statusItemWrapper}>
            <div
                className={item < status ? `${s.statusItem} ${s.archieved} ${s.past}` : item == status ? `${s.statusItem} ${s.archieved}` : `${s.statusItem}`}>
                {item < status ? <i className="fas fa-check fa-2x"></i> : null}
            </div>
        </div>
    })

    return (
        <div className={s.statusTimelineWrapper}>
            <h3><span className="badge badge-light">Ожидает оплаты</span></h3>
            <div className={s.statusTimeline}>
                {statusItems}
            </div>
        </div>

    )
}

const DealPage = () => {
    return (
        <div className='container mt-4'>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><a href="#">Сервис для проведения безопасных сделок</a></li>
                    <li className="breadcrumb-item"><a href="#">Ваши сделки</a></li>
                    <li className="breadcrumb-item active" aria-current="page">Просмотр сделок</li>
                </ol>
            </nav>
            <div className='row mt-5'>
                <div className='col-md-9'>
                    <div className='card-body'>
                        <h4>Сделка №9999</h4>
                    </div>
                    <div className='card mb-4'>
                        <div className='card-body'>

                            <StatusTimeline/>

                        </div>
                    </div>
                    <div className='mb-2'>
                        <div className='card-body'>
                            <h4 className='card-title'>Предмет сделки</h4>
                            <p><span className="badge badge-light">Что-то продаем</span></p>
                        </div>
                    </div>
                    <div className='mb-4'>
                        <div className='card-body'>
                            <h4 className='card-title'>История сделки</h4>
                            <p>
                                <span style={{color: "#fff"}} className="badge badge-warning mr-2 mb-2">07.10.2020 23:24:31</span> создана
                                сделка: Вадим Закиров<br/>
                                <span style={{color: "#fff"}} className="badge badge-warning mr-2 mb-2">07.10.2020 23:24:31</span> отправлено
                                приглашение Покупатель на
                                email:vadimzakirov1992@gmail.com<br/>
                                <span style={{color: "#fff"}} className="badge badge-warning mr-2 mb-2">07.10.2020 23:24:35</span> Сделка
                                перешла в статус ПРИГЛАШЕНИЕ ВТОРОГО УЧАСТНИКА<br/>
                                <span style={{color: "#fff"}} className="badge badge-warning mr-2 mb-2">07.10.2020 23:24:35</span> Ожидание
                                принятия условий второго участника<br/>
                                <span style={{color: "#fff"}} className="badge badge-warning mr-2 mb-2">07.10.2020 23:26:49</span> Условия
                                сделки приняты, ожидание оплаты от заказчика<br/>
                                <span style={{color: "#fff"}} className="badge badge-warning mr-2 mb-2">07.10.2020 23:27:35</span> Выбран тип
                                оплаты. Физ.лицо. Проведение электронного платежа<br/>
                                <span style={{color: "#fff"}} className="badge badge-warning mr-2 mb-2">07.10.2020 23:28:42</span> Оплата
                                поступила, исполнитель приступил к выполнению работ<br/>
                                <span style={{color: "#fff"}} className="badge badge-warning mr-2 mb-2">07.10.2020 23:28:40</span> Оплата
                                проведена успешно через сервис paykeeper.ru<br/>
                            </p>
                        </div>
                    </div>
                    <div className='card mb-5'>
                        <div className='card-body'>
                            <h4 className='card-title'>Файлы сделки</h4>
                            <p>К этой сделке файлы не прикреплены</p>
                        </div>
                    </div>
                    <div className='mb-4'>
                        <div className='card-body'>
                            <h4 className='card-title mb-3'>Чат между участниками сделки</h4>

                            <div className='row mb-3'>
                                <div className='col-12'>
                                    {/*<p className='text-muted mb-2 mt-2'>Пока сообщений нет</p>*/}

                                    <div className='mb-1'>
                                        <h5 className='d-inline'><span className="badge badge-secondary mr-2 mb-2">Владимир (07.10.2020 23:27:35)</span>
                                        </h5>
                                        <span>Привет, как там с деньгами</span>
                                    </div>

                                    <div className='mb-1'>
                                        <h5 className='d-inline'><span className="badge badge-light mr-2 mb-2">Дмитрий (07.10.2020 23:28:15)</span>
                                        </h5>
                                        <span>Ты кому звонишь?</span>
                                    </div>

                                </div>
                            </div>


                            <div className="form-group">
                                {/*<label htmlFor="exampleFormControlTextarea1">Сообщение</label>*/}
                                <textarea style={{resize: "none"}} className="form-control mb-3"
                                          placeholder='Сообщение' id="exampleFormControlTextarea1" rows="3"/>

                                <div className="float-right custom-control custom-toggle my-2">
                                    <input type="checkbox" id="customToggle1" name="customToggle1"
                                           className="custom-control-input"/>
                                    <label className="custom-control-label" htmlFor="customToggle1">Получать ответы на
                                        почту</label>
                                </div>

                                <button type="button" className="btn btn-outline-warning btn-pill">Отправить</button>

                            </div>
                        </div>
                    </div>
                </div>
                <div className=' col-md-3'>
                    <div className='card-body'>
                        <h3><span className="badge badge-secondary">Продавец</span></h3>
                        <p>Информация о продавце</p>
                    </div>
                    <div className='card-body'>
                        <h3><span className="badge badge-secondary">Покупатель</span></h3>
                        <p>Информация о покупателе</p>
                    </div>
                </div>
            </div>
        </div>
    )
};

let mapStateToProps = (state) => {
    return {
        someData: state.someData
        //те данные из глобального стейта, которые мы хотим передать в компоненту
    }
}

export default connect(mapStateToProps, {login})(DealPage);