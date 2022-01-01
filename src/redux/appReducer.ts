import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./redux-store";
import {getAuthDataTC} from "./authReducer";

export type initialStateType = {
    initialized: boolean
}

const initialState: initialStateType = {
    initialized: false
}

export const appReducer = (state = initialState, action: ActionType): initialStateType => {
    switch (action.type) {
        case "SET-INITIALISED":
            return {...state, initialized: true}

        default:
            return state
    }

}

type ActionType = ReturnType<typeof setInitialised>


export const setInitialised = () => {
    return {
        type: "SET-INITIALISED",
    } as const
}

export const initializeApp = (): ThunkAction<void, AppStateType, unknown, ActionType> => {
    return (dispatch) => {
        dispatch(getAuthDataTC())
            .then (() => {
                dispatch(setInitialised())
            })
    }
}
