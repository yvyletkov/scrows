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
import DealsPage from "./components/DealsPage/DealsPage";

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
            </Router>
        </Provider>
    </>)
}

export default App;
