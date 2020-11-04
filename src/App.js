import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css";
import "./App.css";
import LoginPage from "./components/LoginPage/LoginPage";
import {BrowserRouter as Router, Route} from 'react-router-dom';
import RegistrationPage from './components/RegistrationPage/RegistrationPage';
import DealPage from "./components/DealPage/DealPage";
import {Provider} from "react-redux";
import Header from "./components/Header/Header";
import PersonalUserArea from "./components/Forms/InfoUserForm/InfoUserForm";
import SecureUserArea from './components/Forms/SecureUserForm/SecureUserForm';
import IndividualUserArea from './components/Forms/IndividualUserForm/IndividualUserForm';
import EntityUserArea from './components/Forms/EntityUserForm/EntityUserForm';
import PaymentUserArea from './components/Forms/PaymentUserForm/PaymentUserForm';

function App(props) {
    return (
        <Provider store={props.store}>
            <Router>
                <Header/>
                <Route path="/login" component={LoginPage}/>
                <Route path="/auth" component={RegistrationPage}/>
                <Route path="/deal" component={DealPage}/>
                <Route path="/personal-info" component={PersonalUserArea}/>
                <Route path="/security" component={SecureUserArea}/>
                <Route path="/payment-info" component={PaymentUserArea}/>
                <Route path="/entity-info" component={EntityUserArea}/>
                <Route path="/individual-info" component={IndividualUserArea}/>
            </Router>
        </Provider>
    );
}

export default App;
