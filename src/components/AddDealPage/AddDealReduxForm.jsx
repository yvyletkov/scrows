import React from "react";
import {reduxForm} from "redux-form";


const AddDealReduxForm = ({step, setStep, handleSubmit}) => {
    let [dealType, setDealType] = React.useState('goods');
    let [userRole, setUserRole] = React.useState(1); // 1 - продавец/исполнитель, 2 - покупатель/заказчик
    let [priceValue, setPriceValue] = React.useState(null);
    let [whoPays, setWhoPays] = React.useState(null);

    return (
        <form onSubmit={handleSubmit}>
            {step === 1 && <Step1 setStep={setStep} setDealType={setDealType} dealType={dealType} setUserRole={setUserRole} userRole={userRole}/> }
            {step === 2 && <Step2 setStep={setStep} dealType={dealType} userRole={userRole} whoPays={whoPays} priceValue={priceValue} setWhoPays={setWhoPays} setPriceValue={setPriceValue}/>}
            {step === 3 && <Step3 dealType={dealType} userRole={userRole}/>}
        </form>
    )
};

export default reduxForm({form: 'addDeal'})(AddDealReduxForm);

const Step1 = ({setStep, setUserRole, setDealType, userRole, dealType}) => {
    const whoToInvite = dealType === "goods" && userRole === 1 ? 'покупателя' : dealType === "goods" && userRole === 2 ? "продавца"
        : dealType === "services" && userRole === 1 ? 'заказчика' : dealType === "services" && userRole === 2 ? "исполнителя" : "FEWGVGFVFWVFWVVEF";

    return (
        <div className='row'>
            <div className='col-md-6 mb-4 mb-md-0'>
                <div className='pt-0'>

                    <div className='d-flex border border-success rounded p-3 justify-content-between align-items-center mb-4'>

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

                    <div className='d-flex border border-success rounded p-3 justify-content-between align-items-center mb-4'>

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
                        className='text-success'>{whoToInvite}</span>.
                        Введите его почту:</p>
                    <input type="text" className="form-control mb-4" name="inviteEmail"
                           placeholder={"E-mail " + whoToInvite}
                           aria-label="E-mail"/>

                    <p className='mb-3'>Вы можете прикрепить к сделки техническое задание и/или другие
                        файлы: </p>
                    <div className="custom-file mb-3">
                        <input type="file" className="custom-file-input" id="customFile"/>
                        <label className="custom-file-label" htmlFor="customFile">Нажмите, чтобы выбрать
                            файлы</label>
                    </div>

                    <div className='btn btn-info w-100 mt-3' onClick={() => setStep(2)}>Далее</div>


                </div>
            </div>
            <div className='col-md-6'>
                <div className='card shadow-none'>
                    <div className='card-body rounded mb-3 border border-secondary'>
                        <p className='font-weight-bold mb-3'>Название сделки:</p>
                        <input type="text" name='dealName' className="form-control mb-3"
                               placeholder="Введите название сделки"/>

                        <p className='font-weight-bold mb-3'>Описание сделки:</p>
                        <textarea className="form-control" placeholder="Введите описание сделки"/>
                    </div>

                </div>
            </div>
        </div>
    )
};

const Step2 = ({setStep, userRole, dealType, whoPays, setWhoPays, priceValue, setPriceValue}) => {
    let commission = (priceValue / 100 * 5.5);
    let amount = Math.round(userRole === whoPays
        ? priceValue + commission
        : whoPays === 3 ? (priceValue + commission / 2)
            : priceValue);
    let amountString = amount.toString().replace(/(\d{1,3})(?=(?:\d{3})+$)/g, '$1 ');

    return (
        <div className='row'>
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
                                       onClick={() => setWhoPays(3)}>50%
                                    –{dealType === 'goods' ? ' Продавец' : ' Исполнитель'}, 50% –
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
                        <p>После принятие условий сделки вторым участником, Вам будет выставлен счет на
                            указанную сумму</p>
                    </div>

                </div>
            </div>
        </div>
    )
};

const Step3 = ({dealType}) => {

    return (
        <div className='row'>
            <div className='col-md-7 mb-4 mb-md-0'>
                <div className='pt-0'>

                    <p className='font-weight-bold mb-3'>Информация о доставке/приемке услуг</p>

                    <p className='mb-2'>Опишите
                        условия {dealType === 'goods' ? 'доставки товара' : 'оказания услуги'} (если таковые
                        имеются)</p>

                    <textarea

                        className="form-control" name="description"
                        placeholder={"Напишите что-нибудь"}
                        aria-label="Description"/>


                    <button type='submit' className='btn btn-success w-100 mt-4 text-white'>Создать сделку</button>


                </div>
            </div>
            <div className='col-md-5'>

                <p className='mb-2'>Срок доставки:</p>
                <input type="date" placeholder={'Нажмите, чтобы выбрать дату'} className="form-control mb-4"/>

                <p className='mb-2'>Стоимость доставки в рублях (не обязательно):</p>
                <input type="number" placeholder={'Введите стоимость доставки'} className="form-control mb-4"
                       id="datepicker-example"/>

                <p className='mb-2'>Период проверки после доставки (дней):</p>
                <input type="number" placeholder={'Дней на проверку'} className="form-control mb-4"
                       id="datepicker-example"/>

            </div>
        </div>
    )
}