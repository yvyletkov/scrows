import React, {useEffect} from 'react';
import {connect} from "react-redux";
import {getDealsDataCompleted} from "../../../redux/DealsPageReducer";
import {withAuthRedirect} from "../../../hoc/withAuthRedirect";
import {compose} from "redux";
import Preloader from "../../shared/Preloader/Preloader";
import DealsItem from "../../shared/DealsItem/DealsItem";
import DealsListTabs from "../../shared/DealsListTabs/DealsListTabs";
import {NavLink} from "react-router-dom";

const DealsPageCompleted = (props) => {
    const {getDealsDataCompleted, deals, isFetching} = props;
    useEffect(() => {
        getDealsDataCompleted()
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
                       badge={"badge-light"}/>
        )
    })

    return (
            <div className="container mt-5">
                <div className="card col-lg-12 p-0 col-12">
                    <div className="card-header">
                        <div className="col-12 d-flex my-3">
                            <h4>Сделки</h4>
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
        deals: state.deals.dealsCompleted,
        isFetching: state.deals.isFetching
    };
};

export default compose(connect(mapStateToProps, {getDealsDataCompleted}), withAuthRedirect)(DealsPageCompleted);