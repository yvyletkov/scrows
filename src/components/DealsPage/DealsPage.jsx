import React, {useEffect} from 'react';
import s from './DealsPage.module.css';
import {connect} from "react-redux";
import {getDealsData} from "../../redux/DealsPageReducer";
import {NavLink} from "react-router-dom";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";
import Preloader from "../shared/Preloader/Preloader";

const DealsPage = (props) => {
    const {getDealsData, deals, isFetching} = props;
    useEffect(() => {
        getDealsData()
    }, []);

    const dealsList = deals.map((deal) => {
        let month = new Date(deal.created_at).getUTCMonth() + 1;
        let day = new Date(deal.created_at).getUTCDate();
        let year = new Date(deal.created_at).getUTCFullYear();

        let newDate = `${day}.${month}.${year}`;
        return (
            <NavLink className={s.navLink} to={`/deals/${deal.id}`}>
                <div className={`card mt-3 ${s.card}`} key={deal.id}>
                    <div className="card-header d-flex flex-lg-row flex-column p-0">
                        <p className={s.nameDeal}>{deal.subject}</p>
                    </div>
                    <div className={`card-body ${s.cardBody}`}>
                        <div className="d-lg-flex d-block">
                            <div className={`col-lg-3 col-12 ${s.block}`}>
                                <p className={s.titleBlock}>Дата создания</p>
                                <p className={s.contentBlock}>{newDate}</p>
                            </div>
                            <div className={`col-lg-4 col-12 ${s.block}`}>
                                <p className={s.titleBlock}>Сумма сделки</p>
                                <p className={s.contentBlock}>{deal.price} &#8381;</p>
                            </div>
                            <div className={`col-lg-5 col-12 ${s.block}`}>
                                <p className={s.titleBlock}>Статус</p>
                                <span className={`badge badge-info ${s.contentBlock}`}>{deal.status.title}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </NavLink>
        )
    })

    return (
        <>

            <div className="container mt-5">
                <div className="card col-lg-12 p-0 col-12">
                    <div className="card-header">
                        <h4>Сделки</h4>
                        <ul className="nav nav-tabs card-header-tabs">
                            <li className={`nav-item col-3 ${s.navTab}`}>
                                <NavLink to="/deals" className={`nav-link ${s.navLink}`}>
                                    Активные
                                </NavLink>
                            </li>
                            <li className={`nav-item col-3 ${s.navTab}`}>
                                <NavLink to="/security" className={`nav-link ${s.navLink}`}>
                                    Завершенные
                                </NavLink>
                            </li>
                            <li className={`nav-item col-3 ${s.navTab}`}>
                                <NavLink to="/payment-info" className={`nav-link ${s.navLink}`}>
                                    Претензии
                                </NavLink>
                            </li>
                            <li className={`nav-item col-3 ${s.navTab}`}>
                                <NavLink to="/payment-info" className={`nav-link ${s.navLink}`}>
                                    Требуют действия
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                    <div className="card-body pt-0">
                        {isFetching ? <Preloader/> : dealsList}
                    </div>
                </div>
            </div>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        deals: state.deals.deals,
        isFetching: state.deals.isFetching
    };
};

export default compose(connect(mapStateToProps, {getDealsData}), withAuthRedirect)(DealsPage);