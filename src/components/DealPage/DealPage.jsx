import React from "react";
import './DealPage.module.css'
import {connect} from "react-redux";
import {login} from "../../redux/reducer";

const DealPage = () => {
  return null
};

let mapStateToProps = (state) => {
  return {
    someData: state.someData
    //те данные из глобального стейта, которые мы хотим передать в компоненту
  }
}

export default connect(mapStateToProps, {login})(DealPage);