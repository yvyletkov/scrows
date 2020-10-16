import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css"
import LoginPage from "./components/LoginPage/LoginPage";
import {BrowserRouter as Router, Route} from 'react-router-dom';
import RegistrationPage from './components/RegistrationPage/RegistrationPage';


function App() {
  return (
    <Router>
      <Route path="/login" component={LoginPage} />
      <Route path="/auth" component={RegistrationPage} />
    </Router>
  );
}

export default App;
