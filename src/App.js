import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css";
import "./App.css";
import LoginPage from "./components/LoginPage/LoginPage";
import {BrowserRouter as Router, Route} from 'react-router-dom';
import RegistrationPage from './components/RegistrationPage/RegistrationPage';
import DealPage from "./components/DealPage/DealPage";
import {Provider} from "react-redux";
import HeaderContainer from "./components/Header/HeaderContainer";
import AddDealPage from "./components/AddDealPage/AddDealPage";
import Footer from "./components/Footer/Footer";
import {withAuthRedirect} from "./hoc/withAuthRedirect";
import Profile from "./components/Forms/Profile";

function App(props) {
    return <>
        <Provider store={props.store}>
            <Router>
                <div style={{minHeight: "calc(100vh - 86px - 3rem)"}}>
                    {/*<HeaderContainer/>*/}
                    {/*<Route path="/new-deal" component={withAuthRedirect(DealPage)} exact/>*/}
                    {/*<Route path="/login" component={LoginPage}/>*/}
                    {/*<Route path="/auth" component={RegistrationPage}/>*/}
                    {/*<Route exact path="profile/deals/:id" component={withAuthRedirect(DealPage)}/>*/}

                    <HeaderContainer/>
                    <Route path="/new-deal" component={withAuthRedirect(AddDealPage)} exact/>
                    <Route path="/login" component={LoginPage}/>
                    <Route path="/auth" component={RegistrationPage}/>
                    <Route exact path="/deals/:id" component={withAuthRedirect(DealPage)}/>
                    <Route path="/profile" component={withAuthRedirect(Profile)}/>
                </div>
                <Footer/>
            </Router>
        </Provider>
    </>
}

export default App;
