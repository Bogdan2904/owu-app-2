import {createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import {applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {createRootReducer} from "./reducers/main-reducer";


export const appStore = createStore(createRootReducer(), composeWithDevTools(
    applyMiddleware(thunk)
));
