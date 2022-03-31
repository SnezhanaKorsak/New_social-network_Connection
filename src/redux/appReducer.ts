import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./redux-store";
import {getAuthDataTC} from "./authReducer";

export type initialStateType = {
    initialized: boolean;
    rootError: string | null,
}

const initialState: initialStateType = {
    initialized: false,
    rootError:  null,
}

export const appReducer = (state = initialState, action: ActionType): initialStateType => {
    switch (action.type) {
        case "SET-INITIALISED":
            return {...state, initialized: true}

        case "SET-ERROR":
            return {...state, rootError: action.error}

        default:
            return state
    }

}

type ActionType = ReturnType<typeof setInitialised> | ReturnType<typeof setError>


export const setInitialised = () => ({type: "SET-INITIALISED",} as const)

export const setError = (error: string | null) => ({type: "SET-ERROR", error} as const)

//thunk
export const initializeApp = (): ThunkAction<void, AppStateType, unknown, ActionType> => (dispatch) => {
    dispatch(getAuthDataTC())
        .then(() => {
            dispatch(setInitialised())
        })
}

export const setRootError = (error: string | null): ThunkAction<void, AppStateType, unknown, ActionType> => (dispatch) => {
    dispatch(setError(error))

    if(error) {
        setTimeout(() => {
            dispatch(setError(null));
        }, 3000);
    }
}
