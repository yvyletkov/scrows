import React, {useEffect} from 'react';
import {connect} from "react-redux";
import {getDealsDataClaim} from "../../../redux/DealsPageReducer";
import {withAuthRedirect} from "../../../hoc/withAuthRedirect";
import {compose} from "redux";
import Preloader from "../../shared/Preloader/Preloader";
import DealsItem from "../../shared/DealsItem/DealsItem";
import DealsListTabs from "../../shared/DealsListTabs/DealsListTabs";
import {NavLink} from "react-router-dom";

const DealsPageClaim = (props) => {
    const {getDealsDataClaim, deals, isFetching} = props;
    useEffect(() => {
        getDealsDataClaim()
    }, []);

    const dealsList = deals.map((deal) => {
        let month = new Date(deal.created_at).getUTCMonth() + 1;
        let day = new Date(deal.created_at).getUTCDate();
        let year = new Date(deal.created_at).getUTCFullYear();

        let newDate = `${day}.${month}.${year}`;
        return (
            <DealsItem key={deal.id}
                       id={deal.id}
                       subject={deal.subject}
                       newDate={newDate}
                       price={deal.price}
                       status={deal.status.title}
                       badge={"badge-danger"}/>
        )
    })

    return (
            <div className="container mt-5">
                <div className="card shadow-none col-lg-12 p-0 col-12">
                    <div className="card-header">
                        <div className="col-12 d-flex my-3">
                            <h5>Сделки</h5>
                            <NavLink className="btn btn-success ml-auto" to="/add-deal">Создать сделку</NavLink>
                        </div>
                        <DealsListTabs />
                    </div>
                    <div className="card-body pt-0">
                        {isFetching ? <Preloader/> : dealsList}
                    </div>
                </div>
            </div>
    )
}

const mapStateToProps = (state) => {
    return {
        deals: state.deals.dealsClaim,
        isFetching: state.deals.isFetching
    };
};

export default compose(connect(mapStateToProps, {getDealsDataClaim}), withAuthRedirect)(DealsPageClaim);