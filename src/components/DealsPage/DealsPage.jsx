import React, {useEffect} from 'react';
import s from './DealsPage.module.css';
import DealsTabs from "../shared/DealsTabs/DealsTabs";
import {connect} from "react-redux";
import {getDealsData} from "../../redux/DealsPageReducer";
import {NavLink} from "react-router-dom";

const DealsPage = (props) => {

    console.log(props);

    const {getDealsData, deals} = props;
    useEffect(() => {
        getDealsData()
    }, []);

    const dealsList = deals.map((deal) => {
        let month = new Date(deal.created_at).getUTCMonth() + 1;
        let day = new Date(deal.created_at).getUTCDate();
        let year = new Date(deal.created_at).getUTCFullYear();

        let newDate = `${day}.${month}.${year}`;
        return (
            <NavLink className={s.navLink} to={`/deal/${deal.id}`}>
                <div className={`card mt-3 ${s.card}`} key={deal.id}>
                    <div className="card-header d-flex flex-lg-row flex-column p-0">
                        <p className={s.nameDeal}>{deal.subject}</p>
                    </div>
                    <div className={`card-body ${s.cardBody}`}>
                        <div className="d-lg-flex d-block">
                            <div className={`col-lg-4 col-12 ${s.block}`}>
                                <p className={s.titleBlock}>Дата создания</p>
                                <p className={s.contentBlock}>{newDate}</p>
                            </div>
                            <div className={`col-lg-4 col-12 ${s.block}`}>
                                <p className={s.titleBlock}>Сумма сделки</p>
                                <p className={s.contentBlock}>{deal.price} &#8381;</p>
                            </div>
                            <div className={`col-lg-4 col-12 ${s.block}`}>
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
        <div className="container mt-5">
            <div className="row">
                <DealsTabs/>
                <div className="card col-lg-8 p-0 col-12">
                    <h4 className="card-header">Сделки</h4>
                    <div className="card-body pt-0">
                        {dealsList}
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        deals: state.deals.deals,
    };
};

export default connect(mapStateToProps, {getDealsData})(DealsPage);