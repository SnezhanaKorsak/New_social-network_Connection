import {ThunkCreatorType} from "./redux-store";
import {authAPI, securityAPI} from "../api/api";

type InitialStateType = {
    userId: string | null
    email: string | null
    login: string | null
    isAuth: boolean
    captchaUrl: string | null
}

const initialState: InitialStateType = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    captchaUrl: null
}
export type AuthActionType = ReturnType<typeof setAuthData> | ReturnType<typeof setCaptchaUrl>

export const authReducer = (state = initialState, action: AuthActionType): InitialStateType => {
    switch (action.type) {
        case "SET-AUTH-DATA":
            return {...state, ...action.payload}

        case "SET-CAPTCHA-URL":
            return {...state, captchaUrl: action.captchaUrl}

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

export const setCaptchaUrl = (captchaUrl: string) => ({type: "SET-CAPTCHA-URL", captchaUrl} as const)


//thunk
export const getAuthDataTC = (): ThunkCreatorType => async (dispatch) => {
    let data = await authAPI.me()

    if (data.resultCode === 0) {
        let {id, email, login} = data.data
        dispatch(setAuthData(id, email, login, true))
    }
}

export const loginTC = (email: string, password: string, rememberMe: boolean, captcha: string): ThunkCreatorType => async (dispatch) => {
    let response = await authAPI.logIn(email, password, rememberMe, captcha)

    if (response.data.resultCode === 0) {
        dispatch(getAuthDataTC())
    } else if(response.data.resultCode === 10) {
        dispatch(getCaptchaUrlTC())
    }
}

export const logoutTC = (): ThunkCreatorType => async (dispatch) => {
    let response = await authAPI.logout()

    if (response.data.resultCode === 0) {
        dispatch(setAuthData(null, null, null, false))
    }
}

export const getCaptchaUrlTC = (): ThunkCreatorType => async (dispatch) => {
    const response = await securityAPI.getCaptcha()
    const captchaUrl = response.data.url

    dispatch(setCaptchaUrl(captchaUrl))
}