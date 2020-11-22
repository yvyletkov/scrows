import React from "react";
import s from "./DealsItem.module.css";
import {NavLink} from "react-router-dom";

const DealsItem = ({id, subject, newDate, price, status}) => (
    <NavLink className={s.navLink} to={`/deals/${id}`}>
        <div className={`card mt-3 ${s.card}`}>
            <div className="card-header d-flex flex-lg-row flex-column p-0">
                <p className={s.nameDeal}>{subject}</p>
            </div>
            <div className={`card-body ${s.cardBody}`}>
                <div className="d-lg-flex d-block">
                    <div className={`col-lg-3 col-12 ${s.block}`}>
                        <p className={s.titleBlock}>Дата создания</p>
                        <p className={s.contentBlock}>{newDate}</p>
                    </div>
                    <div className={`col-lg-4 col-12 ${s.block}`}>
                        <p className={s.titleBlock}>Сумма сделки</p>
                        <p className={s.contentBlock}>{price} &#8381;</p>
                    </div>
                    <div className={`col-lg-5 col-12 ${s.block}`}>
                        <p className={s.titleBlock}>Статус</p>
                        <span className={`badge badge-info ${s.contentBlock}`}>{status}</span>
                    </div>
                </div>
            </div>
        </div>
    </NavLink>
);


export default  DealsItem;