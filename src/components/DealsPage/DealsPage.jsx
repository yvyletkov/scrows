import React, {useEffect} from 'react';
import s from './DealsPage.module.css';
import DealsTabs from "../shared/DealsTabs/DealsTabs";
import {connect} from "react-redux";
import {getDealsData} from "../../redux/DealsPageReducer";

const DealsPage = (props) => {

    console.log(props)

    const {getDealsData} = props;
    useEffect(() => {
        getDealsData()
    }, [])

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
                                <th className={s.table10}>№</th>
                                <th className={s.table30}>Дата создания</th>
                                <th className={s.table30}>Стоимость</th>
                                <th className={s.table30}>Статус</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <th className={s.table10}>1</th>
                                <td className={s.table30}>15.12.2020</td>
                                <td className={s.table30}>1000р</td>
                                <td className={s.table30}></td>
                            </tr>
                            <tr>
                                <th className={s.table10}>2</th>
                                <td className={s.table30}>15.12.2020</td>
                                <td className={s.table30}>1000р</td>
                                <td className={s.table30}></td>
                            </tr>
                            <tr>
                                <th className={s.table10}>3</th>
                                <td className={s.table30}>15.12.2020</td>
                                <td className={s.table30}>1000р</td>
                                <td className={s.table30}></td>
                            </tr>
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
        dealId: state.deals.dealId,
        created_at: state.deals.created_at,
        subject: state.deals.subject,
        price: state.deals.price,
        status: state.deals.status,
    };
};

export default connect(mapStateToProps, {getDealsData})(DealsPage);