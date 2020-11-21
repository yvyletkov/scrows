import React from "react";

const AddDealPage = () => {

    let [step, setStep] = React.useState(2);

    // step 1
    let [dealType, setDealType] = React.useState('goods');
    let [userRole, setUserRole] = React.useState(1); // 1 - продавец/исполнитель, 2 - покупатель/заказчик

    const whoToInvite = dealType === "goods" && userRole === 1 ? 'покупателя' : dealType === "goods" && userRole === 2 ? "продавца"
        : dealType === "services" && userRole === 1 ? 'заказчика' : dealType === "services" && userRole === 2 ? "исполнителя" : "FEWGVGFVFWVFWVVEF";
    // END step 1

    // step 2
    let [priceValue, setPriceValue] = React.useState(null);
    let [whoPays, setWhoPays] = React.useState(null);
    let commission = (priceValue / 100 * 5.5);
    let amount = Math.round(userRole === whoPays
        ? priceValue + commission
        : whoPays === 3 ? (priceValue + commission / 2)
        : priceValue);
    let amountString = amount.toString().replace(/(\d{1,3})(?=(?:\d{3})+$)/g, '$1 ');
    // END step 2


    return (
        <div className='container'>
            <div className='card mt-4'>
                <div className='card-header font-weight-bold'>Создание новой безопасной сделки</div>
                <div className='card-body'>

                    <div style={{height: '13px'}} className="progress mb-5">
                        <div onClick={() => setStep(1)} className="progress-bar bg-info" role="progressbar"
                             style={{width: "33.33%", height: "13px"}}
                             aria-valuenow="33.33" aria-valuemin="0" aria-valuemax="100"/>
                        <div onClick={() => setStep(2)} hidden={step < 2} className="progress-bar bg-warning"
                             role="progressbar"
                             style={{width: "33.33%", height: "13px"}}
                             aria-valuenow="66.66" aria-valuemin="0" aria-valuemax="100"/>
                        <div onClick={() => setStep(3)} hidden={step < 3} className="progress-bar bg-danger"
                             role="progressbar"
                             style={{width: "33.33%", height: "13px"}}
                             aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"/>
                    </div>

                    {step === 1 && <div className='row'>
                        <div className='col-md-6 mb-4 mb-md-0'>
                            <div className='pt-0'>

                                <div className='d-flex bg-light p-3 justify-content-between align-items-center mb-4'>

                                    <div className='font-weight-bold'>Выберите тип сделки:</div>

                                    <div className="custom-controls-stacked">
                                        <div className="d-inline-block custom-control custom-radio mr-3">
                                            <input type="radio" id="radioDealType1" name="deal-type"
                                                   className="custom-control-input" checked={dealType === 'goods'}/>
                                            <label className="custom-control-label"
                                                   htmlFor="radioDealType1"
                                                   onClick={() => setDealType('goods')}>Товар</label>
                                        </div>

                                        <div className="d-inline-block custom-control custom-radio">
                                            <input type="radio" id="radioDealType2" name="deal-type"
                                                   className="custom-control-input" checked={dealType === 'services'}/>
                                            <label className="custom-control-label"
                                                   htmlFor="radioDealType2"
                                                   onClick={() => setDealType('services')}>Услуга</label>
                                        </div>
                                    </div>

                                </div>

                                <div className='d-flex bg-light p-3 justify-content-between align-items-center mb-4'>

                                    <div className='font-weight-bold'>Выберите роль в сделке:</div>

                                    <div className="custom-controls-stacked">
                                        <div className="d-inline-block custom-control custom-radio mr-3">
                                            <input type="radio" id="radioUserRole1" name="user-role"
                                                   className="custom-control-input" checked={userRole === 1}/>
                                            <label className="custom-control-label"
                                                   htmlFor="radioUserRole1"
                                                   onClick={() => setUserRole(1)}>
                                                {dealType === 'goods' ? 'Продавец' : 'Исполнитель'}
                                            </label>
                                        </div>

                                        <div className="d-inline-block custom-control custom-radio">
                                            <input type="radio" id="radioUserRole2" name="user-role"
                                                   className="custom-control-input" checked={userRole === 2}/>
                                            <label className="custom-control-label"
                                                   htmlFor="radioUserRole2"
                                                   onClick={() => setUserRole(2)}>
                                                {dealType === 'goods' ? 'Покупатель' : 'Заказчик'}
                                            </label>
                                        </div>
                                    </div>

                                </div>

                                <p className='font-weight-bold mb-3'>Пригласите в сделку <span
                                    className='text-danger'>{whoToInvite}</span>.
                                    Введите его почту:</p>

                                <input type="text" className="form-control" name="inviteEmail"
                                       placeholder={"E-mail " + whoToInvite}
                                       aria-label="E-mail"/>

                                <div className='btn btn-info w-100 mt-4' onClick={() => setStep(2)}>Далее</div>


                            </div>
                        </div>
                        <div className='col-md-6'>
                            <div className='card shadow-none'>
                                <div className='card-body bg-light mb-3'>
                                    <p className='font-weight-bold mb-3'>Название сделки:</p>
                                    <input type="text" name='dealName' className="form-control mb-3"
                                           placeholder="Введите название сделки"/>

                                    <p className='font-weight-bold mb-3'>Описание сделки:</p>
                                    <textarea className="form-control" placeholder="Введите описание сделки"/>
                                </div>
                                <p className='mb-2'>Вы можете прикрепить к сделки техническое задание и/или другие
                                    файлы: </p>
                                <div className="custom-file mb-3">
                                    <input type="file" className="custom-file-input" id="customFile"/>
                                    <label className="custom-file-label" htmlFor="customFile">Нажмите, чтобы выбрать
                                        файлы</label>
                                </div>
                            </div>
                        </div>
                    </div>}
                    {step === 2 && <div className='row'>
                        <div className='col-md-6 mb-4 mb-md-0'>
                            <div className='pt-0'>

                                <p className='font-weight-bold mb-3'>Стоимость сделки (в рублях)</p>

                                <input value={priceValue} onChange={(e) => setPriceValue(+e.target.value)} type="number"
                                       className="form-control" name="inviteEmail"
                                       placeholder={"Введите стоимость сделки"}
                                       aria-label="Price"/>

                                <p className='text-success mt-2 mb-5'>Комиссия площадки – {commission}₽</p>

                                <div className=''>

                                    <div className='font-weight-bold mb-3'>Кто будет оплачивать комиссию:</div>

                                    <div className="custom-controls-stacked">
                                        <div className="d-block custom-control custom-radio mr-3">
                                            <input type="radio" id="radioWhoPays1" name="who-pays"
                                                   className="custom-control-input" checked={whoPays === 1}/>
                                            <label className="custom-control-label"
                                                   htmlFor="radioWhoPays1"
                                                   onClick={() => setWhoPays(1)}>
                                                {dealType === 'goods' ? 'Продавец' : 'Исполнитель'}
                                            </label>
                                            {/*// 1 - продавец/исполнитель, 2 - покупатель/заказчик*/}
                                        </div>

                                        <div className="d-block custom-control custom-radio">
                                            <input type="radio" id="radioWhoPays2" name="who-pays"
                                                   className="custom-control-input" checked={whoPays === 2}/>
                                            <label className="custom-control-label"
                                                   htmlFor="radioWhoPays2"
                                                   onClick={() => setWhoPays(2)}>
                                                {dealType === 'goods' ? 'Покупатель' : 'Заказчик'}
                                            </label>
                                        </div>

                                        <div className="d-block custom-control custom-radio">
                                            <input type="radio" id="radioWhoPays3" name="who-pays"
                                                   className="custom-control-input" checked={whoPays === 3}/>
                                            <label className="custom-control-label"
                                                   htmlFor="radioWhoPays3"
                                                   onClick={() => setWhoPays(3)}>50% –{dealType === 'goods' ? ' Продавец' : ' Исполнитель'}, 50% –
                                                {dealType === 'goods' ? ' Покупатель' : ' Заказчик'}</label>
                                        </div>
                                    </div>

                                </div>


                                <div className='btn btn-info w-100 mt-4' onClick={() => setStep(3)}>Далее</div>


                            </div>
                        </div>
                        <div className='col-md-6'>
                            <div className='h-100 w-75 d-flex align-items-center mx-auto'>
                                <div>
                                    <h4 className="mb-1">Итого к оплате:</h4>
                                    <h2><p className='text-success'>{amountString} ₽</p></h2>
                                    <p>После принятие условий сделки вторым участником, Вам будет выставлен счет на указанную сумму</p>
                                </div>

                            </div>
                        </div>
                    </div>}

                    {step === 3 && <div className='row'>
                        <div className='col-md-6 mb-4 mb-md-0'>
                            <div className='pt-0'>

                                <p className='font-weight-bold mb-3'>Информация о доставке/приемке услуг</p>

                                <input value={priceValue} onChange={(e) => setPriceValue(+e.target.value)} type="number"
                                       className="form-control" name="inviteEmail"
                                       placeholder={"Введите стоимость сделки"}
                                       aria-label="Price"/>

                                <p className='text-success mt-2 mb-5'>Комиссия площадки – {commission}₽</p>

                                <div className=''>

                                    <div className='font-weight-bold mb-3'>Кто будет оплачивать комиссию:</div>

                                    <div className="custom-controls-stacked">
                                        <div className="d-block custom-control custom-radio mr-3">
                                            <input type="radio" id="radioWhoPays1" name="who-pays"
                                                   className="custom-control-input" checked={whoPays === 1}/>
                                            <label className="custom-control-label"
                                                   htmlFor="radioWhoPays1"
                                                   onClick={() => setWhoPays(1)}>
                                                {dealType === 'goods' ? 'Продавец' : 'Исполнитель'}
                                            </label>
                                            {/*// 1 - продавец/исполнитель, 2 - покупатель/заказчик*/}
                                        </div>

                                        <div className="d-block custom-control custom-radio">
                                            <input type="radio" id="radioWhoPays2" name="who-pays"
                                                   className="custom-control-input" checked={whoPays === 2}/>
                                            <label className="custom-control-label"
                                                   htmlFor="radioWhoPays2"
                                                   onClick={() => setWhoPays(2)}>
                                                {dealType === 'goods' ? 'Покупатель' : 'Заказчик'}
                                            </label>
                                        </div>

                                        <div className="d-block custom-control custom-radio">
                                            <input type="radio" id="radioWhoPays3" name="who-pays"
                                                   className="custom-control-input" checked={whoPays === 3}/>
                                            <label className="custom-control-label"
                                                   htmlFor="radioWhoPays3"
                                                   onClick={() => setWhoPays(3)}>50% –{dealType === 'goods' ? ' Продавец' : ' Исполнитель'}, 50% –
                                                {dealType === 'goods' ? ' Покупатель' : ' Заказчик'}</label>
                                        </div>
                                    </div>

                                </div>


                                <div className='btn btn-info w-100 mt-4' onClick={() => setStep(3)}>Далее</div>


                            </div>
                        </div>
                        <div className='col-md-6'>
                            <div className='h-100 w-75 d-flex align-items-center mx-auto'>
                                <div>
                                    <h4 className="mb-1">Итого к оплате:</h4>
                                    <h2><p className='text-success'>{amountString} ₽</p></h2>
                                    <p>После принятие условий сделки вторым участником, Вам будет выставлен счет на указанную сумму</p>
                                </div>

                            </div>
                        </div>
                    </div>}


                </div>
            </div>
        </div>
    )
}

export default AddDealPage;