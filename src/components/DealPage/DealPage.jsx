import React from "react";
import s from "./DealPage.module.css";
import './DealPage.module.css'
import {connect} from "react-redux";
import {login} from "../../redux/reducer";
import vvpImg from "../../img/vvp.jpg";
import damImg from "../../img/dam.jpg";

const StatusItem = ({item, status, descriptions}) => {

    let [showDescr, setShowDescr] = React.useState(false);

    return <div key={item} onMouseEnter={() => setShowDescr(true)} onMouseLeave={() => setShowDescr(false)}
                className={s.statusItemWrapper}>
        <div
            className={item < status ? `${s.statusItem} ${s.archieved} ${s.past}` : item === status ? `${s.statusItem} ${s.archieved}` : `${s.statusItem}`}>
            {item < status ? <i className="fas fa-check fa-2x"></i> : item === status ?
                <i className="fas fa-spinner fa-3x"></i> : null}
        </div>
        <div className={`${s.statusDescription} ${showDescr ? s.active : null}`}>
            {descriptions[item]}
        </div>
    </div>
}

const StatusTimeline = ({status = 4, withDelivery: delivery = true, problem = true}) => {

    const descriptions = {
        1: 'Сделка создана',
        2: 'Приглашение второго участника',
        3: 'Условия приняты, ожидается оплата',
        4: 'Сделка выполняется',
        5: 'Передано в доставку, ожидание приемки',
        6: 'Приемка работ заказчиком',
        7: 'Работы не приняты, передача в арбитраж',
        8: 'Работы приняты, сделка закрыта',
    }

    let array = [];
    let amount = !delivery && !problem ? 6 : (delivery && !problem) || (!delivery && problem) ? 7 : 8;
    for (let i = 1; i <= amount; i++) {
        array.push(i);
    }

    let statusItems = array.map((item) => {
        return <StatusItem item={item} descriptions={descriptions} status={status}/>
    });

    return (
        <div className={s.statusTimelineWrapper}>
            <div className={'d-flex justify-content-between'}>
                <h4 style={{textTransform: 'uppercase'}}>ТЕКУЩИЙ CТАТУС: {descriptions[status]}</h4>
                <h4 style={{textTransform: 'uppercase'}}>СУММА: 15 000 ₽</h4>
            </div>

            <div className={s.statusTimeline}>
                {statusItems}
            </div>
        </div>
    )
}

const DealPage = () => {
    return (
        <div className='container mt-4'>
            {/*<nav aria-label="breadcrumb">*/}
            {/*    <ol className="breadcrumb">*/}
            {/*        <li className="breadcrumb-item"><a href="#">Сервис для проведения безопасных сделок</a></li>*/}
            {/*        <li className="breadcrumb-item"><a href="#">Ваши сделки</a></li>*/}
            {/*        <li className="breadcrumb-item active" aria-current="page">Просмотр сделок</li>*/}
            {/*    </ol>*/}
            {/*</nav>*/}
            <div className='row mt-4'>
                <div className='col-md-9'>
                    <div className='card-body'>
                        <h3><span className="badge badge-light">Cделка №2135</span></h3>
                    </div>
                    <div className=''>
                        <div className='card-body'>

                            <StatusTimeline/>

                        </div>
                    </div>

                    <div className='row'>
                        <div style={{borderRight: "1px solid #c9c9c9"}} className='col-6'>
                            <div className='card-body'>
                                <h4 className='card-title'>Предмет сделки</h4>
                                <p>Моющий пылесос с аква фильтром</p>
                            </div>
                        </div>
                        <div className='col-6'>
                            <div className='card-body text-right'>
                                <h4 className='card-title'>Файлы сделки</h4>
                                <p>К этой сделке файлы не прикреплены</p>
                            </div>
                        </div>
                    </div>

                    <div className='mb-1'>
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
                                <span style={{color: "#fff"}} className="badge badge-warning mr-2 mb-2">07.10.2020 23:27:35</span> Выбран
                                тип
                                оплаты. Физ.лицо. Проведение электронного платежа<br/>
                                <span style={{color: "#fff"}} className="badge badge-warning mr-2 mb-2">07.10.2020 23:28:42</span> Оплата
                                поступила, исполнитель приступил к выполнению работ<br/>
                                <span style={{color: "#fff"}} className="badge badge-warning mr-2 mb-2">07.10.2020 23:28:40</span> Оплата
                                проведена успешно через сервис paykeeper.ru<br/>
                            </p>
                        </div>
                    </div>

                    <div className='mb-4'>
                        <div className='card-body'>
                            <h4 className='card-title mb-3'>Чат</h4>

                            <div className='row mb-3'>
                                <div className='col-12'>
                                    {/*<p className='text-muted mb-2 mt-2'>Пока сообщений нет</p>*/}

                                    <div className='mb-1'>
                                        <h5 className='d-inline'><span
                                            className="badge badge-outline-secondary mr-2 mb-2">Владимир (07.10.2020 23:27:35)</span>
                                        </h5>
                                        <span>Привет, как там с деньгами</span>
                                    </div>

                                    <div className='mb-1'>
                                        <h5 className='d-inline'><span className="badge badge-outline-dark mr-2 mb-2">Дмитрий (07.10.2020 23:28:15)</span>
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
                                    <input type="checkbox" id="customToggle" name="customToggle"
                                           className="custom-control-input"/>
                                    <h6><label className="custom-control-label" htmlFor="customToggle">Получать ответы на
                                        почту</label></h6>
                                </div>

                                <button type="button" className="btn btn-outline-warning btn-pill">Отправить</button>

                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-md-3'>
                    <div className={`card ${s.sidebarCard}`}>
                        <div className='card-body'>
                            <img className={s.cardImg} src={vvpImg} alt="Путин"/>
                            <h6 className={'text-md-center text-lg-left'}><span className="badge badge-secondary">Продавец</span></h6>
                            <div>Путин</div>
                            <div>Владимир</div>
                            <div><b>email:</b> vvp@scrows.ru</div>
                        </div>
                    </div>
                    <div className={`card ${s.sidebarCard}`}>
                        <div className='card-body'>
                            <img className={s.cardImg} src={damImg} alt="Медведев"/>
                            <h6 className={'text-md-center text-lg-left'}><span className="badge badge-secondary">Покупатель</span></h6>
                            <div>Медведев</div>
                            <div>Дмитрий</div>
                            <div><b>email:</b> dam@scrows.ru</div>
                        </div>
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