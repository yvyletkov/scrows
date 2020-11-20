import React, {useEffect} from 'react';
import s from './DealsPage.module.css';
import DealsTabs from "../shared/DealsTabs/DealsTabs";
import {connect} from "react-redux";
import {getDealsData} from "../../redux/DealsPageReducer";

const DealsPage = (props) => {

    console.log(props)

    const {getDealsData, deals} = props;
    useEffect(() => {
        getDealsData()
    }, []);

    const dealsArray = deals.map((deal) => {
        let month = new Date(deal.created_at).getUTCMonth() + 1;
        let day = new Date(deal.created_at).getUTCDate();
        let year = new Date(deal.created_at).getUTCFullYear();

        let newDate = `${day}.${month}.${year}`;
        return (
            <tr className={s.itemDeals} key={deal.id}>
                <th className={s.table4}>{deal.id}</th>
                <td className={s.table24}>{newDate}</td>
                <td className={s.table24}>{deal.subject}</td>
                <td className={s.table24}>{deal.price} &#8381;</td>
                <td className={s.table24}>{deal.status.title}</td>
            </tr>
        )
    })

    return (
        <div className="container mt-5">
            <div className="row">
                <DealsTabs/>
                <div className="card col-8 p-0">
                    <h4 className="card-header">Сделки</h4>
                    <div className="card-body pt-0">
                        <table className="table table-hover table-borderless">
                            <thead>
                            <tr>
                                <th className={s.table4}>№</th>
                                <th className={s.table24}>Дата создания</th>
                                <th className={s.table24}>Предмет</th>
                                <th className={s.table24}>СТоимость</th>
                                <th className={s.table24}>Статус</th>
                            </tr>
                            </thead>
                            <tbody>
                            {dealsArray}
                            </tbody>
                        </table>
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