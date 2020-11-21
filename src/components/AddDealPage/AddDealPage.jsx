import React from "react";

const AddDealPage = () => {

    let [step, setStep] = React.useState(1);

    return (
        <div className='container'>
            <div className='card mt-4'>
                <div className='card-header font-weight-bold'>Создание новой сделки</div>
                <div className='card-body'>

                    <div style={{height: '13px'}} className="progress mb-5">
                        <div className="progress-bar" role="progressbar" style={{width: "33.33%", height: "13px"}}
                             aria-valuenow="33.33" aria-valuemin="0" aria-valuemax="100"/>
                        <div hidden className="progress-bar bg-warning" role="progressbar"
                             style={{width: "33.33%", height: "13px"}}
                             aria-valuenow="66.66" aria-valuemin="0" aria-valuemax="100"/>
                        <div hidden className="progress-bar bg-danger" role="progressbar"
                             style={{width: "33.33%", height: "13px"}}
                             aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"/>
                    </div>

                    {step === 1 && <div className='row'>
                        <div className='col-md-6 mb-4 mb-md-0'>
                            <div className='card shadow-none'>
                                {/*<div className='card-header font-weight-bold'>*/}
                                {/*    Информация о сделке*/}
                                {/*</div>*/}
                                <div className='card-body pt-0'>

                                    <div className='d-flex bg-light p-3 justify-content-between align-items-center mb-4'>

                                        <div className='font-weight-bold'>Выберите тип сделки:</div>

                                        <div className="custom-controls-stacked">
                                            <div className="d-inline-block custom-control custom-radio mr-3">
                                                <input type="radio" id="radioDealType1" name="deal-type"
                                                       className="custom-control-input" checked/>
                                                <label className="custom-control-label"
                                                       htmlFor="radioDealType1">Товар</label>
                                            </div>

                                            <div className="d-inline-block custom-control custom-radio">
                                                <input type="radio" id="radioDealType2" name="deal-type"
                                                       className="custom-control-input"/>
                                                <label className="custom-control-label"
                                                       htmlFor="radioDealType2">Услуга</label>
                                            </div>
                                        </div>

                                    </div>

                                    <div className='d-flex bg-light p-3 justify-content-between align-items-center mb-4'>

                                        <div className='font-weight-bold'>Выберите роль в сделке:</div>

                                        <div className="custom-controls-stacked">
                                            <div className="d-inline-block custom-control custom-radio mr-3">
                                                <input ref={seller} type="radio" id="radioUserRole1" name="user-role"
                                                       className="custom-control-input" checked/>
                                                <label className="custom-control-label"
                                                       htmlFor="radioUserRole1">Продавец</label>
                                            </div>

                                            <div className="d-inline-block custom-control custom-radio">
                                                <input type="radio" id="radioUserRole2" name="user-role"
                                                       className="custom-control-input"/>
                                                <label className="custom-control-label"
                                                       htmlFor="radioUserRole2">Покупатель</label>
                                            </div>
                                        </div>

                                    </div>

                                    <p className='font-weight-bold mb-3'>Пригласите в сделку продавца/покупателя.
                                        Введите его почту:</p>

                                    <input type="text" className="form-control" name="inviteEmail"
                                           placeholder="E-mail продавца"
                                           aria-label="E-mail"/>

                                    <div className='btn btn-info w-100 mt-4' onClick={() => setStep(2)}>Далее</div>


                                </div>
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
                                <div className=''>
                                    <p className='mb-2'>Вы можете прикрепить к сделки техническое задание и/или другие
                                        файлы: </p>
                                    <div className="custom-file mb-3">
                                        <input type="file" className="custom-file-input" id="customFile"/>
                                        <label className="custom-file-label" htmlFor="customFile">Нажмите, чтобы выбрать
                                            файлы</label>
                                    </div>
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