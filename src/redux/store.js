import { createStore, applyMiddleware, combineReducers } from "redux";
import thunkMiddleware from "redux-thunk";
import { reducer as formReducer } from "redux-form";
import authReducer from "./AuthReducer";
import personalAreaReducer from "./PersonalAreaReducer";
import dealPageReducer from "./DealPageReducer";
import dealsDataReducer from "./DealsPageReducer";
import addDealPageReducer from "./AddDealPageReducer";

const reducers = combineReducers({
  form: formReducer,
  auth: authReducer,
  infoUser: personalAreaReducer,
  deal: dealPageReducer,
  deals: dealsDataReducer,
  addDeal: addDealPageReducer,
});

const store = createStore(reducers, applyMiddleware(thunkMiddleware));

window.store = store;

export default store;
