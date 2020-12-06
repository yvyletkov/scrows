import React from "react";
import {Field, formValueSelector, reduxForm} from "redux-form";
import {connect} from "react-redux";
import {validate} from "../../utils/validators/validators";
import cx from "classnames"

const AddDealReduxForm = ({step, setStep, handleSubmit, dealType, userRole, price, whoPays, ...props}) => {
    return (
        <form onSubmit={handleSubmit}>
            {step === 1 &&
            <Step1 setStep={setStep} dealType={dealType}
                   userRole={userRole}/>}
            {step === 2 &&
            <Step2 setStep={setStep} dealType={dealType} userRole={userRole} whoPays={whoPays} price={price}/>}
            {step === 3 && <Step3 dealType={dealType} userRole={userRole}/>}
        </form>
    )
};

let mapStateToProps = (state) => {
    return {
        dealType: formValueSelector('addDeal')(state, 'dealType'),
        userRole: formValueSelector('addDeal')(state, 'userRole'),
        price: formValueSelector('addDeal')(state, 'price'),
        whoPays: formValueSelector('addDeal')(state, 'whoPays'),
    }
};

export default connect(mapStateToProps, {})(reduxForm({form: 'addDeal', validate})(AddDealReduxForm));

const renderField = ({input, id, value, placeholder, className, name, type, meta: {touched, error, warning}}) => {
    let classNames = cx(className, {'is-invalid': touched && error, 'is-valid': touched && !error})

    return <input {...input} className={classNames} value={value} name={name} id={id} placeholder={placeholder} type={type}/>
    // {
    //     touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))
    // }

}

const Step1 = ({setStep, userRole, dealType}) => {

    const whoToInvite = dealType === "1" && userRole === '1' ? 'покупателя' : dealType === "1" && userRole === '2' ? "продавца"
        : dealType === "2" && userRole === '1' ? 'заказчика' : dealType === "2" && userRole === '2' ? "исполнителя" : "FEWGVGFVFWVFWVVEF";

    return (
        <div className='row'>
            <div className='col-md-6 mb-4 mb-md-0'>
                <div className='pt-0'>

                    <div style={{background: 'rgb(241, 249, 254)', borderColor: 'rgb(222, 226, 230)'}}
                         className='d-flex border rounded p-3 justify-content-between align-items-center mb-4'>

                        <div className='font-weight-bold'>Выберите тип сделки:</div>

                        <div className="custom-controls-stacked">
                            <div className="d-inline-block custom-control custom-radio mr-3">
                                <Field component='input' type="radio" id="radioDealType1" name="dealType"
                                       value={'1'}
                                       className="custom-control-input"/>
                                <label className="custom-control-label"
                                       htmlFor="radioDealType1">Товар</label>
                            </div>

                            <div className="d-inline-block custom-control custom-radio">
                                <Field component='input' type="radio" id="radioDealType2" name="dealType"
                                       className="custom-control-input" value={'2'}/>
                                <label className="custom-control-label"
                                       htmlFor="radioDealType2">Услуга</label>
                            </div>
                        </div>

                    </div>

                    <div style={{background: 'rgb(241, 249, 254)', borderColor: 'rgb(222, 226, 230)'}}
                         className='d-flex border rounded p-3 justify-content-between align-items-center mb-4'>

                        <div className='font-weight-bold'>Выберите роль в сделке:</div>

                        <div className="custom-controls-stacked">

                            <div className="d-inline-block custom-control custom-radio mr-3">
                                <Field component='input' type="radio" id="radioUserRole1" name="userRole"
                                       className="custom-control-input" value={'1'}/>
                                <label className="custom-control-label"
                                       htmlFor="radioUserRole1">{dealType === '1' ? 'Продавец' : 'Исполнитель'}</label>
                            </div>

                            <div className="d-inline-block custom-control custom-radio">
                                <Field component='input' type="radio" id="radioUserRole2" name="userRole"
                                       className="custom-control-input" value={'2'}/>
                                <label className="custom-control-label"
                                       htmlFor="radioUserRole2">{dealType === '1' ? 'Покупатель' : 'Заказчик'}</label>
                            </div>
                        </div>

                    </div>

                    <p className='font-weight-bold mb-3'>Пригласите в сделку <span
                        className='text-success'>{whoToInvite}</span>.
                        Введите его почту:</p>
                    <Field component={renderField} type="email" className="form-control mb-4" name="participantEmail"
                           placeholder={"E-mail " + whoToInvite}
                           aria-label="E-mail"/>

                    <p className='mb-3'>Вы можете прикрепить к сделки техническое задание и/или другие
                        файлы: </p>
                    <div className="custom-file mb-3">
                        <Field component={'input'} type="file" className="custom-file-input" id="customFile"/>
                        <label className="custom-file-label" htmlFor="customFile">Нажмите, чтобы выбрать
                            файлы</label>
                    </div>

                    <div className='btn btn-info w-100 mt-3' onClick={() => setStep(2)}>Далее</div>


                </div>
            </div>
            <div className='col-md-6'>
                <div className='card shadow-none'>
                    <div className='card-body rounded mb-3 border'
                         style={{background: '#f6f6f6', borderColor: 'rgb(222, 226, 230)'}}>
                        <p className='font-weight-bold mb-3'>Название сделки:</p>
                        <Field component={renderField} type="text" name='subject' className="form-control mb-3"
                               placeholder="Введите название сделки"/>

                        <p className='font-weight-bold mb-3'>Описание сделки:</p>
                        <Field component={'textarea'} type="text" name='description' className="form-control"
                               placeholder="Введите описание сделки"/>
                    </div>

                </div>
            </div>
        </div>
    )
};

