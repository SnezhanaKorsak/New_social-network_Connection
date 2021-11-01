import {combineReducers, createStore} from "redux";
import { StoreType } from "./store";
import {profileReducer} from "./profileReducer";
import {messageReducer} from "./messageReducer";
import {sideBarReducer} from "./sideBarReducer";



const reducers = combineReducers({
    profilePage: profileReducer,
    messagePage: messageReducer,
    sideBar: sideBarReducer
})

export const store: StoreType = createStore(reducers)