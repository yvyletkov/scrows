import React from "react";

const DealHistory = () => {
    return <div className='card mb-4 mt-4 shadow-none'>
        <div className='card-header'>
            <div className={'font-weight-bold'}>История сделки</div>
        </div>

        <div className='card-body'>
            <div className='d-flex  mb-2'>
                <div style={{color: "#fff", height: "fit-content"}}
                     className="badge badge-warning mr-2 align-bottom">07.10.2020 23:24:31
                </div>
                <div>создана сделка: Вадим Закиров
                </div>
            </div>

            <div className='d-flex  mb-2'>
                <div style={{color: "#fff", height: "fit-content"}}
                     className="badge badge-warning mr-2 align-bottom">07.10.2020 23:24:31
                </div>
                <div>отправлено приглашение Покупатель на email:vadimzakirov1992@gmail.com
                </div>
            </div>

            <div className='d-flex  mb-2'>
                <div style={{color: "#fff", height: "fit-content"}}
                     className="badge badge-warning mr-2 align-bottom">07.10.2020 23:24:31
                </div>
                <div>сделка перешла в статус ПРИГЛАШЕНИЕ ВТОРОГО УЧАСТНИКА
                </div>
            </div>

            <div className='d-flex  mb-2'>
                <div style={{color: "#fff", height: "fit-content"}}
                     className="badge badge-warning mr-2 align-bottom">07.10.2020 23:24:31
                </div>
                <div>ожидание принятия условий второго участника
                </div>
            </div>

            <div className='d-flex mb-2'>
                <div style={{color: "#fff", height: "fit-content"}}
                     className="badge badge-warning mr-2 align-bottom">07.10.2020 23:24:31
                </div>
                <div>выбран тип оплаты: физ.лицо. Проведение электронного платежа
                </div>
            </div>
        </div>

    </div>
};

export default DealHistory;
