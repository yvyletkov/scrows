import React from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";

export const withAuthRedirect = (Component) => {
  let mapStateToPropsForRedirect = (state) => {
    return {
      isAuth: state.auth.isAuth,
    };
  };

  const RedirectComponent = ({isAuth, ...props}) => {
      if (!isAuth) {
        return <Redirect to={"/login"}/>;
      }
      return <Component {...props} />;
    }

  return connect(mapStateToPropsForRedirect)(RedirectComponent);
};
