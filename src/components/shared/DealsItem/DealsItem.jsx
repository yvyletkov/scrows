import React from "react";
import s from "./DealsItem.module.css";
import {NavLink} from "react-router-dom";

const DealsItem = ({id, subject, newDate, price, status, statusColor}) => {
    const priceString = price && price.toString().replace(/(\d{1,3})(?=(?:\d{3})+$)/g, '$1 ');

    return <NavLink className={s.navLink} to={`/deals/${id}`}>
        <div className={`card mt-3 ${s.card}`}>
            <div className="card-header d-flex flex-lg-row flex-column p-0">
                <p className={s.nameDeal}>{subject}</p>
            </div>
            <div className={`card-body ${s.cardBody}`}>
                <div className="d-lg-flex d-block">
                    <div className={`col-lg-4 col-12 ${s.block}`}>
                        <p className={s.titleBlock}>Дата создания</p>
                        <p className={s.contentBlock}>{newDate}</p>
                    </div>
                    <div className={`col-lg-4 col-12 ${s.block}`}>
                        <p className={s.titleBlock}>Сумма сделки</p>
                        <p className={s.contentBlock}>{priceString} &#8381;</p>
                    </div>
                    <div className={`col-lg-4 col-12 ${s.block}`}>
                        <div className="d-flex align-items-center">
                            <p className={s.titleBlock}>Статус</p>
                            <div className={s.statusItem} style={statusColor}/>
                        </div>
                        <span className={`${s.contentBlock}`}>{status}</span>
                    </div>
                </div>
            </div>
        </div>
    </NavLink>
};


export default  DealsItem;
