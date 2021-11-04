import {combineReducers, createStore} from "redux";
import {profileReducer} from "./profileReducer";
import {messageReducer} from "./messageReducer";
import {sideBarReducer} from "./sideBarReducer";
import {friendsReducer} from "./friendsReducer";

export type AppStateType = ReturnType<typeof rootReducer>

const rootReducer = combineReducers({
    profilePage: profileReducer,
    messagePage: messageReducer,
    sideBar: sideBarReducer,
    friendsPage: friendsReducer
})

export const store = createStore(rootReducer)