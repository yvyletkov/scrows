import React, {useEffect} from 'react';
import {connect} from "react-redux";
import {getDealsData} from "../../../redux/DealsPageReducer";
import {withAuthRedirect} from "../../../hoc/withAuthRedirect";
import {compose} from "redux";
import Preloader from "../../shared/Preloader/Preloader";
import {NavLink} from "react-router-dom";
import DealsItem from "../../shared/DealsItem/DealsItem";
import DealsListTabs from "../../shared/DealsListTabs/DealsListTabs";
import PersonalAreaCard from "../../shared/PersonalAreaTabs/PersonalAreaTabs";
import MobilePersonalAreaTabs from "../../shared/MobilePersonalAreaTabs/MobilePersonalAreaTabs";

const DealsPage = (props) => {
    const {getDealsData, deals, isFetching} = props;
    useEffect(() => {
        getDealsData()
    }, []);

    const dealsList = deals.map((deal) => {
        let month = new Date(deal.created_at).getUTCMonth() + 1;
        let day = new Date(deal.created_at).getUTCDate();
        let year = new Date(deal.created_at).getUTCFullYear();

        const statusColor = (status) => {
            if(status === 8){
                return {backgroundColor:"#d9d9d9"}
            }
            if(status === 7){
                return {backgroundColor:"#ff0000"}
            }
            if(status === 6){
                return {backgroundColor:"#dcde5f"}
            }
            else {
                return {backgroundColor:"#4da22f"}
            }
        }

        let newDate = `${day}.${month}.${year}`;
        return (
            <DealsItem key={deal.id}
                       id={deal.id}
                       subject={deal.subject}
                       newDate={newDate}
                       price={deal.price}
                       status={deal.status.title}
                       statusColor={statusColor(deal.status.priority)}/>
        )
    })

    return (
            <div className="container mt-lg-5">
                <div className="row">
                    <PersonalAreaCard />
                    <div className="card shadow-none col-lg-8 p-0 col-12">
                        <MobilePersonalAreaTabs/>
                        <div className="card-header">
                            <div className="col-12 d-flex my-3 align-items-center">
                                <h5 className="m-0">Список сделок</h5>
                                <NavLink className="btn btn-success ml-auto" to="/add-deal">Создать сделку</NavLink>
                            </div>
                            <DealsListTabs />
                        </div>
                        <div className="card-body pt-0">
                            {isFetching ? <Preloader/> : dealsList}
                        </div>
                    </div>
                </div>
            </div>
    )
}

const mapStateToProps = (state) => {
    return {
        deals: state.deals.deals,
        isFetching: state.deals.isFetching
    };
};

export default compose(connect(mapStateToProps, {getDealsData}), withAuthRedirect)(DealsPage);
