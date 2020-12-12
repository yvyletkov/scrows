import React, {useEffect} from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {checkIsAuth} from "../redux/AuthReducer";
import Preloader from "../components/shared/Preloader/Preloader";

export const withAuthRedirect = (Component) => {
  let mapStateToPropsForRedirect = (state) => {
    return {
      isAuth: state.auth.isAuth,
    };
  };

  const RedirectComponent = ({isAuth, ...props}) => {

      useEffect( () => props.checkIsAuth(), [])

      if (isAuth === false) return <Redirect to={"/login"}/>;

      else if (isAuth === true) return <Component {...props} />;

      else return <Preloader/>
    }

  return connect(mapStateToPropsForRedirect, {checkIsAuth})(RedirectComponent);
};
