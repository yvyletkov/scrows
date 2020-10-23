import { createStore, applyMiddleware, combineReducers } from "redux";
import thunkMiddleware from "redux-thunk";
import reducer from "./reducer";
import { reducer as formReducer } from "redux-form";

// const store = createStore(reducer, applyMiddleware(thunkMiddleware));
const reducers = combineReducers({
  form: formReducer,
  main: reducer,
});

const store = createStore(reducers, applyMiddleware(thunkMiddleware));

window.store = store;

export default store;
