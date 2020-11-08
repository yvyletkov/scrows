import React from "react";
import s from "./DealPage.module.css";
import './DealPage.module.css'
import {connect} from "react-redux";
import {login} from "../../redux/reducer";
import vvpImg from "../../img/vvp.jpg";
import damImg from "../../img/dam.jpg";

const StatusItem = ({item, status, descriptions, last, first}) => {

    let [showDescr, setShowDescr] = React.useState(false);

    return <div key={item} onMouseEnter={() => setShowDescr(true)} onMouseLeave={() => setShowDescr(false)}
                className={s.statusItemWrapper}>
        <div
            className={item < status ? `${s.statusItem} ${s.archieved} ${s.past}` : item === status ? `${s.statusItem} ${s.archieved}` : `${s.statusItem}`}>
            {item < status ? <i className="fas fa-check fa-2x"></i> : item === status ?
                <i className="fas fa-spinner fa-3x"></i> : null}
        </div>
        <div
            className={`${s.statusDescription}
                ${last ? s.last : ""}
                ${first ? s.first : ""}
                ${(showDescr && s.active) || (((item <= status) && window.matchMedia("(min-width: 1200px)").matches) && s.active)}
                ${item === status ? s.current : ""}`}
        >
            {descriptions[item]}
        </div>
    </div>
}

const StatusTimeline = ({status = 5, withDelivery: delivery = true, problem = true}) => {

    let [descrShown, setDescrShown] = React.useState(false);

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

    let amount = !delivery && !problem ? 6 : (delivery && !problem) || (!delivery && problem) ? 7 : 8;
    let array = [];
    for (let i = 1; i <= amount; i++) {
        array.push(i);
    }

    let statusItems = array.map((item, index) => {
        return <StatusItem item={item} first={index === 0} last={index === array.length - 1} descriptions={descriptions}
                           status={status}/>
    });

    return (
        <div onMouseEnter={() => setDescrShown(true)} onMouseLeave={() => setDescrShown(false)}
             className={descrShown ? s.statusTimeline + ' ' + s.opened : s.statusTimeline}>
            {statusItems}
        </div>
    )
}

