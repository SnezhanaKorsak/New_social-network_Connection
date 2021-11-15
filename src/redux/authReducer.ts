import {ThunkCreatorType} from "./redux-store";
import {AuthAPI} from "../api/api";

type InitialStateType = {
    userId: number | null
    email: string |null
    login: string |null
    isAuth: boolean
}

const initialState: InitialStateType = {
    userId: null,
    email: null,
    login: null,
    isAuth: false
}
export type AuthActionType = ReturnType<typeof setAuthData>

export const authReducer = (state = initialState, action: AuthActionType): InitialStateType => {
switch (action.type) {
    case "SET-AUTH-DATA":
        return {...state, ...action.data, isAuth: true}

    default: return state
}
}

export const setAuthData = (userId: number, email: string, login: string) => {
    return {
        type: "SET-AUTH-DATA",
        data: {userId, email, login}
    } as const
}

export const getAuthDataTC = (): ThunkCreatorType => {
    return (dispatch) => {
        AuthAPI.me().then(data => {
            if (data.resultCode === 0) {
                let {id, email, login} = data.data
               dispatch(setAuthData(id, email, login))
            }
        })
    }
}