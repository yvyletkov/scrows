import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css";
import "./App.css";
import LoginPage from "./components/LoginPage/LoginPage";
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import RegistrationPage from './components/RegistrationPage/RegistrationPage';
import DealPage from "./components/DealPage/DealPage";
import {connect, Provider} from "react-redux";
import HeaderContainer from "./components/Header/HeaderContainer";
import AddDealPage from "./components/AddDealPage/AddDealPage";
import Footer from "./components/Footer/Footer";
import {withAuthRedirect} from "./hoc/withAuthRedirect";
import Profile from "./components/Forms/Profile";
import {checkIsAuth} from "./redux/AuthReducer";
import ExtraPage from "./components/ExtraPage";

function App(props) {

    React.useEffect( () => props.checkIsAuth(), [])

    return <>
        <Provider store={props.store}>
            <Router>
                <div style={{minHeight: "calc(100vh - 86px - 3rem)"}}>
                    <HeaderContainer/>
                    <Switch>
                        <Route exact path="/new-deal" component={withAuthRedirect(AddDealPage)}/>
                        <Route exact path="/login" component={LoginPage}/>
                        <Route exact path="/registration" component={RegistrationPage}/>
                        <Route exact path="/deals/:id" component={withAuthRedirect(DealPage)}/>
                        <Route path="/profile" component={withAuthRedirect(Profile)}/>
                        <Route exact path="/" render={() => <Redirect to='/profile'/>}/>
                        <Route path='/extra' component={ withAuthRedirect(ExtraPage) } />
                        <Route render={ () => <Redirect to={'/profile'}/>} />
                    </Switch>
                </div>
                <Footer/>
            </Router>
        </Provider>
    </>
}

export default connect(null, {checkIsAuth})(App);