const DealPage = ({statusName = "Передано в доставку, ожидание приемки"}) => {
    return (
        <div style={{marginTop: "4rem"}} className='container mb-4'>

            <div className='card'>
                <div className="card-header">
                    <div className={'d-md-flex justify-content-between'}>
                        <h3 className='mb-0'><span className="badge badge-secondary">Cделка №2135</span></h3>
                        <h3 className='mb-0'><span className="badge badge-secondary">Сумма: 15 000 ₽</span></h3>
                    </div>
                </div>
                <div className="card-body">
                    <div>{statusName}</div>
                </div>
            </div>

            <StatusTimeline/>

            <div className='row mt-4'>
                <div className='col-md-8 px-0 px-md-3'>

                    <div className={'card ' + s.main}>

                        <div className='row m-0'>
                            <div className={'col-lg-6 mb-4 mb-lg-0 pr-lg-4 pl-lg-0 px-0'}>
                                <div className='card shadow-none'>
                                    <div className="card-header">
                                        <div className={'font-weight-bold'}>Предмет сделки</div>
                                    </div>
                                    <div className='card-body'>
                                        <p>Моющий пылесос с аква фильтром</p>
                                    </div>
                                </div>
                            </div>
                            <div className={'col-lg-6 px-0'}>
                                <div className='card shadow-none'>
                                    <div className="card-header">
                                        <div className={'font-weight-bold'}>Файлы сделки</div>
                                    </div>
                                    <div className='card-body'>
                                        <p>К этой сделке файлы не прикреплены</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='card mb-4 mt-4 shadow-none'>
                            <div className='card-header'>
                                <div className={'font-weight-bold'}>История сделки</div>
                            </div>

                            <div className='card-body'>
                                <div className='d-flex  mb-1'>
                                    <div style={{color: "#fff", height: "fit-content"}}
                                         className="badge badge-warning mr-2 align-bottom">07.10.2020 23:24:31
                                    </div>
                                    <div>создана сделка: Вадим Закиров
                                    </div>
                                </div>

                                <div className='d-flex  mb-1'>
                                    <div style={{color: "#fff", height: "fit-content"}}
                                         className="badge badge-warning mr-2 align-bottom">07.10.2020 23:24:31
                                    </div>
                                    <div>отправлено приглашение Покупатель на email:vadimzakirov1992@gmail.com
                                    </div>
                                </div>

                                <div className='d-flex  mb-1'>
                                    <div style={{color: "#fff", height: "fit-content"}}
                                         className="badge badge-warning mr-2 align-bottom">07.10.2020 23:24:31
                                    </div>
                                    <div>сделка перешла в статус ПРИГЛАШЕНИЕ ВТОРОГО УЧАСТНИКА
                                    </div>
                                </div>

                                <div className='d-flex  mb-1'>
                                    <div style={{color: "#fff", height: "fit-content"}}
                                         className="badge badge-warning mr-2 align-bottom">07.10.2020 23:24:31
                                    </div>
                                    <div>ожидание принятия условий второго участника
                                    </div>
                                </div>

                                <div className='d-flex mb-1'>
                                    <div style={{color: "#fff", height: "fit-content"}}
                                         className="badge badge-warning mr-2 align-bottom">07.10.2020 23:24:31
                                    </div>
                                    <div>выбран тип оплаты: физ.лицо. Проведение электронного платежа
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div className={'card shadow-none'}>
                            <div className="card-header">
                                <div className={'font-weight-bold mb-4'}>Чат</div>
                                <div>

                                    {/*<p className='text-muted mb-2 mt-2'>Пока сообщений нет</p>*/}

                                    <div className={'mb-3 ' + s.message + ' ' + s.dark}>
                                        <div className={s.messageText}>че с деньгами?</div>
                                        <div>Владимир (07.10.2020 23:27:35)</div>
                                    </div>

                                    <div className={'mb-3 ' + s.message}>
                                        <div className={s.messageText}>Ты кому звонишь?</div>
                                        <div>Дмитрий (07.10.2020 23:27:55)</div>
                                    </div>

                                    <div className={'mb-3 ' + s.message + ' ' + s.dark}>
                                        <div className={s.messageText}>Тебе звоню</div>
                                        <div>Владимир (07.10.2020 23:28:15)</div>
                                    </div>


                                    <div className={'mb-3 ' + s.message}>
                                        <div className={s.messageText}>Кому?</div>
                                        <div>Дмитрий (07.10.2020 23:28:23)</div>
                                    </div>

                                    <div className={'mb-3 ' + s.message + ' ' + s.dark}>
                                        <div className={s.messageText}>А вот тебе вот</div>
                                        <div>Владимир (07.10.2020 23:28:55)</div>
                                    </div>


                                    <div className="form-group mb-0">
                                        {/*<label htmlFor="exampleFormControlTextarea1">Сообщение</label>*/}
                                        <textarea style={{resize: "none"}} className="form-control mb-3 mt-4"
                                                  placeholder='Сообщение' id="exampleFormControlTextarea1" rows="3"/>

                                        <div className="float-sm-right mb-3 custom-control custom-toggle my-2">
                                            <input type="checkbox" id="customToggle" name="customToggle"
                                                   className="custom-control-input"/>
                                            <label className="custom-control-label" htmlFor="customToggle">Получать
                                                ответы на
                                                почту</label>
                                        </div>

                                        <button type="button" className="btn btn-outline-warning btn-pill">Отправить
                                        </button>

                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                {/* SIDEBAR*/}
                <div className='col-md-4 pl-md-0 px-0 px-md-3'>
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
                                    <td style={{width: '32%'}}>Товар</td>

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