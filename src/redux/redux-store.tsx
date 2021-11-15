import {applyMiddleware, combineReducers, createStore} from "redux";
import {profileReducer, UserProfileActionType} from "./profileReducer";
import {messageReducer} from "./messageReducer";
import {sideBarReducer} from "./sideBarReducer";
import {friendsReducer, UserActionType} from "./friendsReducer";
import {PaginationActionType, paginationReducer} from "./paginationReducer";
import {AuthActionType, authReducer} from "./authReducer";
import thunk, {ThunkAction} from "redux-thunk";

export type AppStateType = ReturnType<typeof rootReducer>

//типизация всех экшенов
export type ActionsType = UserActionType | PaginationActionType | AuthActionType | UserProfileActionType

//типизация ThunkCreator

export type ThunkCreatorType = ThunkAction<void, AppStateType, unknown, ActionsType>

const rootReducer = combineReducers({
    profilePage: profileReducer,
    messagePage: messageReducer,
    sideBar: sideBarReducer,
    friendsPage: friendsReducer,
    pagination: paginationReducer,
    auth: authReducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunk))

// @ts-ignore
window.store = store