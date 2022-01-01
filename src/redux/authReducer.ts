import {ThunkCreatorType} from "./redux-store";
import {AuthAPI} from "../api/api";

type InitialStateType = {
    userId: string | null
    email: string | null
    login: string | null
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
            return {...state, ...action.payload}

        default:
            return state
    }
}

export const setAuthData = (userId: string | null, email: string | null, login: string | null, isAuth: boolean) => {
    return {
        type: "SET-AUTH-DATA",
        payload: {userId, email, login, isAuth}
    } as const
}

export const getAuthDataTC = (): ThunkCreatorType => {
    return (dispatch) => {
       return  AuthAPI.me().then(data => {
            if (data.resultCode === 0) {
                let {id, email, login} = data.data
                dispatch(setAuthData(id, email, login, true))
            }
        })
    }
}

export const loginTC = (email: string, password: string, rememberMe: boolean): ThunkCreatorType => {
    return (dispatch) => {
        AuthAPI.logIn(email, password, rememberMe).then(res => {
            if (res.data.resultCode === 0) {
                dispatch(getAuthDataTC())
            }
        })
    }
}

export const logoutTC = (): ThunkCreatorType => {
    return (dispatch) => {
        AuthAPI.logout()
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(setAuthData(null, null, null, false))
                }
            })
    }
}