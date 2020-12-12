import React, {useEffect} from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {checkIsAuth} from "../redux/AuthReducer";

export const withAuthRedirect = (Component) => {
  let mapStateToPropsForRedirect = (state) => {
    return {
      isAuth: state.auth.isAuth,
    };
  };

  const RedirectComponent = ({isAuth, ...props}) => {

      useEffect( () => props.checkIsAuth(), [])

      if (!isAuth) {
        return <Redirect to={"/login"}/>;
      }
      return <Component {...props} />;
    }

  return connect(mapStateToPropsForRedirect, {checkIsAuth})(RedirectComponent);
};
