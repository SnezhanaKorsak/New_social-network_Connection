import {applyMiddleware, combineReducers, createStore} from "redux";
import {profileReducer, UserProfileActionType} from "./profileReducer";
import {messageReducer} from "./messageReducer";
import {sideBarReducer} from "./sideBarReducer";
import {friendsReducer, UserActionsType} from "./friendsReducer";
import {PaginationActionType, paginationReducer} from "./paginationReducer";
import {AuthActionType, authReducer} from "./authReducer";
import thunk, {ThunkAction} from "redux-thunk";
import {AppActionType, appReducer} from "./appReducer";

export type AppStateType = ReturnType<typeof rootReducer>

//типизация всех экшенов
export type ActionsAllType = UserActionsType
    | PaginationActionType
    | AuthActionType
    | UserProfileActionType
    | AppActionType

export type InferActionsType<T> = T extends { [key: string] : (...args: any[]) => infer U } ? U : never

//типизация ThunkCreator
export type ThunkCreatorType<ReturnType = void> = ThunkAction<ReturnType, AppStateType, unknown, ActionsAllType>

const rootReducer = combineReducers({
    profilePage: profileReducer,
    messagePage: messageReducer,
    sideBar: sideBarReducer,
    friendsPage: friendsReducer,
    pagination: paginationReducer,
    auth: authReducer,
    app: appReducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunk))

// @ts-ignore
window.store = store