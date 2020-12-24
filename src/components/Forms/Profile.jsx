import React from "react";
import {Redirect, Route, Switch} from 'react-router-dom';
import PersonalAreaTabs from "../shared/PersonalAreaTabs/PersonalAreaTabs";
import InfoUserArea from "./InfoUserForm/InfoUserForm";
import SecureUserArea from "./SecureUserForm/SecureUserForm";
import PaymentUserArea from "./PaymentUserForm/PaymentUserForm";
import EntityUserArea from "./EntityUserForm/EntityUserForm";
import IndividualUserArea from "./IndividualUserForm/IndividualUserForm";
import DealsPage from "../DealsList/DealsPage/DealsPage";
import DealsPageCompleted from "../DealsList/DealsPageCompleted/DealsPageCompleted";
import DealsPageClaim from "../DealsList/DealsPageClaim/DealsPageClaim";
import DealsPageAction from "../DealsList/DealsPageAction/DealsPageAction";
import {connect} from "react-redux";
import AddDealPage from "../AddDealPage/AddDealPage";
import DealPage from "../DealPage/DealPage";

const Profile = ({verified}) => {
    console.log(verified)
    return (
        <div className="container my-lg-5">
            <div className="row">
                <PersonalAreaTabs/>
                <Switch>
                    <Route exact path="/profile" component={() => <Redirect to={'/profile/personal-info'}/>}/>
                    <Route path="/profile/personal-info" component={() => <InfoUserArea/>}/>
                    <Route path="/profile/security" component={() => <SecureUserArea/>}/>
                    <Route path="/profile/payment-info" component={() => <PaymentUserArea/>}/>
                    <Route path="/profile/entity-info" component={() => <EntityUserArea/>}/>
                    <Route path="/profile/individual-info" component={() => <IndividualUserArea/>}/>
                    {
                        verified ?
                            <>
                                <Route exact path="/profile/deals/" component={() => <DealsPage/>}/>
                                <Route path="/profile/deals/all" component={() => <DealsPage/>}/>
                                <Route path="/profile/deals/deals-completed" component={() => <DealsPageCompleted/>}/>
                                <Route path="/profile/deals/deals-claim" component={() => <DealsPageClaim/>}/>
                                <Route path="/profile/deals/deals-action" component={() => <DealsPageAction/>}/>
                            </>
                            :
                            <div className="card shadow-none col-lg-8 p-0 col-12">
                                <div className="card-header">
                                    <div className="col-12 d-flex my-3 align-items-center">
                                        <h5 className="m-0">Список сделок</h5>
                                    </div>
                                </div>
                                <div className="card-body pt-0">
                                    <h4 className="text-center">Ваш аккаунт не верифицирован, загрузите
                                        документы
                                        или
                                        подтвердите номер телефона во
                                        вкладке безопасность</h4>
                                </div>
                            </div>
                    }

                </Switch>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        verified: state.infoUser.verified
    }
}

export default connect(mapStateToProps)(Profile);
