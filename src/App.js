import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css";
import "./App.css";
import LoginPage from "./components/LoginPage/LoginPage";
import {BrowserRouter as Router, Route} from 'react-router-dom';
import RegistrationPage from './components/RegistrationPage/RegistrationPage';
import DealPage from "./components/DealPage/DealPage";
import {Provider} from "react-redux";
import PersonalUserArea from "./components/Forms/InfoUserForm/InfoUserForm";
import SecureUserArea from './components/Forms/SecureUserForm/SecureUserForm';
import IndividualUserArea from './components/Forms/IndividualUserForm/IndividualUserForm';
import EntityUserArea from './components/Forms/EntityUserForm/EntityUserForm';
import PaymentUserArea from './components/Forms/PaymentUserForm/PaymentUserForm';
import HeaderContainer from "./components/Header/HeaderContainer";
import AddDealPage from "./components/AddDealPage/AddDealPage";
import DealsPage from "./components/DealsList/DealsPage/DealsPage";
import DealsPageCompleted from "./components/DealsList/DealsPageCompleted/DealsPageCompleted";
import DealsPageClaim from "./components/DealsList/DealsPageClaim/DealsPageClaim";
import DealsPageAction from "./components/DealsList/DealsPageAction/DealsPageAction";

function App(props) {
    return (<>
        <Provider store={props.store}>
            <Router>
                <HeaderContainer/>
                <Route path="/add-deal" component={AddDealPage} exact/>
                <Route path="/login" component={LoginPage}/>
                <Route path="/auth" component={RegistrationPage}/>
                <Route exact path="/deals/:id" component={DealPage}/>
                <Route path="/personal-info" component={PersonalUserArea}/>
                <Route path="/security" component={SecureUserArea}/>
                <Route path="/payment-info" component={PaymentUserArea}/>
                <Route path="/entity-info" component={EntityUserArea}/>
                <Route path="/individual-info" component={IndividualUserArea}/>
                <Route exact path="/deals" component={DealsPage}/>
                <Route exact path="/deals-completed" component={DealsPageCompleted}/>
                <Route exact path="/deals-claim" component={DealsPageClaim}/>
                <Route exact path="/deals-action" component={DealsPageAction}/>
            </Router>
        </Provider>
    </>)
}

export default App;
