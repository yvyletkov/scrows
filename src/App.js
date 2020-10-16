import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css"
import LoginPage from "./components/LoginPage/LoginPage";
import {BrowserRouter as Router, Route} from 'react-router-dom';
import RegistrationPage from './components/RegistrationPage/RegistrationPage';
import DealPage from "./components/DealPage/DealPage";
import {Provider} from "react-redux";
import Header from "./components/Header/Header";


function App(props) {
    return (
        <Provider store={props.store}>
            <Router>
                <Header/>
                <Route path="/login" component={LoginPage}/>
                <Route path="/auth" component={RegistrationPage}/>
                <Route path="/deal" component={DealPage}/>
            </Router>
        </Provider>
    );
}

export default App;
