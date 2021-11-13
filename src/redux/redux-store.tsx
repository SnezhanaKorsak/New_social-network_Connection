import {combineReducers, createStore} from "redux";
import {profileReducer} from "./profileReducer";
import {messageReducer} from "./messageReducer";
import {sideBarReducer} from "./sideBarReducer";
import {friendsReducer} from "./friendsReducer";
import {paginationReducer} from "./paginationReducer";

export type AppStateType = ReturnType<typeof rootReducer>

const rootReducer = combineReducers({
    profilePage: profileReducer,
    messagePage: messageReducer,
    sideBar: sideBarReducer,
    friendsPage: friendsReducer,
    pagination: paginationReducer
})

export const store = createStore(rootReducer)