const Step2 = ({setStep, userRole, dealType, whoPays, price}) => {
    price = +price;
    let commission = price ? (price / 100 * 5.5) : 0;
    let amount = price ? Math.round(userRole === whoPays
        ? price + commission
        : whoPays === "3" ? (price + commission / 2)
            : price) : 0;
    let amountString = amount.toString().replace(/(\d{1,3})(?=(?:\d{3})+$)/g, '$1 ');

    return (
        <div className='row'>
            <div className='col-md-6 mb-4 mb-md-0'>
                <div className='pt-0'>

                    <p className='font-weight-bold mb-3'>Стоимость сделки (в рублях)</p>

                    <Field component={'input'} type="number" className="form-control mb-2" name="price"
                           placeholder={"Введите стоимость сделки"}
                           aria-label="price"/>

                    <p className='text-success mt-2 mb-5'>Комиссия площадки – {commission}₽</p>


                    <div className='font-weight-bold mb-3'>Кто будет оплачивать комиссию:</div>

                    <div className="custom-controls-stacked">
                        <div className="custom-control custom-radio mr-3">
                            <Field component='input' type="radio" id="radioWhoPays1" name="whoPays"
                                   value={'1'}
                                   className="custom-control-input"/>
                            <label className="custom-control-label"
                                   htmlFor="radioWhoPays1">
                                {dealType === '1' ? 'Продавец' : 'Исполнитель'}
                            </label>
                        </div>

                        <div className="custom-control custom-radio">
                            <Field component='input' type="radio" id="radioWhoPays2" name="whoPays"
                                   className="custom-control-input" value={'2'}/>
                            <label className="custom-control-label"
                                   htmlFor="radioWhoPays2">
                                {dealType === '1' ? 'Покупатель' : 'Заказчик'}
                            </label>
                        </div>

                        <div className="custom-control custom-radio">
                            <Field component='input' type="radio" id="radioWhoPays3" name="whoPays"
                                   className="custom-control-input" value={'3'}/>
                            <label className="custom-control-label"
                                   htmlFor="radioWhoPays3">
                                50% –{dealType === '1' ? ' Продавец' : ' Исполнитель'}, 50% –
                                {dealType === '1' ? ' Покупатель' : ' Заказчик'}
                            </label>
                        </div>
                    </div>


                    <div className='btn btn-info w-100 mt-4' onClick={() => setStep(3)}>Далее</div>


                </div>
            </div>
            <div className='col-md-6'>
                <div className='h-100 w-75 d-flex align-items-center mx-auto'>
                    <div>
                        <h4 className="mb-1">Итого к оплате:</h4>
                        <b><p style={{fontSize: "27px"}} className='text-success mb-2'>{amountString} ₽</p></b>
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