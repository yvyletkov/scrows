import React from "react";

const AddDealPage = () => {
    return (
        <div className='container'>
            <div className='card mt-4'>
                <div className='card-header font-weight-bold'>Создание новой сделки</div>
                <div className='card-body'>

                    <div className="progress mb-5">
                        <div className="progress-bar" role="progressbar" style={{width: "33.33%"}}
                             aria-valuenow="33.33" aria-valuemin="0" aria-valuemax="100"/>
                        <div hidden className="progress-bar bg-warning" role="progressbar" style={{width: "33.33%"}}
                             aria-valuenow="66.66" aria-valuemin="0" aria-valuemax="100"/>
                        <div hidden className="progress-bar bg-danger" role="progressbar" style={{width: "33.33%"}}
                             aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"/>
                    </div>

                    <div className='row'>
                        <div className='col-md-6 mb-4 mb-md-0'>
                            <div className='card shadow-none'>
                                <div className='card-header font-weight-bold'>
                                    Информация о сделке
                                </div>
                                <div className='card-body'>

                                    <div className='d-flex justify-content-between align-items-center mb-4'>

                                        <div className='font-weight-bold'>Выберите тип сделки:</div>

                                        <div className="custom-controls-stacked">
                                            <div className="d-inline-block custom-control custom-radio mr-3">
                                                <input type="radio" id="radioDealType1" name="deal-type"
                                                       className="custom-control-input" checked/>
                                                <label className="custom-control-label"
                                                       htmlFor="radioType1">Товар</label>
                                            </div>

                                            <div className="d-inline-block custom-control custom-radio">
                                                <input type="radio" id="radioDealType2" name="deal-type"
                                                       className="custom-control-input"/>
                                                <label className="custom-control-label"
                                                       htmlFor="radioType2">Услуга</label>
                                            </div>
                                        </div>

                                    </div>

                                    <div className='d-flex justify-content-between align-items-center mb-4'>

                                        <div className='font-weight-bold'>Выберите роль в сделке:</div>

                                        <div className="custom-controls-stacked">
                                            <div className="d-inline-block custom-control custom-radio mr-3">
                                                <input type="radio" id="radioRole1" name="user-role"
                                                       className="custom-control-input" checked/>
                                                <label className="custom-control-label"
                                                       htmlFor="radioRole1">Продавец</label>
                                            </div>

                                            <div className="d-inline-block custom-control custom-radio">
                                                <input type="radio" id="radioRole2" name="user-role"
                                                       className="custom-control-input"/>
                                                <label className="custom-control-label"
                                                       htmlFor="radioRole2">Покупатель</label>
                                            </div>
                                        </div>

                                    </div>

                                    <p className='font-weight-bold mb-3'>Пригласите в сделку продавца/покупателя.
                                        Введите его почту:</p>

                                    <input type="text" className="form-control" name="inviteEmail"
                                           placeholder="E-mail продавца"
                                           aria-label="E-mail"/>


                                </div>
                            </div>
                        </div>
                        <div className='col-md-6'>
                            <div className='card shadow-none'>
                                <div className='card-header'>
                                    <p className='font-weight-bold mb-3'>Название сделки:</p>
                                    <input type="text" name='dealName' className="form-control mb-3" placeholder="Введите название сделки"/>

                                    <p className='font-weight-bold mb-3'>Описание сделки:</p>
                                    <textarea className="form-control" placeholder="Введите описание сделки"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddDealPage;