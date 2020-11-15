import React from "react";
import Header from "./Header";
import {connect} from 'react-redux'
import {logout} from "../../redux/AuthReducer";

const HeaderContainer = (props) => {
    return <Header {...props}/>
}

const mapStateToProps = (state) => {
    return ({
        isAuth:state.auth.isAuth
    })
}

export default connect(mapStateToProps, {logout})(HeaderContainer)