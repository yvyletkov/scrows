import React from "react";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
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
import DealPage from "../DealPage/DealPage";

const Profile = () => {
    return (
        <div className="container my-lg-5">
            <div className="row">
                <Route path="/profile/" component={() => <PersonalAreaTabs/>}/>
                <Switch>
                <Route path="/profile/personal-info" component={() => <InfoUserArea/>}/>
                <Route path="/profile/security" component={() => <SecureUserArea/>}/>
                <Route path="/profile/payment-info" component={() => <PaymentUserArea />}/>
                <Route path="/profile/entity-info" component={() => <EntityUserArea />}/>
                <Route path="/profile/individual-info" component={() => <IndividualUserArea />}/>
                <Route exact path="/profile/deals/" component={() => <DealsPage />}/>
                <Route path="/profile/deals/all" component={() => <DealsPage />}/>
                <Route path="/profile/deals/deals-completed" component={() => <DealsPageCompleted />}/>
                <Route path="/profile/deals/deals-claim" component={() => <DealsPageClaim />}/>
                <Route path="/profile/deals/deals-action" component={() => <DealsPageAction />}/>
                </Switch>
            </div>
        </div>
    )
}

export default Profile;
