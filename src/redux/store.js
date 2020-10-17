import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from "redux-thunk";
import reducer from "./reducer";


const store = createStore(reducer, applyMiddleware(thunkMiddleware));

window.store = store;

export default store;
