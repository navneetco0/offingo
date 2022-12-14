import { createWrapper } from "next-redux-wrapper";
import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { main } from "./reducer/main";
import {createBlog} from "./reducer/createBlog"


const rootReducer = combineReducers({
   main, createBlog,
});

const middleware = [thunk];

const composeEnhancers = 
  typeof window === 'object' && 
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}):compose;

  const enhancer = composeEnhancers(applyMiddleware(...middleware));

const makeStore = ()=>createStore(rootReducer, enhancer);

export const wrapper = createWrapper(makeStore);